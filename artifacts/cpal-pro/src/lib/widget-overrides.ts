/**
 * Site-level tweaks to the embedded FrontDesk widget.
 *
 * The widget is a shared bundle served from the AccuMax portal, so its starter
 * questions are the same for every firm. This site does not want to offer the
 * ones below, and the widget renders inside an open shadow root, so they are
 * removed from here as they appear rather than by waiting on a widget release.
 */
const HIDDEN_STARTERS = ["what are your office hours?"];

const normalise = (text: string | null) => (text || "").trim().toLowerCase();

function removeHiddenStarters(root: ShadowRoot) {
  root.querySelectorAll<HTMLElement>(".acpw-starter").forEach((el) => {
    if (HIDDEN_STARTERS.includes(normalise(el.textContent))) el.remove();
  });
}

export function applyWidgetOverrides() {
  let observed: ShadowRoot | null = null;

  const attach = () => {
    const root = document.getElementById("askcpal-widget-root")?.shadowRoot;
    if (!root || root === observed) return;
    observed = root;
    removeHiddenStarters(root);
    // The starters re-render each time the panel opens or the chat is reset.
    new MutationObserver(() => removeHiddenStarters(root)).observe(root, {
      childList: true,
      subtree: true,
    });
  };

  // The widget script loads async, so its host element may not exist yet.
  attach();
  if (!observed) {
    const waiter = new MutationObserver(() => {
      attach();
      if (observed) waiter.disconnect();
    });
    waiter.observe(document.body, { childList: true });
  }
}
