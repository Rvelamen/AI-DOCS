/**
 * AI Docs — Shared Navigation Bar
 * Auto-injects sticky nav + theme toggle into every page.
 */
(function(){
  'use strict';

  // ---- Inject nav CSS (self-contained, no external dependency) ----
  const navCss = `
    .site-nav{
      position:sticky;top:0;z-index:100;
      background:rgba(13,15,20,.9);
      backdrop-filter:blur(12px);
      border-bottom:1px solid #252a38;
      font-family:system-ui,-apple-system,sans-serif;
    }
    [data-theme="light"] .site-nav{
      background:rgba(250,250,250,.9);
      border-bottom-color:#e2e4ea;
    }
    .site-nav-inner{
      max-width:960px;margin:0 auto;padding:0 24px;
      display:flex;align-items:center;justify-content:space-between;
      height:60px;
    }
    .site-nav a{
      font-family:'JetBrains Mono',monospace;font-size:13px;
      color:#8b90a5;text-decoration:none;transition:color .2s;
    }
    .site-nav a:hover{color:var(--accent,#c084fc)}
    .site-nav .back::before{content:"← "}
    .site-nav .nav-brand{
      display:flex;align-items:center;gap:12px;
      font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;
      color:#e8eaf0;text-decoration:none;letter-spacing:.02em;
    }
    [data-theme="light"] .site-nav .nav-brand{color:#1a1d26}
    .site-nav .nav-brand .logo{
      width:36px;height:36px;border-radius:10px;
      background:rgba(192,132,252,.12);border:1px solid rgba(192,132,252,.25);
      display:flex;align-items:center;justify-content:center;
      font-size:18px;color:#c084fc;
    }
    .site-nav-right{display:flex;align-items:center;gap:12px}
    .site-nav-links{display:flex;gap:8px}
    .site-nav-links a{
      font-family:'JetBrains Mono',monospace;font-size:12px;
      color:#555a70;padding:6px 14px;border-radius:100px;
      border:1px solid #252a38;transition:all .25s ease;letter-spacing:.04em;
    }
    [data-theme="light"] .site-nav-links a{
      color:#9ca3b3;border-color:#e2e4ea;
    }
    .site-nav-links a:hover{
      color:#e8eaf0;border-color:#3a4160;
    }
    [data-theme="light"] .site-nav-links a:hover{
      color:#1a1d26;border-color:#d0d3db;
    }
    .theme-toggle{
      background:none;border:none;cursor:pointer;
      font-size:18px;color:#555a70;
      padding:4px 8px;border-radius:6px;transition:all .2s ease;
    }
    .theme-toggle:hover{color:#c084fc;background:rgba(192,132,252,.12)}
    [data-theme="light"] .theme-toggle{color:#9ca3b3}
    [data-theme="light"] .theme-toggle:hover{color:#c084fc}
    @media(max-width:640px){.site-nav-links{display:none}}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = navCss;
  document.head.appendChild(styleEl);

  // ---- Detect page type ----
  const path = location.pathname;
  const isHome = path === '/' || path.endsWith('/index.html') || path.endsWith('/AI-DOCS/');
  const isArticle = path.includes('/article/');

  // ---- Determine brand / back link ----
  const homeHref = isArticle ? '../index.html' : '/';
  const brandHtml = isHome
    ? '<a href="/" class="nav-brand"><span class="logo">📖</span>AI Docs</a>'
    : '<a href="' + homeHref + '" class="nav-brand back">返回首页</a>';

  // ---- Build nav HTML ----
  const navHtml =
    '<nav class="site-nav">' +
      '<div class="site-nav-inner">' +
        brandHtml +
        '<div class="site-nav-right">' +
          '<button class="theme-toggle" id="themeToggle" title="切换主题">🌙</button>' +
          '<div class="site-nav-links">' +
            '<a href="' + homeHref + '">首页</a>' +
            '<a href="https://github.com/openclaw/openclaw" target="_blank">GitHub</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</nav>';

  // ---- Inject nav as first child of <body> ----
  const temp = document.createElement('div');
  temp.innerHTML = navHtml;
  document.body.insertBefore(temp.firstElementChild, document.body.firstChild);

  // ---- Theme logic ----
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  function applyTheme(isLight) {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      if (toggle) toggle.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (toggle) toggle.textContent = '🌙';
    }
  }

  applyTheme(saved === 'light' || (!saved && prefersLight));

  if (toggle) {
    toggle.addEventListener('click', function() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      applyTheme(!isLight);
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
    });
  }
})();
