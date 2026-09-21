/* Portfólio orientado a dados.
   Fonte: localStorage (edições feitas no modo de edição) ou, se vazio, window.PROJECTS (js/projects.js). */
(function () {
  var KEY = 'arkeido.projects.v1';
  var work = document.getElementById('work');
  var filters = document.getElementById('filters');
  var filter = 'all';
  var editing = false;
  var list = load();

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function load() {
    try {
      var s = localStorage.getItem(KEY);
      if (s) {
        var a = JSON.parse(s);
        // já publicado: um rascunho local igual ao site deixa de ser preciso
        if (JSON.stringify(a) === JSON.stringify(window.PROJECTS || [])) { localStorage.removeItem(KEY); return clone(window.PROJECTS || []); }
        if (Array.isArray(a)) return a;
      }
    } catch (e) {}
    return clone(window.PROJECTS || []);
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch (e) { return false; }
  }

  // só permite ligações relativas, http(s) e mailto (bloqueia javascript: etc.)
  function safeUrl(u) {
    u = (u || '').trim();
    if (/^[a-z][a-z0-9+.-]*:/i.test(u) && !/^(https?|mailto):/i.test(u)) return '';
    return u;
  }
  function safeImg(u) {
    u = (u || '').trim();
    if (/^data:image\/(png|jpe?g|webp|gif|svg\+xml);/i.test(u)) return u;
    return /^[a-z][a-z0-9+.-]*:/i.test(u) && !/^https?:/i.test(u) ? '' : u;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // `dict` e `lang` vêm de main.js (carregado antes)
  function t(k) { return (dict[lang] && dict[lang][k]) || k; }
  function tt(pt, en) { return lang === 'en' ? en : pt; }

  function tool(label, glyph, fn) {
    var b = el('button', null, glyph);
    b.type = 'button'; b.title = label; b.setAttribute('aria-label', label);
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); fn(); });
    return b;
  }

  // capa + imagens extra, sem repetições nem endereços perigosos
  function gallery(p) {
    var out = [];
    [p.img].concat(p.imgs || []).forEach(function (u) { u = safeImg(u); if (u && out.indexOf(u) < 0) out.push(u); });
    return out;
  }

  var lb, lbState = { p: null, pics: [], i: 0 };
  function openGallery(p) {
    var pics = gallery(p); if (!pics.length) return;
    if (!lb) buildLightbox();
    lbState = { p: p, pics: pics, i: 0 };
    showPic(); lb.showModal();
  }
  function buildLightbox() {
    lb = el('dialog', 'lightbox');
    var close = el('button', 'lb-x', '✕'); close.type = 'button'; close.setAttribute('aria-label', 'Close');
    var prev = el('button', 'lb-nav lb-prev', '‹'); prev.type = 'button'; prev.setAttribute('aria-label', 'Previous');
    var next = el('button', 'lb-nav lb-next', '›'); next.type = 'button'; next.setAttribute('aria-label', 'Next');
    var fig = el('figure');
    fig.appendChild(el('img'));
    var cap = el('figcaption');
    cap.appendChild(el('h4')); cap.appendChild(el('p', 'lb-desc')); cap.appendChild(el('span', 'lb-count'));
    var link = el('a', 'lb-link'); link.target = '_blank'; link.rel = 'noopener'; cap.appendChild(link);
    fig.appendChild(cap);
    [close, prev, next, fig].forEach(function (n) { lb.appendChild(n); });
    document.body.appendChild(lb);
    function go(d) { var n = lbState.pics.length; lbState.i = (lbState.i + d + n) % n; showPic(); }
    close.addEventListener('click', function () { lb.close(); });
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') go(-1); else if (e.key === 'ArrowRight') go(1); });
  }
  function showPic() {
    var p = lbState.p, n = lbState.pics.length;
    lb.querySelector('img').src = lbState.pics[lbState.i]; lb.querySelector('img').alt = p.title;
    lb.querySelector('h4').textContent = p.title;
    lb.querySelector('.lb-desc').textContent = (p.desc && (p.desc[lang] || p.desc.pt || p.desc.en)) || '';
    lb.querySelector('.lb-count').textContent = n > 1 ? (lbState.i + 1) + ' / ' + n : '';
    lb.querySelectorAll('.lb-nav').forEach(function (b) { b.hidden = n < 2; });
    var url = safeUrl(p.url), a = lb.querySelector('.lb-link');
    a.hidden = !url; if (url) { a.href = url; a.textContent = t('port.visit') + ' ↗'; }
  }

  function buildItem(p) {
    var art = el('article', 'item');
    art.dataset.cat = p.placeholder ? '' : p.cat; art.dataset.id = p.id;
    if (filter !== 'all' && art.dataset.cat !== filter) art.classList.add('hide');
    if (p.placeholder) {
      art.classList.add('placeholder');
      var ph = el('div', 'ilink');
      ph.appendChild(el('div', 'ph-box', '+'));
      ph.appendChild(el('div', 'meta')).appendChild(el('h4', null, t('port.soon')));
      art.appendChild(ph);
      if (editing) art.appendChild(buildTools(p, true));
      return art;
    }

    var url = safeUrl(p.url);
    var a = el('a', 'ilink');
    a.href = url || '#contacto';
    if (url && /^https?:|\.html?$|\/$/i.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
    a.addEventListener('click', function (e) { if (editing) { e.preventDefault(); return; } if (p.imgs && p.imgs.length) { e.preventDefault(); openGallery(p); } });

    var pics = gallery(p);
    var thumb = el('div', 'thumb t' + (p.grad || 1));
    var img = pics[0] || '';
    if (pics.length > 1) thumb.appendChild(el('span', 'count', '▣ ' + pics.length));
    if (img) {
      var im = el('img'); im.src = img; im.alt = p.title; im.loading = 'lazy';
      thumb.insertBefore(im, thumb.firstChild);
    }
    a.appendChild(thumb);

    var meta = el('div', 'meta');
    var txt = el('div');
    txt.appendChild(el('h4', null, p.title));
    var d = p.desc && (p.desc[lang] || p.desc.pt || p.desc.en);
    if (d) txt.appendChild(el('p', 'desc', d));
    meta.appendChild(txt);
    var cat = el('span', null, t('f.' + p.cat));
    meta.appendChild(cat);
    a.appendChild(meta);
    art.appendChild(a);

    if (editing) art.appendChild(buildTools(p));
    return art;
  }

  function buildTools(p) {
    var tools = el('div', 'tools');
    tools.appendChild(tool(tt('Mover para trás', 'Move earlier'), '◀', function () { move(p.id, -1); }));
    tools.appendChild(tool(tt('Mover para a frente', 'Move later'), '▶', function () { move(p.id, 1); }));
    tools.appendChild(tool(tt('Editar', 'Edit'), '✎', function () { window.Editor && Editor.open(p.id); }));
    tools.appendChild(tool(tt('Apagar', 'Delete'), '✕', function () { remove(p.id); }));
    return tools;
  }

  function render() {
    if (!work) return;
    work.textContent = '';
    if (!list.length) { work.appendChild(el('p', 'empty', tt('Ainda sem projetos.', 'No projects yet.'))); return; }
    list.forEach(function (p) { work.appendChild(buildItem(p)); });
  }

  function indexOf(id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return i; return -1; }

  // troca com o vizinho visível na mesma categoria filtrada
  function move(id, dir) {
    var i = indexOf(id); if (i < 0) return;
    var j = i + dir;
    while (j >= 0 && j < list.length && filter !== 'all' && (list[j].placeholder || list[j].cat !== filter)) j += dir;
    if (j < 0 || j >= list.length) return;
    var tmp = list[i]; list[i] = list[j]; list[j] = tmp;
    save(); render();
  }

  function remove(id) {
    var i = indexOf(id); if (i < 0) return;
    var nm = list[i].title || tt('este espaço', 'this slot');
    if (!confirm(tt('Apagar «' + nm + '»?', 'Delete "' + nm + '"?'))) return;
    list.splice(i, 1); save(); render();
  }

  filters.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    filter = b.dataset.filter;
    filters.querySelectorAll('button').forEach(function (x) { x.classList.toggle('active', x === b); });
    work.querySelectorAll('.item').forEach(function (i) { i.classList.toggle('hide', filter !== 'all' && i.dataset.cat !== filter); });
  });

  document.addEventListener('langchange', render);

  window.Portfolio = {
    get: function () { return list; },
    find: function (id) { var i = indexOf(id); return i < 0 ? null : list[i]; },
    upsert: function (p) { var i = indexOf(p.id); if (i < 0) list.unshift(p); else list[i] = p; var ok = save(); render(); return ok; },
    replaceAll: function (a) { list = a; var ok = save(); render(); return ok; },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} list = clone(window.PROJECTS || []); render(); },
    setEditing: function (b) { editing = !!b; render(); },
    render: render
  };

  render();
})();
