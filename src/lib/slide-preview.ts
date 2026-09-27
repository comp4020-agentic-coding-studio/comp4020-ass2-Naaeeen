type PreviewMethod = "isReady" | "getState" | "getTotalSlides" | "getSlidePath" | "prev" | "next";

export function mountSlidePreview(root: HTMLElement): () => void {
  let stop: (() => void) | undefined;
  const start = () => { stop ??= initialisePreview(root); };
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

function initialisePreview(root: HTMLElement): () => void {
  const frame = root.querySelector<HTMLIFrameElement>("[data-slide-frame]");
  const controls = root.querySelector<HTMLElement>("[data-slide-controls]");
  const previous = root.querySelector<HTMLButtonElement>("[data-slide-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-slide-next]");
  const position = root.querySelector<HTMLOutputElement>("[data-slide-position]");
  const status = root.querySelector<HTMLElement>("[data-slide-status]");
  const fullscreen = root.querySelector<HTMLButtonElement>("[data-slide-fullscreen]");
  const presentationLinks = [...root.querySelectorAll<HTMLAnchorElement>("[data-open-presentation]")];
  if (!frame || !controls || !previous || !next || !position || !status || !fullscreen) return () => {};
  const deckURL = new URL(root.dataset.deckHref!, location.href);
  const frameOrigin = new URL(frame.src, location.href).origin;
  const listeners = new AbortController();
  const { signal } = listeners;
  let ready = false;
  let total = 0;
  let index = 0;
  let disposed = false;
  let retryTimer = 0;
  let attempts = 0;
  let wasFullscreen = false;

  // The caller chooses from this fixed method set; message payloads never
  // become arbitrary method names or arguments sent back to the frame.
  const send = (method: PreviewMethod) => frame.contentWindow?.postMessage(JSON.stringify({ method, args: [] }), frameOrigin);
  const update = () => {
    previous.disabled = !ready || index === 0;
    next.disabled = !ready || total === 0 || index >= total - 1;
    fullscreen.disabled = !ready;
    position.value = ready ? total > 0 ? `Slide ${index + 1} of ${total}` : "Presentation ready" : "Opening slides";
  };
  const readState = (value: unknown) => {
    if (!value || typeof value !== "object") return;
    const candidate = (value as { indexh?: unknown }).indexh;
    if (typeof candidate === "number" && Number.isSafeInteger(candidate) && candidate >= 0) index = candidate;
  };
  const markReady = () => {
    if (ready) return;
    ready = true;
    clearTimeout(retryTimer);
    root.dataset.slideReady = "true";
    status.textContent = "Use Previous and Next here or in the slides. Open the presentation for a full-window view.";
    send("getTotalSlides");
    send("getState");
    send("getSlidePath");
    update();
  };
  const onMessage = (event: MessageEvent) => {
    if (event.origin !== frameOrigin || event.source !== frame.contentWindow || typeof event.data !== "string") return;
    let message: { namespace?: unknown; eventName?: unknown; state?: unknown; method?: unknown; result?: unknown };
    try { message = JSON.parse(event.data); } catch { return; }
    if (!message || typeof message !== "object" || message.namespace !== "reveal") return;
    if (message.eventName === "ready" || message.eventName === "slidechanged") {
      readState(message.state);
      markReady();
      send("getSlidePath");
      update();
    } else if (message.eventName === "callback") {
      if (message.method === "isReady" && message.result === true) markReady();
      if (message.method === "getState") readState(message.result);
      if (message.method === "getTotalSlides" && typeof message.result === "number" && Number.isSafeInteger(message.result) && message.result > 0) total = message.result;
      if (message.method === "getSlidePath" && typeof message.result === "string" && message.result.startsWith("/")) {
        const currentURL = new URL(deckURL);
        currentURL.hash = message.result;
        presentationLinks.forEach((link) => { link.href = currentURL.href; });
      }
      update();
    }
  };
  const requestReadiness = () => {
    if (disposed || ready) return;
    send("isReady");
    attempts += 1;
    if (attempts < 24) retryTimer = window.setTimeout(requestReadiness, 500);
    else status.textContent = "The preview is taking longer to open. You can open the presentation or read the notes instead.";
  };
  const restartReadiness = () => {
    clearTimeout(retryTimer);
    ready = false;
    total = 0;
    index = 0;
    attempts = 0;
    root.dataset.slideReady = "false";
    presentationLinks.forEach((link) => { link.href = deckURL.href; });
    status.textContent = "Opening the slides. The presentation and readable notes links remain available.";
    update();
    requestReadiness();
  };
  window.addEventListener("message", onMessage, { signal });
  // Each new document must establish readiness itself. A frame load cannot
  // carry forward the previous deck's count, location, or enabled controls.
  frame.addEventListener("load", restartReadiness, { signal });
  previous.addEventListener("click", () => { if (ready) send("prev"); }, { signal });
  next.addEventListener("click", () => { if (ready) send("next"); }, { signal });
  fullscreen.addEventListener("click", () => {
    if (!ready) return;
    void frame.requestFullscreen().catch(() => {
      status.textContent = "Full screen could not open here. Use Open presentation for a full-window view.";
    });
  }, { signal });
  document.addEventListener("fullscreenchange", () => {
    const active = document.fullscreenElement === frame;
    if (wasFullscreen && !active) fullscreen.focus({ preventScroll: true });
    wasFullscreen = active;
  }, { signal });

  controls.hidden = false;
  fullscreen.hidden = !document.fullscreenEnabled || typeof frame.requestFullscreen !== "function";
  // Also probe immediately: a cached frame may load before this controller.
  restartReadiness();

  return () => {
    disposed = true;
    listeners.abort();
    clearTimeout(retryTimer);
  };
}
