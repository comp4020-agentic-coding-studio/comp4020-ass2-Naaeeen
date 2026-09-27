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
  const atmosphere = root.querySelector<HTMLElement>(".ic-atmosphere");
  const readingTrack = root.querySelector<HTMLElement>("[data-reading-track]");
  const readingProgress = root.querySelector<HTMLElement>("[data-reading-progress]");
  const tabList = root.querySelector<HTMLElement>("[data-chapter-tabs]");
  const indicator = root.querySelector<HTMLElement>("[data-chapter-indicator]");
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>("[data-chapter-tab]")];
  const panels = [...root.querySelectorAll<HTMLElement>("[data-chapter-panel]")];
  const diagrams = [...root.querySelectorAll<SVGSVGElement>("[data-chapter-art]")];
  let scene: AincradScene | null = null;
  let sceneAvailable = false;
  let sceneRequested = false;
  let sceneInView = false;
  let diagramInView = false;
  let activeDiagram: SVGSVGElement | null = null;
  let diagramLoop: gsap.core.Tween | null = null;
  let indicatorTween: gsap.core.Tween | null = null;
  let chapterContext: gsap.Context | null = null;
  let disposed = false;
  let frame = 0;
  let layoutDirty = true;
  let lastSceneProgress = -1;
  let motionContext = gsap.context(() => {}, root);
  const motionEnabled = () => !state.userPaused && !reducedMotion.matches;
  const clamp = (value: number) => Math.max(0, Math.min(1, value));

  const updateActivity = () => {
    const visible = sceneInView && !document.hidden;
    root.dataset.sceneVisible = String(visible);
    scene?.setVisible(sceneAvailable && visible);
    diagramLoop?.paused(!motionEnabled() || !diagramInView || document.hidden);
  };

  const positionIndicator = (animate: boolean) => {
    const selected = tabs[state.chapter];
    if (!indicator || !tabList || !selected) return;
    const listRect = tabList.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();
    const vertical = verticalTabs.matches;
    const pose = {
      x: vertical ? 0 : selectedRect.left - listRect.left,
      y: vertical ? selectedRect.top - listRect.top : tabList.clientHeight - 3,
      width: vertical ? 3 : selectedRect.width,
      height: vertical ? selectedRect.height : 3,
    };
    indicatorTween?.kill();
    indicator.hidden = false;
    if (animate && motionEnabled()) {
      indicatorTween = gsap.to(indicator, { ...pose, duration: .5, ease: "power3.inOut" });
    } else gsap.set(indicator, pose);
  };

  const updateFrame = () => {
    frame = 0;
    if (disposed || document.hidden) return;
    const bounds = root.getBoundingClientRect();
    const read = clamp(-bounds.top / Math.max(1, bounds.height - innerHeight));
    if (readingProgress) readingProgress.style.transform = `scaleX(${read})`;
    if (layoutDirty) {
      positionIndicator(false);
      layoutDirty = false;
    }
    if (motionEnabled() && sceneInView && sceneStage) {
      const stage = sceneStage.getBoundingClientRect();
      const progress = clamp((innerHeight * .3 - stage.top) / Math.max(1, stage.height + innerHeight * .3));
      if (Math.abs(progress - lastSceneProgress) > .001) {
        scene?.setScrollProgress(progress);
        atmosphere?.style.setProperty("--ic-atmosphere-y", `${progress * 72}px`);
        lastSceneProgress = progress;
      }
    }
  };
  const scheduleFrame = () => {
    if (!frame && !disposed && !document.hidden) frame = requestAnimationFrame(updateFrame);
  };
  const scheduleLayout = () => { layoutDirty = true; scheduleFrame(); };

  const updateMotion = () => {
    const enabled = motionEnabled();
    root.dataset.motion = enabled ? "running" : "paused";
    if (!enabled) {
      // Finish finite content transitions in their readable layout; ambient work freezes.
      motionContext.revert();
      motionContext = gsap.context(() => {}, root);
      chapterContext?.revert();
      chapterContext = null;
      positionIndicator(false);
    }
    scene?.setMotion(enabled);
    updateActivity();
    lastSceneProgress = -1;
    scheduleFrame();
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

  const prepareDiagram = (panel: HTMLElement) => {
    const previousDiagram = activeDiagram;
    const wasInView = diagramInView;
    diagramLoop?.kill();
    diagramLoop = null;
    activeDiagram?.removeAttribute("data-animated");
    activeDiagram = panel.querySelector<SVGSVGElement>("[data-chapter-art]");
    diagramInView = activeDiagram === previousDiagram && wasInView;
    const route = activeDiagram?.querySelector<SVGPathElement>("[data-art-route]");
    const traveler = activeDiagram?.querySelector<SVGCircleElement>("[data-art-traveler]");
    const halo = activeDiagram?.querySelector<SVGCircleElement>("[data-art-halo]");
    if (!route || !traveler || !halo || !activeDiagram) return;
    const length = route.getTotalLength();
    const travel = { progress: 0 };
    const placeTraveler = () => {
      const point = route.getPointAtLength(length * travel.progress);
      for (const marker of [traveler, halo]) {
        marker.setAttribute("cx", String(point.x));
        marker.setAttribute("cy", String(point.y));
      }
    };
    placeTraveler();
    activeDiagram.setAttribute("data-animated", "");
    diagramLoop = gsap.to(travel, {
      progress: 1, duration: 8, ease: "none", repeat: -1, paused: true, onUpdate: placeTraveler,
    });
  };

  const activateChapter = (index: number, animate: boolean, syncUrl = false) => {
    const direction = index >= state.chapter ? 1 : -1;
    state.chapter = index;
    if (syncUrl) history.replaceState(history.state, "", tabs[index].href);
    chapterContext?.revert();
    chapterContext = null;
    tabs.forEach((tab, tabIndex) => {
      tab.setAttribute("aria-selected", String(tabIndex === index));
      tab.tabIndex = tabIndex === index ? 0 : -1;
    });
    panels.forEach((panel, panelIndex) => { panel.hidden = panelIndex !== index; });
    const active = panels[index];
    positionIndicator(animate);
    if (!active) return;
    prepareDiagram(active);
    if (animate && motionEnabled()) {
      chapterContext = gsap.context(() => {
        const sequence = gsap.timeline();
        sequence.from(active.querySelectorAll(".ic-chapter-questions li"), {
          x: direction * 28, duration: .42, stagger: .06, ease: "power3.out", clearProps: "transform",
        }, 0);
        const art = active.querySelector<SVGSVGElement>("[data-chapter-art]");
        if (art) {
          sequence.from(art, { x: direction * 52, scale: .84, duration: .72, ease: "power3.out", clearProps: "transform" }, 0);
          art.querySelectorAll<SVGPathElement>("[data-art-trace]").forEach((path, pathIndex) => {
            const length = path.getTotalLength();
            sequence.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
              strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset",
            }, .12 + pathIndex * .12);
          });
        }
      }, active);
    }
    updateActivity();
    scheduleFrame();
  };
  if (tabList && tabs.length === panels.length && tabs.length > 0) {
    tabList.setAttribute("role", "tablist");
    const updateOrientation = () => {
      tabList.setAttribute("aria-orientation", verticalTabs.matches ? "vertical" : "horizontal");
      scheduleLayout();
    };
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
    updateActivity();
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
      lastSceneProgress = -1;
      updateActivity();
      scheduleFrame();
      root.dataset.scene = "ready";
      sceneFallback?.setAttribute("hidden", "");
      if (sceneControls) sceneControls.hidden = false;
      if (sceneStatus) sceneStatus.textContent = "Aincrad model ready. Use Exterior, Lower ring or Summit and the rotation controls to explore.";
    } catch (error) {
      if (disposed) return;
      showSceneFallback();
      console.warn("Aincrad model unavailable; showing the static illustration.", error);
    }
  };
  for (const control of root.querySelectorAll<HTMLButtonElement>("[data-scene-view]")) {
    control.setAttribute("aria-pressed", String(control.dataset.sceneView === state.view));
    control.addEventListener("click", () => {
      const view = control.dataset.sceneView;
      if (view !== "world" && view !== "settlement" && view !== "citadel") return;
      state.view = view;
      scene?.setView(view);
      lastSceneProgress = -1;
      scheduleFrame();
      root.querySelectorAll<HTMLButtonElement>("[data-scene-view]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button === control));
      });
    }, { signal });
  }
  for (const control of root.querySelectorAll<HTMLButtonElement>("[data-scene-rotate]")) {
    control.addEventListener("click", () => scene?.rotate(control.dataset.sceneRotate === "-1" ? -1 : 1), { signal });
  }
  document.addEventListener("visibilitychange", () => {
    updateActivity();
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
    else scheduleFrame();
  }, { signal });
  window.addEventListener("scroll", scheduleFrame, { signal, passive: true });
  window.addEventListener("resize", scheduleLayout, { signal, passive: true });
  const layoutObserver = new ResizeObserver((entries) => {
    if (entries.some((entry) => entry.target === tabList)) layoutDirty = true;
    scheduleFrame();
  });
  layoutObserver.observe(root);
  if (tabList) layoutObserver.observe(tabList);
  const loadObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      loadObserver.disconnect();
      void loadScene();
    }
  }, { rootMargin: "180px" });
  const visibilityObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === sceneStage) sceneInView = entry.isIntersecting;
      if (entry.target === activeDiagram) diagramInView = entry.isIntersecting;
    }
    updateActivity();
    scheduleFrame();
  });
  if (sceneStage) {
    loadObserver.observe(sceneStage);
    visibilityObserver.observe(sceneStage);
  }
  diagrams.forEach((diagram) => visibilityObserver.observe(diagram));

  updateMotion();
  if (motionButton) motionButton.hidden = false;
  if (readingTrack) readingTrack.hidden = false;
  if (!state.introduced && motionEnabled()) {
    motionContext.add(() => {
      const opening = gsap.timeline();
      opening.from(root.querySelector(".ic-title-after"), { x: verticalTabs.matches ? 0 : -56, y: verticalTabs.matches ? 32 : 12, duration: .9, ease: "power3.out", clearProps: "transform" }, 0)
        .from(root.querySelector(".ic-title-aincrad"), { x: verticalTabs.matches ? 0 : 56, y: verticalTabs.matches ? 32 : 12, duration: .9, ease: "power3.out", clearProps: "transform" }, .04)
        .from(root.querySelectorAll(".ic-hero-index, .ic-subtitle, .ic-hero-introduction, .ic-hero-actions"), { y: 22, duration: .65, stagger: .06, ease: "power3.out", clearProps: "transform" }, 0)
        .from(root.querySelector("[data-hero-rule]"), { scaleX: 0, duration: .85, ease: "power2.inOut", clearProps: "transform" }, .08);
    });
  }
  state.introduced = true;
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      revealObserver.unobserve(entry.target);
      if (motionEnabled()) {
        motionContext.add(() => {
          gsap.from(entry.target, { y: 24, duration: .65, ease: "power3.out", clearProps: "transform" });
          const rule = entry.target.closest("[data-section-reveal]")?.querySelector("[data-section-rule]");
          if (rule) gsap.from(rule, { scaleX: 0, duration: 1.1, ease: "power3.inOut", clearProps: "transform" });
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
    if (frame) cancelAnimationFrame(frame);
    loadObserver.disconnect();
    visibilityObserver.disconnect();
    revealObserver.disconnect();
    layoutObserver.disconnect();
    motionContext.revert();
    chapterContext?.revert();
    indicatorTween?.kill();
    diagramLoop?.kill();
    diagramLoop = null;
    activeDiagram?.removeAttribute("data-animated");
    scene?.dispose();
    scene = null;
    sceneInView = false;
    showSceneFallback();
    atmosphere?.style.removeProperty("--ic-atmosphere-y");
    if (motionButton) motionButton.hidden = true;
    if (readingTrack) readingTrack.hidden = true;
    if (indicator) { indicator.hidden = true; indicator.removeAttribute("style"); }
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
