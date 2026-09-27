import { gsap } from "gsap";

type AtlasView = "atlas" | "reading";
interface AtlasState { world: string; view: AtlasView; userPaused: boolean; }

/** Keep the HTML readable before enhancement and restore one lifecycle from BFCache. */
export function mountWorldAtlas(root: HTMLElement): () => void {
  const firstWorld = root.querySelector<HTMLElement>("[data-atlas-node]")?.dataset.atlasNode;
  if (!firstWorld) return () => {};
  const state: AtlasState = { world: firstWorld, view: "atlas", userPaused: false };
  let stop: (() => void) | undefined;
  const start = () => { stop ??= initialiseAtlas(root, state, firstWorld); };
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
    window.removeEventListener("pageshow", onPageShow);
    window.removeEventListener("pagehide", onPageHide);
  };
}

function initialiseAtlas(root: HTMLElement, state: AtlasState, firstWorld: string): () => void {
  const listeners = new AbortController();
  const { signal } = listeners;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const phoneLayout = matchMedia("(max-width: 760px)");
  const nodes = [...root.querySelectorAll<HTMLAnchorElement>("[data-atlas-node]")];
  const panels = [...root.querySelectorAll<HTMLElement>("[data-world-panel]")];
  const symbols = [...root.querySelectorAll<SVGGElement>("[data-world-symbol]")];
  const mobileSymbols = [...root.querySelectorAll<SVGGElement>("[data-mobile-world]")];
  const rings = [...root.querySelectorAll<SVGCircleElement>("[data-atlas-ring]")];
  const paths = [...root.querySelectorAll<SVGPathElement>("[data-atlas-path]")];
  const tracers = [...root.querySelectorAll<SVGCircleElement>("[data-atlas-tracer]")];
  const navigation = root.querySelector<HTMLElement>("[data-world-nav]");
  const viewControls = root.querySelector<HTMLElement>("[data-atlas-views]");
  const viewButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-atlas-view]")];
  const motionButton = root.querySelector<HTMLButtonElement>("[data-atlas-motion]");
  const motionLabel = root.querySelector<HTMLElement>("[data-atlas-motion-label]");
  const motionSymbol = root.querySelector<HTMLElement>("[data-atlas-motion-symbol]");
  const studyJump = root.querySelector<HTMLAnchorElement>("[data-study-jump]");
  const notesJump = root.querySelector<HTMLAnchorElement>("[data-notes-jump]");
  const status = root.querySelector<HTMLElement>("[data-atlas-status]");
  const scene = root.querySelector<HTMLElement>("[data-atlas-scene]");
  const toolbar = root.querySelector<HTMLElement>("#atlas-controls");
  const toolbarAnchor = root.querySelector<HTMLElement>("[data-toolbar-anchor]");
  const stage = root.querySelector<HTMLElement>(".wa-stage");
  const siteNav = document.querySelector<HTMLElement>(".at-nav");
  const documentStyle = document.documentElement.style;
  const previousNavHeight = documentStyle.getPropertyValue("--at-nav-height");
  const previousNavPriority = documentStyle.getPropertyPriority("--at-nav-height");
  let measuredNavHeight = "";
  const validWorlds = new Set(nodes.map((node) => node.dataset.atlasNode!));
  const context = gsap.context(() => {}, root);
  let ambient: gsap.core.Timeline | undefined;
  let sceneVisible = false;
  let disposed = false;
  let focusFrame = 0;
  const motionAllowed = () => !state.userPaused && !reduced.matches;

  const readLocation = (): "notes" | "study" | "controls" | null => {
    const url = new URL(location.href);
    state.view = url.searchParams.get("view") === "reading" ? "reading" : "atlas";
    const fragment = url.hash.match(/^#(world|study)-([a-z]+)$/);
    const fragmentWorld = fragment?.[2];
    const candidate = fragmentWorld ?? url.searchParams.get("world");
    if (candidate && validWorlds.has(candidate)) state.world = candidate;
    else if (!url.hash) state.world = firstWorld;
    if (fragmentWorld && validWorlds.has(fragmentWorld)) return fragment?.[1] === "study" ? "study" : "notes";
    if (url.hash === "#atlas-controls") return "controls";
    // Native fragments (including the skip link) and bare-page history keep
    // browser focus and scroll restoration; they are not atlas selections.
    return null;
  };
  const locationFor = (hash: string, world = state.world) => {
    const url = new URL(location.href);
    if (state.view === "reading") url.searchParams.set("view", "reading");
    else url.searchParams.delete("view");
    if (hash === "atlas-controls") url.searchParams.set("world", world);
    else url.searchParams.delete("world");
    url.hash = hash;
    return url;
  };
  const writeLocation = (hash = `world-${state.world}`) => {
    const url = locationFor(hash);
    if (url.href !== location.href) history.pushState(null, "", url);
  };

  const measureChrome = () => {
    if (siteNav) {
      measuredNavHeight = `${Math.ceil(siteNav.getBoundingClientRect().height)}px`;
      documentStyle.setProperty("--at-nav-height", measuredNavHeight);
    }
    if (toolbar) root.style.setProperty("--wa-toolbar-height", `${Math.ceil(toolbar.getBoundingClientRect().height)}px`);
  };
  const measureEmblemTargets = () => {
    if (phoneLayout.matches || state.view !== "atlas") return;
    for (const node of nodes) {
      const symbol = symbols.find((item) => item.dataset.worldSymbol === node.dataset.atlasNode);
      const placement = symbol?.parentNode;
      const hit = node.querySelector<HTMLElement>("[data-atlas-hit]");
      if (!(placement instanceof SVGGraphicsElement) || !hit) continue;
      const matrix = placement.getScreenCTM();
      if (!matrix) continue;
      // Cover the emblem's full selected size and float range, independent of
      // the animation's current frame. The same anchor remains the only stop.
      const topLeft = new DOMPoint(-112, -158).matrixTransform(matrix);
      const bottomRight = new DOMPoint(112, 113).matrixTransform(matrix);
      const nodeBox = node.getBoundingClientRect();
      hit.style.cssText = `left:${topLeft.x - nodeBox.left}px;top:${topLeft.y - nodeBox.top}px;width:${bottomRight.x - topLeft.x}px;height:${bottomRight.y - topLeft.y}px;bottom:auto;transform:none;`;
    }
  };

  const updateActivity = () => {
    const active = motionAllowed() && state.view === "atlas" && sceneVisible && !document.hidden;
    ambient?.paused(!active);
    root.dataset.animationActive = String(active);
    root.dataset.sceneVisible = String(sceneVisible);
  };
  const updateMotion = () => {
    const enabled = motionAllowed();
    root.dataset.motion = enabled ? "running" : "paused";
    if (motionButton && motionLabel && motionSymbol) {
      motionButton.disabled = reduced.matches;
      motionButton.setAttribute("aria-label", reduced.matches ? "Motion disabled by your device preference" : enabled ? "Pause all atlas motion" : "Resume atlas motion");
      motionLabel.textContent = reduced.matches ? "Motion reduced" : enabled ? "Pause motion" : "Resume motion";
      motionSymbol.textContent = enabled ? "Ⅱ" : "▷";
    }
    updateActivity();
  };

  // Every selection establishes all visual properties. No transition depends on
  // the previous tween completing, so rapid navigation cannot strand a symbol.
  const paintWorld = (animate: boolean) => {
    context.add(() => {
      gsap.killTweensOf([...symbols, ...mobileSymbols]);
      for (const symbol of symbols) {
        const selected = symbol.dataset.worldSymbol === state.world;
        gsap.set(symbol, { opacity: selected ? 1 : .45, scale: selected ? 1.12 : .92, transformOrigin: "50% 50%" });
        if (selected && animate && motionAllowed() && sceneVisible && !document.hidden && !phoneLayout.matches) {
          gsap.fromTo(symbol, { scale: .88 }, { scale: 1.12, duration: .65, ease: "back.out(1.4)", overwrite: true });
        }
      }
      for (const symbol of mobileSymbols) {
        const selected = symbol.dataset.mobileWorld === state.world;
        symbol.toggleAttribute("hidden", !selected);
        gsap.set(symbol, { scale: 1, opacity: 1, transformOrigin: "50% 50%" });
        if (selected && animate && motionAllowed() && sceneVisible && !document.hidden && phoneLayout.matches) {
          gsap.fromTo(symbol, { scale: .88 }, { scale: 1, duration: .5, ease: "back.out(1.2)", overwrite: true });
        }
      }
    });
    for (const ring of rings) ring.dataset.selected = String(ring.dataset.atlasRing === state.world);
    for (const path of paths) path.dataset.connected = String(path.dataset.from === state.world || path.dataset.to === state.world);
  };

  const render = (animate = false, announce = false) => {
    root.dataset.view = state.view;
    root.dataset.selectedWorld = state.world;
    const atlasView = state.view === "atlas";
    if (atlasView) navigation?.setAttribute("role", "tablist");
    else navigation?.removeAttribute("role");
    for (const node of nodes) {
      const selected = node.dataset.atlasNode === state.world;
      node.dataset.selected = String(selected);
      if (atlasView) {
        node.setAttribute("role", "tab");
        node.setAttribute("aria-selected", String(selected));
        node.setAttribute("aria-controls", `world-${node.dataset.atlasNode}`);
        node.tabIndex = selected ? 0 : -1;
      } else {
        node.removeAttribute("role");
        node.removeAttribute("aria-selected");
        node.removeAttribute("aria-controls");
        node.removeAttribute("tabindex");
      }
    }
    for (const panel of panels) {
      const selected = panel.dataset.worldPanel === state.world;
      panel.hidden = atlasView && !selected;
      panel.dataset.selected = String(selected);
      panel.setAttribute("aria-labelledby", atlasView ? `atlas-tab-${panel.dataset.worldPanel}` : `world-heading-${panel.dataset.worldPanel}`);
      if (atlasView) {
        panel.setAttribute("role", "tabpanel");
        panel.tabIndex = 0;
      } else {
        panel.removeAttribute("role");
        panel.removeAttribute("tabindex");
      }
    }
    for (const button of viewButtons) button.setAttribute("aria-pressed", String(button.dataset.atlasView === state.view));
    if (studyJump) studyJump.hash = `study-${state.world}`;
    if (notesJump) notesJump.hash = `world-${state.world}`;
    root.querySelectorAll<HTMLAnchorElement>("[data-controls-jump]").forEach((link) => {
      const world = link.closest<HTMLElement>("[data-world-panel]")?.dataset.worldPanel ?? state.world;
      link.href = locationFor("atlas-controls", world).href;
    });
    paintWorld(animate);
    measureEmblemTargets();
    updateActivity();
    if (announce && status) {
      const selectedName = nodes.find((node) => node.dataset.atlasNode === state.world)?.querySelector(".wa-node-name")?.textContent;
      status.textContent = `${selectedName}. ${atlasView ? "Atlas notes selected." : "Reading list; all five settings are available."}`;
    }
  };

  const focusDestination = (destination: "notes" | "study" | "controls" = "notes") => {
    cancelAnimationFrame(focusFrame);
    focusFrame = requestAnimationFrame(() => {
      if (disposed) return;
      const targetId = destination === "controls" ? "atlas-controls" : destination === "study" ? `study-${state.world}` : `world-heading-${state.world}`;
      const target = document.getElementById(targetId);
      measureChrome();
      target?.focus({ preventScroll: true });
      if (destination === "controls" && toolbarAnchor) {
        const navHeight = siteNav?.getBoundingClientRect().height ?? 0;
        window.scrollTo({ top: toolbarAnchor.getBoundingClientRect().top + window.scrollY - navHeight, behavior: "instant" });
      } else {
        const scrollTarget = destination === "notes" ? target?.closest<HTMLElement>("[data-world-panel]") ?? target : target;
        scrollTarget?.scrollIntoView({ block: "start", behavior: "instant" });
      }
    });
  };
  const select = (world: string, moveFocus: boolean) => {
    if (!validWorlds.has(world)) return;
    state.world = world;
    render(true, true);
    writeLocation();
    if (moveFocus) focusDestination();
  };
  const normalClick = (event: MouseEvent) => event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

  root.querySelectorAll<HTMLAnchorElement>("[data-select-world]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!normalClick(event)) return;
      event.preventDefault();
      select(link.dataset.selectWorld!, state.view === "reading" || link.hasAttribute("data-atlas-connection"));
    }, { signal });
  });
  for (const node of nodes) {
    node.addEventListener("keydown", (event) => {
      if (state.view !== "atlas" || event.altKey || event.ctrlKey || event.metaKey) return;
      const index = nodes.indexOf(node);
      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % nodes.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index + nodes.length - 1) % nodes.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = nodes.length - 1;
      else if (event.key !== " ") return;
      event.preventDefault();
      select(nodes[nextIndex].dataset.atlasNode!, false);
      nodes[nextIndex].focus({ preventScroll: true });
    }, { signal });
  }
  for (const button of viewButtons) {
    button.addEventListener("click", () => {
      const view = button.dataset.atlasView as AtlasView;
      if (view === state.view) return;
      state.view = view;
      render(false, true);
      writeLocation();
      focusDestination();
    }, { signal });
  }
  const connectJump = (link: HTMLAnchorElement | null, destination: "notes" | "study") => {
    link?.addEventListener("click", (event) => {
      if (!normalClick(event)) return;
      event.preventDefault();
      writeLocation(`${destination === "study" ? "study" : "world"}-${state.world}`);
      focusDestination(destination);
    }, { signal });
  };
  connectJump(studyJump, "study");
  connectJump(notesJump, "notes");
  root.querySelectorAll<HTMLAnchorElement>("[data-controls-jump]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!normalClick(event)) return;
      event.preventDefault();
      const world = link.closest<HTMLElement>("[data-world-panel]")?.dataset.worldPanel;
      if (world && validWorlds.has(world)) state.world = world;
      render(false);
      writeLocation("atlas-controls");
      focusDestination("controls");
    }, { signal });
  });
  const restoreLocation = () => {
    cancelAnimationFrame(focusFrame);
    const destination = readLocation();
    render(false, Boolean(destination));
    if (destination) focusDestination(destination);
  };
  window.addEventListener("popstate", restoreLocation, { signal });
  window.addEventListener("hashchange", restoreLocation, { signal });

  motionButton?.addEventListener("click", () => {
    state.userPaused = !state.userPaused;
    paintWorld(false);
    updateMotion();
  }, { signal });
  reduced.addEventListener("change", () => {
    if (reduced.matches) ambient?.pause(0);
    paintWorld(false);
    updateMotion();
  }, { signal });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) paintWorld(false);
    updateActivity();
  }, { signal });
  const observer = new IntersectionObserver((entries) => {
    sceneVisible = entries.some((entry) => entry.isIntersecting);
    if (!sceneVisible) paintWorld(false);
    updateActivity();
  }, { threshold: .05 });
  if (scene) observer.observe(scene);
  const layoutObserver = new ResizeObserver(() => {
    measureChrome();
    measureEmblemTargets();
  });
  for (const element of [siteNav, toolbar, stage]) if (element) layoutObserver.observe(element);
  phoneLayout.addEventListener("change", () => {
    paintWorld(false);
    measureEmblemTargets();
  }, { signal });

  context.add(() => {
    ambient = gsap.timeline({ paused: true });
    ambient.to(root.querySelectorAll("[data-atlas-float]"), { y: -13, rotation: .7, duration: 2.8, repeat: -1, yoyo: true, stagger: .21, ease: "sine.inOut", transformOrigin: "50% 50%" }, 0);
    paths.forEach((path, index) => {
      const tracer = tracers[index];
      if (!tracer) return;
      const length = path.getTotalLength();
      const travel = { progress: index * .15 };
      ambient!.to(travel, { progress: 1 + index * .15, duration: 7 + index * 1.4, repeat: -1, ease: "none", onUpdate: () => {
        const point = path.getPointAtLength((travel.progress % 1) * length);
        tracer.setAttribute("cx", String(point.x));
        tracer.setAttribute("cy", String(point.y));
      } }, 0);
    });
  });

  // Preserve the theme's paired expanded/inert menu states on Escape.
  const menuToggle = document.querySelector<HTMLButtonElement>(".at-nav-toggle");
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true" && getComputedStyle(menuToggle).display !== "none") {
      menuToggle.click();
      menuToggle.focus();
    }
  }, { signal });

  const initialDestination = readLocation();
  render();
  root.dataset.enhanced = "true";
  if (viewControls) viewControls.hidden = false;
  if (motionButton) motionButton.hidden = false;
  measureChrome();
  measureEmblemTargets();
  updateMotion();
  if (initialDestination) focusDestination(initialDestination);

  return () => {
    disposed = true;
    listeners.abort();
    observer.disconnect();
    layoutObserver.disconnect();
    cancelAnimationFrame(focusFrame);
    context.revert();
    if (documentStyle.getPropertyValue("--at-nav-height") === measuredNavHeight) {
      if (previousNavHeight) documentStyle.setProperty("--at-nav-height", previousNavHeight, previousNavPriority);
      else documentStyle.removeProperty("--at-nav-height");
    }
    root.style.removeProperty("--wa-toolbar-height");
  };
}
