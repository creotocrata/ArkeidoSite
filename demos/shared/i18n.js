/* Mini i18n partilhado pelos sites demo (PT / EN / ES).
   HTML: data-i18n (texto), data-i18n-html (HTML), data-i18n-ph (placeholder).
   Botões de idioma: .lang button[data-lang]. */
function initI18n(dict, def, key) {
  var lang = def;
  try { lang = localStorage.getItem(key) || def; } catch (e) {}
  if (!dict[lang]) lang = def;

  function t(k) { var v = dict[lang][k]; return v !== undefined ? v : dict[def][k]; }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var v = t(el.dataset.i18n); if (v !== undefined) el.textContent = v; });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { var v = t(el.dataset.i18nHtml); if (v !== undefined) el.innerHTML = v; });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { var v = t(el.dataset.i18nPh); if (v !== undefined) el.placeholder = v; });
    var title = t('meta.title'); if (title) document.title = title;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });
    try { localStorage.setItem(key, lang); } catch (e) {}
  }

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { lang = b.dataset.lang; apply(); });
  });
  apply();

  // etiqueta "demo" com ligação de volta ao portefólio
  var back = document.createElement('a');
  back.className = 'demo-badge';
  back.href = '../../index.html#portfolio';
  back.innerHTML = '&larr; Arkeido <span>· demo</span>';
  back.style.cssText = 'position:fixed;left:14px;bottom:14px;z-index:999;background:#111;color:#fff;font:500 12px/1 system-ui,sans-serif;padding:9px 14px;border-radius:99px;text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,.35);opacity:.85';
  back.addEventListener('mouseenter', function () { back.style.opacity = 1; });
  back.addEventListener('mouseleave', function () { back.style.opacity = .85; });
  document.body.appendChild(back);

  // formulários de demonstração
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = f.querySelector('.form-note');
      if (n) { n.hidden = false; n.textContent = t('form.demo'); }
      f.reset();
    });
  });

  // scroll reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });

  // menu móvel
  var burger = document.querySelector('.burger'), menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () { menu.classList.toggle('open'); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') menu.classList.remove('open'); });
  }
  return { t: t };
}
