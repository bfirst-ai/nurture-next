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
  var primaryColor = ds.color  || '#3abff8';
  var textColor    = ds.textColor || '#ffffff';
  var zIndex       = Number(ds.zIndex  || 2147483000);
  var offsetRight  = Number(ds.right   || 24);
  var offsetBottom = Number(ds.bottom  || 24);
  var width        = Number(ds.width   || 420);
  var height       = Number(ds.height  || 680);
  var autoOpen     = boolValue(ds.autoOpen, false);

  var iframeSrc = widgetBase + widgetPath + (widgetPath.indexOf('?') >= 0 ? '&' : '?') + 'embed=1';

  /* ── Launcher chat SVG ── */
  var SVG_CHAT = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223Z" clip-rule="evenodd"/></svg>';

  /* ── Styles ── */
  var style = document.createElement('style');
  style.id = 'accumax-askfirm-widget-style';
  style.textContent =
    '.accumax-widget-root{position:fixed;right:' + offsetRight + 'px;bottom:' + offsetBottom + 'px;z-index:' + zIndex + ';font-family:Inter,Segoe UI,Arial,sans-serif;display:flex;flex-direction:column;align-items:flex-end;gap:12px;}' +
    '.accumax-widget-launcher{width:54px;height:54px;border-radius:999px;border:1px solid rgba(148,163,184,.20);background:' + primaryColor + ';color:' + textColor + ';cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;line-height:0;transition:background .2s,transform .2s,box-shadow .2s;box-shadow:0 6px 18px rgba(0,0,0,.35);}' +
    '.accumax-widget-launcher:hover{background:#0ea5e9;transform:scale(1.08);box-shadow:0 8px 24px rgba(58,191,248,.45);}' +
    '.accumax-widget-launcher:focus{outline:2px solid rgba(148,163,184,.45);outline-offset:2px;}' +
    '.accumax-widget-launcher svg{width:22px;height:22px;display:block;}' +
    '.accumax-widget-panel{width:' + width + 'px;max-width:calc(100vw - 24px);height:' + height + 'px;max-height:calc(100vh - 96px);border-radius:16px;overflow:hidden;border:1px solid rgba(148,163,184,.18);background:#0f172a;opacity:0;pointer-events:none;transform:translateY(6px);transform-origin:bottom right;transition:opacity .18s ease,transform .18s ease;position:relative;box-shadow:0 12px 48px rgba(0,0,0,.55);}' +
    '.accumax-widget-panel.is-open{opacity:1;pointer-events:auto;transform:translateY(0);}' +
    '.accumax-widget-iframe{width:100%;height:100%;border:none;display:block;}' +
    '.accumax-widget-loader{position:absolute;inset:0;background:#0f172a;display:flex;flex-direction:column;z-index:10;transition:opacity .3s ease;overflow:hidden;}' +
    '.accumax-widget-loader.is-hidden{opacity:0;pointer-events:none;}' +
    '@keyframes accumax-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}' +
    '.accumax-skel-bar{background:linear-gradient(90deg,#1e293b 25%,#2d3f55 50%,#1e293b 75%);background-size:1200px 100%;animation:accumax-shimmer 1.6s infinite linear;border-radius:6px;flex-shrink:0;}' +
    '.accumax-skel-header{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0;}' +
    '.accumax-skel-avatar{width:40px;height:40px;border-radius:8px;}' +
    '.accumax-skel-info{display:flex;flex-direction:column;gap:7px;flex:1;}' +
    '.accumax-skel-name{height:13px;width:110px;}' +
    '.accumax-skel-status{height:9px;width:52px;}' +
    '.accumax-skel-messages{flex:1;padding:20px 14px 12px;display:flex;flex-direction:column;gap:18px;overflow:hidden;}' +
    '.accumax-skel-msg{display:flex;align-items:flex-end;gap:8px;}' +
    '.accumax-skel-msg--user{flex-direction:row-reverse;}' +
    '.accumax-skel-dot{width:32px;height:32px;border-radius:50%;flex-shrink:0;}' +
    '.accumax-skel-bubble-wrap{display:flex;flex-direction:column;gap:7px;}' +
    '.accumax-skel-bubble{height:13px;border-radius:10px;}' +
    '.accumax-skel-bubble--xl{width:200px;}' +
    '.accumax-skel-bubble--lg{width:160px;}' +
    '.accumax-skel-bubble--md{width:120px;}' +
    '.accumax-skel-bubble--sm{width:88px;}' +
    '.accumax-skel-bubble--xs{width:60px;}' +
    '.accumax-skel-input-area{display:flex;align-items:center;gap:8px;padding:10px 14px 14px;border-top:1px solid rgba(255,255,255,.06);flex-shrink:0;}' +
    '.accumax-skel-input{flex:1;height:44px;border-radius:10px;}' +
    '.accumax-skel-send{width:44px;height:44px;border-radius:50%;flex-shrink:0;}' +
    '@media (max-width:640px){.accumax-widget-root{left:12px;right:12px;bottom:12px;align-items:stretch;}.accumax-widget-panel{width:auto;max-width:none;height:min(82vh,680px);max-height:none;}.accumax-widget-launcher{align-self:flex-end;}}';
  document.head.appendChild(style);

  /* ── DOM ── */
  var root = document.createElement('div');
  root.className = 'accumax-widget-root';

  var panel = document.createElement('div');
  panel.className = 'accumax-widget-panel';
  panel.setAttribute('aria-hidden', 'true');

  /* Loading overlay — shown until iframe finishes loading */
  var loader = document.createElement('div');
  loader.className = 'accumax-widget-loader';
  loader.innerHTML =
    '<div class="accumax-skel-header">' +
      '<div class="accumax-skel-bar accumax-skel-avatar"></div>' +
      '<div class="accumax-skel-info">' +
        '<div class="accumax-skel-bar accumax-skel-name"></div>' +
        '<div class="accumax-skel-bar accumax-skel-status"></div>' +
      '</div>' +
    '</div>' +
    '<div class="accumax-skel-messages">' +
      '<div class="accumax-skel-msg">' +
        '<div class="accumax-skel-bar accumax-skel-dot"></div>' +
        '<div class="accumax-skel-bubble-wrap">' +
          '<div class="accumax-skel-bar accumax-skel-bubble accumax-skel-bubble--xl"></div>' +
          '<div class="accumax-skel-bar accumax-skel-bubble accumax-skel-bubble--lg"></div>' +
        '</div>' +
      '</div>' +
      '<div class="accumax-skel-msg accumax-skel-msg--user">' +
        '<div class="accumax-skel-bar accumax-skel-dot"></div>' +
        '<div class="accumax-skel-bubble-wrap">' +
          '<div class="accumax-skel-bar accumax-skel-bubble accumax-skel-bubble--md"></div>' +
        '</div>' +
      '</div>' +
      '<div class="accumax-skel-msg">' +
        '<div class="accumax-skel-bar accumax-skel-dot"></div>' +
        '<div class="accumax-skel-bubble-wrap">' +
          '<div class="accumax-skel-bar accumax-skel-bubble accumax-skel-bubble--lg"></div>' +
          '<div class="accumax-skel-bar accumax-skel-bubble accumax-skel-bubble--md"></div>' +
          '<div class="accumax-skel-bar accumax-skel-bubble accumax-skel-bubble--xs"></div>' +
        '</div>' +
      '</div>' +
      '<div class="accumax-skel-msg accumax-skel-msg--user">' +
        '<div class="accumax-skel-bar accumax-skel-dot"></div>' +
        '<div class="accumax-skel-bubble-wrap">' +
          '<div class="accumax-skel-bar accumax-skel-bubble accumax-skel-bubble--sm"></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="accumax-skel-input-area">' +
      '<div class="accumax-skel-bar accumax-skel-input"></div>' +
      '<div class="accumax-skel-bar accumax-skel-send"></div>' +
    '</div>';
  panel.appendChild(loader);

  var iframe = document.createElement('iframe');
  iframe.className = 'accumax-widget-iframe';
  /* src is intentionally NOT set here — deferred to first open for fast page load */
  iframe.title = 'Chat';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.setAttribute('allow', 'microphone; camera');

  iframe.addEventListener('load', function () {
    loader.classList.add('is-hidden');
    setTimeout(function () { loader.style.display = 'none'; }, 350);
  });

  panel.appendChild(iframe);

  var launcher = document.createElement('button');
  launcher.className = 'accumax-widget-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.innerHTML = SVG_CHAT;

  root.appendChild(panel);
  root.appendChild(launcher);
  document.body.appendChild(root);

  /* ── Messages from iframe ── */
  function onWidgetMessage(event) {
    var data = event && event.data ? event.data : null;
    if (!data) return;
    if (data.type === 'askfirm-close') { setOpen(false); return; }
    if (data.type === 'askfirm-fullscreen') {
      window.open(widgetBase + widgetPath, '_blank', 'noopener,noreferrer');
      return;
    }
    if (data.type === 'askfirm-config' && data.payload) {
      var dbTitle = data.payload.chatbotName || data.payload.customerName;
      if (dbTitle) iframe.title = String(dbTitle) + ' Chat';
    }
  }
  window.addEventListener('message', onWidgetMessage);

  /* ── Open / close ── */
  var open = false;
  var iframeLoaded = false;

  function setOpen(next) {
    open = !!next;

    /* On first open: inject the iframe src so the page starts loading */
    if (open && !iframeLoaded) {
      iframeLoaded = true;
      iframe.src = iframeSrc;
    }

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
