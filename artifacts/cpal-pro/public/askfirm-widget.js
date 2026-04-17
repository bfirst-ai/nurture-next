(function () {
  if (window.__ACCUMAX_ASKFIRM_WIDGET_LOADED__) { return; }
  window.__ACCUMAX_ASKFIRM_WIDGET_LOADED__ = true;

  var SCRIPT_NAME = 'askfirm-widget.js';

  function getScriptEl() {
    if (document.currentScript) return document.currentScript;
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i -= 1) {
      if ((scripts[i].src || '').indexOf(SCRIPT_NAME) !== -1) return scripts[i];
    }
    return null;
  }

  var scriptEl = getScriptEl();
  var ds = (scriptEl && scriptEl.dataset) ? scriptEl.dataset : {};

  function boolValue(v, fallback) {
    if (v === undefined || v === null || v === '') return fallback;
    return String(v).toLowerCase() === 'true';
  }

  var scriptSrc    = (scriptEl && scriptEl.src) ? scriptEl.src : '';
  var scriptOrigin = scriptSrc ? new URL(scriptSrc, window.location.href).origin : window.location.origin;
  var widgetBase   = (ds.widgetUrl || ds.baseUrl || scriptOrigin).replace(/\/$/, '');
  var widgetPath   = ds.path   || '/askfirm';
  var primaryColor = ds.color  || '#10182d';
  var textColor    = ds.textColor || '#FFFFFF';
  var zIndex       = Number(ds.zIndex  || 2147483000);
  var offsetRight  = Number(ds.right   || 24);
  var offsetBottom = Number(ds.bottom  || 24);
  var width        = Number(ds.width   || 420);
  var height       = Number(ds.height  || 680);
  var autoOpen     = boolValue(ds.autoOpen, false);

  var iframeSrc = widgetBase + widgetPath + (widgetPath.indexOf('?') >= 0 ? '&' : '?') + 'embed=1';

  /* ── Launcher sparkles SVG ── */
  var SVG_SPARKLES = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/></svg>';

  /* ── Styles ── */
  var style = document.createElement('style');
  style.id = 'accumax-askfirm-widget-style';
  style.textContent =
    '.accumax-widget-root{position:fixed;right:' + offsetRight + 'px;bottom:' + offsetBottom + 'px;z-index:' + zIndex + ';font-family:Inter,Segoe UI,Arial,sans-serif;display:flex;flex-direction:column;align-items:flex-end;gap:12px;}' +
    '.accumax-widget-launcher{width:54px;height:54px;border-radius:999px;border:none;background:' + primaryColor + ';color:' + textColor + ';cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;line-height:0;transition:background .2s;}' +
    '.accumax-widget-launcher:hover{background:#1c2840;}' +
    '.accumax-widget-launcher:focus{outline:2px solid rgba(255,255,255,.30);outline-offset:2px;}' +
    '.accumax-widget-launcher svg{width:22px;height:22px;display:block;}' +
    '.accumax-widget-panel{width:' + width + 'px;max-width:calc(100vw - 24px);height:' + height + 'px;max-height:calc(100vh - 96px);border-radius:16px;overflow:hidden;border:1px solid rgba(16,24,45,.20);opacity:0;pointer-events:none;transform:translateY(6px);transform-origin:bottom right;transition:opacity .18s ease,transform .18s ease;}' +
    '.accumax-widget-panel.is-open{opacity:1;pointer-events:auto;transform:translateY(0);}' +
    '.accumax-widget-iframe{width:100%;height:100%;border:none;display:block;}' +
    '@media (max-width:640px){.accumax-widget-root{left:12px;right:12px;bottom:12px;align-items:stretch;}.accumax-widget-panel{width:auto;max-width:none;height:min(82vh,680px);max-height:none;}.accumax-widget-launcher{align-self:flex-end;}}';
  document.head.appendChild(style);

  /* ── DOM ── */
  var root = document.createElement('div');
  root.className = 'accumax-widget-root';

  var panel = document.createElement('div');
  panel.className = 'accumax-widget-panel';
  panel.setAttribute('aria-hidden', 'true');

  var iframe = document.createElement('iframe');
  iframe.className = 'accumax-widget-iframe';
  iframe.src = iframeSrc;
  iframe.title = 'Chat';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';

  panel.appendChild(iframe);

  var launcher = document.createElement('button');
  launcher.className = 'accumax-widget-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.innerHTML = SVG_SPARKLES;

  root.appendChild(panel);
  root.appendChild(launcher);
  document.body.appendChild(root);

  /* ── Messages from iframe ── */
  function onWidgetMessage(event) {
    var data = event && event.data ? event.data : null;
    if (!data) return;
    if (data.type === 'askfirm-close') { setOpen(false); return; }
    if (data.type === 'askfirm-config' && data.payload) {
      var dbTitle = data.payload.chatbotName || data.payload.customerName;
      if (dbTitle) iframe.title = String(dbTitle) + ' Chat';
    }
  }
  window.addEventListener('message', onWidgetMessage);

  /* ── Open / close ── */
  var open = false;
  function setOpen(next) {
    open = !!next;
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    launcher.setAttribute('aria-label', open ? 'Close chat' : 'Open chat');
  }

  launcher.addEventListener('click', function () { setOpen(!open); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) { setOpen(false); }
  });

  window.AccumaxChatWidget = {
    open:    function () { setOpen(true); },
    close:   function () { setOpen(false); },
    toggle:  function () { setOpen(!open); },
    destroy: function () {
      if (root.parentNode)  root.parentNode.removeChild(root);
      if (style.parentNode) style.parentNode.removeChild(style);
      window.removeEventListener('message', onWidgetMessage);
      delete window.AccumaxChatWidget;
      delete window.__ACCUMAX_ASKFIRM_WIDGET_LOADED__;
    }
  };

  if (autoOpen) { setOpen(true); }
})();
