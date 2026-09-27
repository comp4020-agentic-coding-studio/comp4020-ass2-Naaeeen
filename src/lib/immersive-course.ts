import { gsap } from "gsap";
import type { AincradScene } from "./aincrad-scene";

type SceneView = "world" | "settlement" | "citadel";
type PreviewState = { chapter: number; userPaused: boolean; view: SceneView; introduced: boolean };

/** Enhance an already readable page; page-cache restores get a fresh lifecycle. */
export function mountImmersiveCourse(root: HTMLElement): () => void {
  const state: PreviewState = { chapter: 0, userPaused: false, view: "world", introduced: false };
  let stop: (() => void) | undefined;
  const start = () => { stop ??= initialisePreview(root, state); };
  const onPageShow = () => { if (root.isConnected) start(); };
  const onPageHide = (event: PageTransitionEvent) => {
    stop?.();
    stop = undefined;
    if (!event.persisted) {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
    }
  };
  window.addEventListener("pageshow", onPageShow);
  window.addEventListener("pagehide", onPageHide);
  start();
  return () => {
    stop?.();
    stop = undefined;
    window.removeEventListener("pageshow", onPageShow);
    window.removeEventListener("pagehide", onPageHide);
  };
}

function initialisePreview(root: HTMLElement, state: PreviewState): () => void {
  const listeners = new AbortController();
  const { signal } = listeners;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const verticalTabs = matchMedia("(max-width: 800px)");
  const motionButton = root.querySelector<HTMLButtonElement>("[data-motion-toggle]");
  const motionLabel = root.querySelector<HTMLElement>("[data-motion-label]");
  const motionSymbol = root.querySelector<HTMLElement>(".ic-motion-symbol");
  const sceneHost = root.querySelector<HTMLElement>("[data-scene-host]");
  const sceneStage = root.querySelector<HTMLElement>("[data-scene-stage]");
  const sceneFallback = root.querySelector<SVGElement>("[data-scene-fallback]");
  const sceneControls = root.querySelector<HTMLElement>("[data-scene-controls]");
  const sceneStatus = root.querySelector<HTMLElement>("[data-scene-status]");
  const tabList = root.querySelector<HTMLElement>("[data-chapter-tabs]");
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>("[data-chapter-tab]")];
  const panels = [...root.querySelectorAll<HTMLElement>("[data-chapter-panel]")];
  let scene: AincradScene | null = null;
  let sceneAvailable = false;
  let sceneRequested = false;
  let sceneInView = false;
  let disposed = false;
  let motionContext = gsap.context(() => {}, root);
  const motionEnabled = () => !state.userPaused && !reducedMotion.matches;
  const updateSceneVisibility = () => scene?.setVisible(sceneAvailable && sceneInView && !document.hidden);

  const updateMotion = () => {
    const enabled = motionEnabled();
    root.dataset.motion = enabled ? "running" : "paused";
    if (!enabled) {
      motionContext.revert();
      motionContext = gsap.context(() => {}, root);
    }
    scene?.setMotion(enabled);
    if (motionButton && motionLabel) {
      motionButton.disabled = reducedMotion.matches;
      motionLabel.textContent = reducedMotion.matches ? "Motion reduced" : enabled ? "Pause motion" : "Resume motion";
      motionButton.setAttribute("aria-label", reducedMotion.matches ? "Motion disabled by your device preference" : enabled ? "Pause all motion" : "Resume motion");
      if (motionSymbol) motionSymbol.textContent = enabled ? "\u2161" : "\u25b7";
    }
  };
  motionButton?.addEventListener("click", () => {
    state.userPaused = !state.userPaused;
    updateMotion();
  }, { signal });
  reducedMotion.addEventListener("change", updateMotion, { signal });
  updateMotion();
  if (motionButton) motionButton.hidden = false;

  const activateChapter = (index: number, animate: boolean, syncUrl = false) => {
    state.chapter = index;
    if (syncUrl) history.replaceState(history.state, "", tabs[index].href);
    tabs.forEach((tab, tabIndex) => {
      tab.setAttribute("aria-selected", String(tabIndex === index));
      tab.tabIndex = tabIndex === index ? 0 : -1;
    });
    panels.forEach((panel, panelIndex) => {
      gsap.killTweensOf(panel);
      panel.style.removeProperty("opacity");
      panel.style.removeProperty("transform");
      panel.hidden = panelIndex !== index;
    });
    const active = panels[index];
    if (active && animate && motionEnabled()) {
      motionContext.add(() => {
        gsap.fromTo(active, { opacity: .45, y: 10 }, { opacity: 1, y: 0, duration: .3, ease: "power2.out", clearProps: "opacity,transform" });
      });
    }
  };
  if (tabList && tabs.length === panels.length && tabs.length > 0) {
    tabList.setAttribute("role", "tablist");
    const updateOrientation = () => tabList.setAttribute("aria-orientation", verticalTabs.matches ? "vertical" : "horizontal");
    updateOrientation();
    verticalTabs.addEventListener("change", updateOrientation, { signal });
    tabs.forEach((tab, index) => {
      const panel = panels[index];
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("role", "tabpanel");
      panel.tabIndex = 0;
      panel.setAttribute("aria-labelledby", tab.id);
      tab.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (state.chapter !== index) activateChapter(index, true, true);
      }, { signal });
      tab.addEventListener("keydown", (event) => {
        const forward = verticalTabs.matches ? "ArrowDown" : "ArrowRight";
        const backward = verticalTabs.matches ? "ArrowUp" : "ArrowLeft";
        let next = index;
        if (event.key === forward) next = (index + 1) % tabs.length;
        else if (event.key === backward) next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else if (event.key !== " ") return;
        event.preventDefault();
        tabs[next].focus();
        activateChapter(next, next !== state.chapter, true);
      }, { signal });
    });
    const syncChapterHash = () => {
      const hashIndex = panels.findIndex((panel) => `#${panel.id}` === location.hash);
      if (hashIndex >= 0) activateChapter(hashIndex, false);
    };
    activateChapter(state.chapter, false);
    // A cached return keeps the last chosen tab; explicit hash changes still navigate.
    if (!state.introduced) syncChapterHash();
    window.addEventListener("hashchange", syncChapterHash, { signal });
  }

  const showSceneFallback = () => {
    sceneAvailable = false;
    root.dataset.scene = "fallback";
    sceneFallback?.removeAttribute("hidden");
    if (sceneControls) sceneControls.hidden = true;
    if (sceneStatus) sceneStatus.textContent = "Static illustration.";
    updateSceneVisibility();
  };
  const loadScene = async () => {
    if (sceneRequested || !sceneHost || disposed) return;
    sceneRequested = true;
    try {
      const { createAincradScene } = await import("./aincrad-scene");
      if (disposed) return;
      let unavailable = false;
      const created = createAincradScene(sceneHost, {
        motion: motionEnabled(),
        onUnavailable: () => { unavailable = true; if (!disposed) showSceneFallback(); },
      });
      if (!created || unavailable) {
        created?.dispose();
        showSceneFallback();
        return;
      }
      scene = created;
      sceneAvailable = true;
      scene.setMotion(motionEnabled());
      scene.setView(state.view);
      updateSceneVisibility();
      root.dataset.scene = "ready";
      sceneFallback?.setAttribute("hidden", "");
      if (sceneControls) sceneControls.hidden = false;
      if (sceneStatus) sceneStatus.textContent = "Interactive miniature ready. Use the view and rotation controls to explore.";
    } catch (error) {
      if (disposed) return;
      showSceneFallback();
      console.warn("Aincrad miniature unavailable; showing the static illustration.", error);
    }
  };
  for (const control of root.querySelectorAll<HTMLButtonElement>("[data-scene-view]")) {
    control.setAttribute("aria-pressed", String(control.dataset.sceneView === state.view));
    control.addEventListener("click", () => {
      const view = control.dataset.sceneView;
      if (view !== "world" && view !== "settlement" && view !== "citadel") return;
      state.view = view;
      scene?.setView(view);
      root.querySelectorAll<HTMLButtonElement>("[data-scene-view]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button === control));
      });
    }, { signal });
  }
  for (const control of root.querySelectorAll<HTMLButtonElement>("[data-scene-rotate]")) {
    control.addEventListener("click", () => scene?.rotate(control.dataset.sceneRotate === "-1" ? -1 : 1), { signal });
  }
  document.addEventListener("visibilitychange", updateSceneVisibility, { signal });
  const loadObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      loadObserver.disconnect();
      void loadScene();
    }
  }, { rootMargin: "180px" });
  const visibilityObserver = new IntersectionObserver((entries) => {
    sceneInView = entries.some((entry) => entry.isIntersecting);
    updateSceneVisibility();
  });
  if (sceneStage) {
    loadObserver.observe(sceneStage);
    visibilityObserver.observe(sceneStage);
  }

  if (!state.introduced && motionEnabled()) {
    motionContext.add(() => {
      gsap.from(root.querySelectorAll("[data-hero-enter]"), {
        y: 16, duration: .6, stagger: .07, ease: "power2.out", clearProps: "transform",
      });
    });
  }
  state.introduced = true;
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      revealObserver.unobserve(entry.target);
      if (motionEnabled()) {
        motionContext.add(() => {
          gsap.from(entry.target, { opacity: .5, y: 16, duration: .5, ease: "power2.out", clearProps: "opacity,transform" });
        });
      }
    }
  }, { threshold: .3 });
  root.querySelectorAll("[data-reveal]").forEach((heading) => revealObserver.observe(heading));

  // The theme handles its menu toggle. Fragment navigation must also restore focus.
  const navigation = document.querySelector<HTMLElement>(".at-nav");
  const menuToggle = navigation?.querySelector<HTMLButtonElement>(".at-nav-toggle");
  if (navigation && menuToggle) {
    const mobileMenuOpen = () => getComputedStyle(menuToggle).display !== "none" && menuToggle.getAttribute("aria-expanded") === "true";
    for (const link of navigation.querySelectorAll<HTMLAnchorElement>(".at-nav-links a")) {
      link.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !mobileMenuOpen()) return;
        const url = new URL(link.href);
        if (url.pathname !== location.pathname || !url.hash) return;
        const target = document.getElementById(url.hash.slice(1));
        menuToggle.click();
        if (target) {
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      }, { signal });
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenuOpen()) {
        menuToggle.click();
        menuToggle.focus();
      }
    }, { signal });
  }

  return () => {
    disposed = true;
    listeners.abort();
    loadObserver.disconnect();
    visibilityObserver.disconnect();
    revealObserver.disconnect();
    motionContext.revert();
    scene?.dispose();
    scene = null;
    showSceneFallback();
    if (motionButton) motionButton.hidden = true;
    tabList?.removeAttribute("role");
    tabList?.removeAttribute("aria-orientation");
    tabs.forEach((tab) => {
      for (const attribute of ["role", "aria-controls", "aria-selected", "tabindex"]) tab.removeAttribute(attribute);
    });
    panels.forEach((panel) => {
      panel.hidden = false;
      panel.removeAttribute("role");
      panel.removeAttribute("tabindex");
      const heading = panel.querySelector("h3");
      if (heading) panel.setAttribute("aria-labelledby", heading.id);
    });
  };
}
