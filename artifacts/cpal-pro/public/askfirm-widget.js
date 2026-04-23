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
  var primaryColor = ds.color  || '#1e40af'; 
  var textColor    = ds.textColor || '#ffffff';
  var zIndex       = Number(ds.zIndex  || 2147483000);
  var offsetRight  = Number(ds.right   || 24);
  var offsetBottom = Number(ds.bottom  || 24);
  var width        = Number(ds.width   || 420);
  var height       = Number(ds.height  || 680);
  var autoOpen     = boolValue(ds.autoOpen, false);
  var firmName     = ds.firmName || 'Nurture Next';

  var iframeSrc = widgetBase + widgetPath + (widgetPath.indexOf('?') >= 0 ? '&' : '?') + 'embed=1' +
    (primaryColor ? '&color=' + encodeURIComponent(primaryColor) : '') +
    (ds.logo ? '&logo=' + encodeURIComponent(ds.logo) : '');

  var SVG_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  var SVG_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  var SVG_FULLSCREEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';

  /* ── Styles ── */
  var style = document.createElement('style');
  style.id = 'accumax-askfirm-widget-style';
  style.textContent =
    '.accumax-widget-root{position:fixed;right:' + offsetRight + 'px;bottom:' + offsetBottom + 'px;z-index:' + zIndex + ';font-family:"Poppins","Inter",sans-serif;display:flex;flex-direction:column;align-items:flex-end;gap:12px;}' +
    '.accumax-widget-launcher{width:60px;height:60px;border-radius:20px;border:none;background:' + primaryColor + ';color:' + textColor + ';cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 25px rgba(30,64,175,.3);position:relative;}' +
    '.accumax-widget-launcher:hover{transform:scale(1.05) translateY(-2px);box-shadow:0 12px 30px rgba(30,64,175,.4);}' +
    '.accumax-widget-launcher svg{width:28px;height:28px;display:block;transition:transform .3s ease;}' +
    '.accumax-widget-panel{width:' + width + 'px;max-width:calc(100vw - 32px);height:' + height + 'px;max-height:calc(100vh - 120px);border-radius:24px;overflow:hidden;border:1px solid rgba(226,232,240,.8);background:#ffffff;opacity:0;pointer-events:none;transform:translateY(20px) scale(0.95);transform-origin:bottom right;transition:all .4s cubic-bezier(.2,0,.2,1);position:relative;box-shadow:0 20px 50px rgba(15,23,42,.15);display:flex;flex-direction:column;}' +
    '.accumax-widget-panel.is-open{opacity:1;pointer-events:auto;transform:translateY(0) scale(1);}' +
    '.accumax-widget-iframe{flex:1;width:100%;border:none;display:block;background:#ffffff;}' +
    '.accumax-widget-loader{position:absolute;inset:0;background:#ffffff;display:flex;flex-direction:column;z-index:10;transition:opacity .4s ease;overflow:hidden;}' +
    '.accumax-widget-loader.is-hidden{opacity:0;pointer-events:none;}' +
    '@keyframes accumax-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}' +
    '.accumax-skel-bar{background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);background-size:1200px 100%;animation:accumax-shimmer 1.6s infinite linear;border-radius:6px;flex-shrink:0;}' +
    '.accumax-skel-messages{flex:1;padding:24px 16px;display:flex;flex-direction:column;gap:20px;overflow:hidden;background:#f9fafb;}' +
    '.accumax-skel-msg{display:flex;align-items:flex-end;gap:10px;}' +
    '.accumax-skel-msg--user{flex-direction:row-reverse;}' +
    '.accumax-skel-dot{width:32px;height:32px;border-radius:10px;flex-shrink:0;}' +
    '.accumax-skel-bubble-wrap{display:flex;flex-direction:column;gap:8px;}' +
    '.accumax-skel-bubble{height:14px;border-radius:12px;}' +
    '.accumax-skel-bubble--xl{width:220px;}' +
    '.accumax-skel-bubble--lg{width:180px;}' +
    '.accumax-skel-bubble--md{width:140px;}' +
    '.accumax-skel-input-area{display:flex;align-items:center;gap:12px;padding:16px 20px 24px;border-top:1px solid rgba(0,0,0,.04);flex-shrink:0;background:#ffffff;}' +
    '.accumax-skel-input{flex:1;height:44px;border-radius:22px;}' +
    '.accumax-skel-send{width:44px;height:44px;border-radius:14px;flex-shrink:0;}' +
    '@media (max-width:640px){.accumax-widget-root{left:12px;right:12px;bottom:12px;gap:10px;}.accumax-widget-panel{width:auto;max-width:none;height:calc(100vh - 100px);border-radius:24px;}.accumax-widget-launcher{width:56px;height:56px;}}';
  document.head.appendChild(style);

  /* ── DOM ── */
  var root = document.createElement('div');
  root.className = 'accumax-widget-root';

  var panel = document.createElement('div');
  panel.className = 'accumax-widget-panel';
  panel.setAttribute('aria-hidden', 'true');


  /* Loading overlay */
  var loader = document.createElement('div');
  loader.className = 'accumax-widget-loader';
  loader.innerHTML =
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
    '</div>' +
    '<div class="accumax-skel-input-area">' +
      '<div class="accumax-skel-bar accumax-skel-input"></div>' +
      '<div class="accumax-skel-bar accumax-skel-send"></div>' +
    '</div>';
  panel.appendChild(loader);

  var iframe = document.createElement('iframe');
  iframe.className = 'accumax-widget-iframe';
  iframe.title = 'Chat';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.setAttribute('allow', 'microphone; camera');

  iframe.addEventListener('load', function () {
    loader.classList.add('is-hidden');
    setTimeout(function () { loader.style.display = 'none'; }, 450);
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
  }
  window.addEventListener('message', onWidgetMessage);

  /* ── Open / close ── */
  var open = false;
  var iframeLoaded = false;

  function setOpen(next) {
    open = !!next;

    if (open && !iframeLoaded) {
      iframeLoaded = true;
      iframe.src = iframeSrc;
    }

    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    launcher.setAttribute('aria-label', open ? 'Close chat' : 'Open chat');
    
    if (open) {
      launcher.innerHTML = SVG_CLOSE;
      launcher.style.transform = 'rotate(90deg)';
    } else {
      launcher.innerHTML = SVG_CHAT;
      launcher.style.transform = '';
    }
  }

  launcher.addEventListener('click', function () { setOpen(!open); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) { setOpen(false); }
  });

  window.AccumaxChatWidget = {
    open:    function () { setOpen(true); },
    close:   function () { setOpen(false); },
    toggle:  function () { setOpen(!open); },
    setTitle: function (newTitle) {
      // No header to update
    },
    destroy: function () {
      if (root.parentNode)  root.parentNode.removeChild(root);
      if (style.parentNode) style.parentNode.removeChild(style);
      delete window.AccumaxChatWidget;
      delete window.__ACCUMAX_ASKFIRM_WIDGET_LOADED__;
    }
  };

  if (autoOpen) { setOpen(true); }
})();
