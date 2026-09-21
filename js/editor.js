/* Modo de edição do portfólio — sem código.
   Ativar: abrir o site com #edit no fim do endereço (ex.: index.html#edit) ou Ctrl+Shift+E.
   As alterações ficam guardadas neste navegador; use "Exportar" para gerar o ficheiro projects.js publicável. */
(function () {
  var L = {
    pt: {
      lockT: 'Área reservada', lockPw: 'Palavra-passe', lockGo: 'Entrar', lockBad: 'Palavra-passe errada.', lockNo: 'Este navegador não suporta a verificação. Abra o site por https://.',
      mode: 'Modo de edição', add: '+ Novo projeto', exp: 'Exportar', imp: 'Importar', reset: 'Repor original', exit: 'Sair',
      hint: 'As alterações ficam guardadas neste navegador. Use «Exportar» para as publicar.',
      newT: 'Novo projeto', editT: 'Editar projeto', title: 'Título', cat: 'Categoria', dPt: 'Descrição (PT)', dEn: 'Descrição (EN)',
      url: 'Ligação (opcional)', urlPh: 'https://… ou demos/site/index.html', img: 'Imagem', upload: 'Carregar imagem', remove: 'Remover',
      imgPath: 'ou caminho/URL da imagem', imgLoaded: '(imagem carregada)', color: 'Cor de fundo (sem imagem)',
      save: 'Guardar', cancel: 'Cancelar', needTitle: 'Indique um título.',
      quota: 'Guardado apenas até ao fecho da página: o navegador ficou sem espaço. Use uma imagem mais pequena ou um caminho (img/…).',
      resetQ: 'Repor os projetos originais? As suas alterações neste navegador serão perdidas.',
      impQ: 'Substituir todos os projetos pelos do ficheiro?', impBad: 'Ficheiro inválido.',
      expDone: 'Ficheiro projects.js descarregado. Substitua js/projects.js do site por ele para publicar.'
    },
    en: {
      lockT: 'Private area', lockPw: 'Password', lockGo: 'Enter', lockBad: 'Wrong password.', lockNo: 'This browser cannot verify the password. Open the site over https://.',
      mode: 'Edit mode', add: '+ New project', exp: 'Export', imp: 'Import', reset: 'Restore original', exit: 'Exit',
      hint: 'Changes are saved in this browser. Use "Export" to publish them.',
      newT: 'New project', editT: 'Edit project', title: 'Title', cat: 'Category', dPt: 'Description (PT)', dEn: 'Description (EN)',
      url: 'Link (optional)', urlPh: 'https://… or demos/site/index.html', img: 'Image', upload: 'Upload image', remove: 'Remove',
      imgPath: 'or image path/URL', imgLoaded: '(image uploaded)', color: 'Background colour (no image)',
      save: 'Save', cancel: 'Cancel', needTitle: 'Please enter a title.',
      quota: 'Saved for this page view only: the browser ran out of space. Use a smaller image or a path (img/…).',
      resetQ: 'Restore the original projects? Your changes in this browser will be lost.',
      impQ: 'Replace all projects with those in the file?', impBad: 'Invalid file.',
      expDone: 'projects.js downloaded. Replace the site\'s js/projects.js with it to publish.'
    }
  };
  function s(k) { return (L[lang] || L.pt)[k]; }

  var on = false, bar, dlg, form, cur = null, st = {};

  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === 'text') e.textContent = attrs[k];
      else if (k === 'class') e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }
  function btn(cls, key, fn) {
    var b = h('button', { type: 'button', class: cls, 'data-k': key });
    b.addEventListener('click', fn);
    return b;
  }

  /* ---------- barra de ferramentas ---------- */
  function buildBar() {
    bar = h('div', { class: 'ed-bar', role: 'toolbar' });
    bar.appendChild(h('strong', { 'data-k': 'mode' }));
    bar.appendChild(btn('ed-btn primary', 'add', function () { openForm(null); }));
    bar.appendChild(btn('ed-btn', 'exp', exportFile));
    bar.appendChild(btn('ed-btn', 'imp', function () { picker.click(); }));
    bar.appendChild(btn('ed-btn', 'reset', function () { if (confirm(s('resetQ'))) Portfolio.reset(); }));
    bar.appendChild(btn('ed-btn', 'exit', function () { toggle(false); }));
    bar.appendChild(h('span', { class: 'ed-hint', 'data-k': 'hint' }));
    document.body.appendChild(bar);

    var picker = h('input', { type: 'file', accept: '.js,.json,application/json,text/javascript', hidden: '' });
    picker.addEventListener('change', function () { importFile(picker.files[0]); picker.value = ''; });
    bar.appendChild(picker);
  }

  /* ---------- formulário ---------- */
  function field(key, control) {
    return h('label', { class: 'ed-f' }, [h('span', { 'data-k': key }), control]);
  }

  function buildDialog() {
    dlg = h('dialog', { class: 'ed-dlg' });
    form = h('form', { method: 'dialog', novalidate: '' });
    form.appendChild(h('h3', { 'data-k': 'formTitle' }));

    form.appendChild(field('title', h('input', { name: 'title', maxlength: '80', autocomplete: 'off' })));
    var sel = h('select', { name: 'cat' });
    ['arq', '3d', 'sw', 'web'].forEach(function (c) { sel.appendChild(h('option', { value: c, 'data-cat': c })); });
    form.appendChild(field('cat', sel));
    form.appendChild(field('dPt', h('textarea', { name: 'dPt', rows: '2', maxlength: '300' })));
    form.appendChild(field('dEn', h('textarea', { name: 'dEn', rows: '2', maxlength: '300' })));
    form.appendChild(field('url', h('input', { name: 'url', maxlength: '500', autocomplete: 'off' })));

    // imagem
    var file = h('input', { type: 'file', accept: 'image/*', hidden: '' });
    var prev = h('div', { class: 'ed-prev' });
    var row = h('div', { class: 'ed-row' });
    row.appendChild(btn('ed-btn', 'upload', function () { file.click(); }));
    row.appendChild(btn('ed-btn', 'remove', function () { st.img = ''; refreshImg(); }));
    var path = h('input', { name: 'imgPath', maxlength: '500', autocomplete: 'off' });
    path.addEventListener('input', function () { st.img = path.value.trim(); refreshPreview(); });
    var imgBox = h('div', { class: 'ed-f' }, [h('span', { 'data-k': 'img' }), prev, row, file, field('imgPath', path)]);
    form.appendChild(imgBox);
    file.addEventListener('change', function () { if (file.files[0]) readImage(file.files[0]); file.value = ''; });

    // cores
    var sw = h('div', { class: 'ed-sw' });
    for (var i = 1; i <= 6; i++) (function (n) {
      var b = h('button', { type: 'button', class: 'thumb t' + n, 'aria-label': 'Cor ' + n });
      b.addEventListener('click', function () { st.grad = n; refreshPreview(); });
      sw.appendChild(b);
    })(i);
    form.appendChild(h('div', { class: 'ed-f' }, [h('span', { 'data-k': 'color' }), sw]));

    var actions = h('div', { class: 'ed-actions' });
    actions.appendChild(btn('ed-btn', 'cancel', function () { dlg.close(); }));
    var sv = h('button', { type: 'submit', class: 'ed-btn primary', 'data-k': 'save' });
    actions.appendChild(sv);
    form.appendChild(actions);
    form.appendChild(h('p', { class: 'ed-err', hidden: '' }));

    form.addEventListener('submit', function (e) { e.preventDefault(); submit(); });
    dlg.appendChild(form);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    document.body.appendChild(dlg);

    // para refreshPreview / refreshImg
    dlg._prev = prev; dlg._sw = sw; dlg._path = path;
  }

  function refreshPreview() {
    var p = dlg._prev;
    p.className = 'ed-prev thumb t' + st.grad;
    p.textContent = '';
    if (st.img) { var i = document.createElement('img'); i.src = st.img; i.alt = ''; p.appendChild(i); }
    Array.prototype.forEach.call(dlg._sw.children, function (b, i) { b.classList.toggle('sel', i + 1 === st.grad); });
  }
  function refreshImg() {
    dlg._path.value = /^data:/.test(st.img) ? '' : st.img;
    dlg._path.placeholder = /^data:/.test(st.img) ? s('imgLoaded') : 'img/projeto.jpg';
    refreshPreview();
  }

  // redimensiona para no máximo 1200px e comprime (o localStorage tem pouco espaço)
  function readImage(f) {
    var r = new FileReader();
    r.onload = function () {
      if (/svg/.test(f.type)) { st.img = r.result; refreshImg(); return; }
      var im = new Image();
      im.onload = function () {
        var k = Math.min(1, 1200 / im.width), c = document.createElement('canvas');
        c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        st.img = c.toDataURL('image/jpeg', .82); refreshImg();
      };
      im.src = r.result;
    };
    r.readAsDataURL(f);
  }

  function openForm(id) {
    cur = id ? Portfolio.find(id) : null;
    st = { grad: cur ? cur.grad || 1 : 1, img: cur ? cur.img || '' : '' };
    var f = form.elements;
    f.title.value = cur ? cur.title || '' : '';
    f.cat.value = cur ? cur.cat : 'web';
    f.dPt.value = cur && cur.desc ? cur.desc.pt || '' : '';
    f.dEn.value = cur && cur.desc ? cur.desc.en || '' : '';
    f.url.value = cur ? cur.url || '' : '';
    form.querySelector('.ed-err').hidden = true;
    labels();
    refreshImg();
    dlg.showModal();
    f.title.focus();
  }
  window.Editor = { open: openForm };

  function submit() {
    var f = form.elements, err = form.querySelector('.ed-err');
    if (!f.title.value.trim()) { err.textContent = s('needTitle'); err.hidden = false; f.title.focus(); return; }
    var p = {
      id: cur ? cur.id : 'p-' + Date.now().toString(36),
      cat: f.cat.value, title: f.title.value.trim(), grad: st.grad, img: st.img, url: f.url.value.trim(),
      desc: { pt: f.dPt.value.trim(), en: f.dEn.value.trim() }
    };
    var ok = Portfolio.upsert(p);
    dlg.close();
    if (!ok) alert(s('quota'));
  }

  /* ---------- exportar / importar ---------- */
  function exportFile() {
    var src = '/* Projetos do portfólio — gerado pelo modo de edição em ' + new Date().toISOString().slice(0, 10) + '.\n   Substitua js/projects.js por este ficheiro. */\nwindow.PROJECTS = ' +
      JSON.stringify(Portfolio.get(), null, 2) + ';\n';
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
    a.download = 'projects.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    alert(s('expDone'));
  }

  function importFile(f) {
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var txt = String(r.result).replace(/\/\*[\s\S]*?\*\//g, '').trim();
        var m = txt.match(/^window\.PROJECTS\s*=\s*([\s\S]*?);?\s*$/);
        var a = JSON.parse(m ? m[1] : txt);
        if (!Array.isArray(a) || !a.every(function (p) { return p && typeof p.title === 'string'; })) throw 0;
        a.forEach(function (p, i) {
          p.id = p.id || 'p-' + Date.now().toString(36) + i;
          p.cat = ['arq', '3d', 'sw', 'web'].indexOf(p.cat) < 0 ? 'web' : p.cat;
          p.desc = p.desc || {}; p.grad = p.grad || 1; p.img = p.img || ''; p.url = p.url || '';
        });
        if (confirm(s('impQ'))) Portfolio.replaceAll(a);
      } catch (e) { alert(s('impBad')); }
    };
    r.readAsText(f);
  }

  /* ---------- textos / ativação ---------- */
  function labels() {
    var root = [bar, dlg];
    root.forEach(function (r) {
      if (!r) return;
      r.querySelectorAll('[data-k]').forEach(function (n) {
        var k = n.dataset.k;
        n.textContent = k === 'formTitle' ? (cur ? s('editT') : s('newT')) : s(k);
      });
    });
    if (dlg) dlg.querySelectorAll('option[data-cat]').forEach(function (o) { o.textContent = dict[lang]['f.' + o.dataset.cat]; });
    if (dlg) { form.elements.url.placeholder = s('urlPh'); }
  }

  function toggle(v) {
    on = v;
    if (!v) setUnlocked(false);
    document.body.classList.toggle('editing', on);
    if (on && !bar) { buildBar(); buildDialog(); }
    if (bar) bar.hidden = !on;
    if (on) { labels(); document.getElementById('portfolio').scrollIntoView(); }
    else if (/edit/.test(location.hash + location.search)) history.replaceState(null, '', location.pathname);
    Portfolio.setEditing(on);
  }

  document.addEventListener('langchange', function () { if (on) labels(); });

  /* ---------- palavra-passe ---------- */
  // Guardamos apenas o hash (PBKDF2-SHA256); a palavra-passe em si não está no código.
  var LOCK = { salt: 'e6b1a27dfd0d9050a64dab2b725c4b81', iter: 210000, hash: '89d34f533c4d472d8f271e310c24f78026ea9a087de7330f18a36e8c8d4af92e' };
  var fails = 0;

  function hex(b) { return Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); }
  function unhex(t) { var a = new Uint8Array(t.length / 2); for (var i = 0; i < a.length; i++) a[i] = parseInt(t.substr(i * 2, 2), 16); return a; }
  function check(pw) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits'])
      .then(function (k) { return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: unhex(LOCK.salt), iterations: LOCK.iter, hash: 'SHA-256' }, k, 256); })
      .then(function (b) { return hex(b) === LOCK.hash; });
  }
  function isUnlocked() { try { return sessionStorage.getItem('arkeido.unlock') === '1'; } catch (e) { return false; } }
  function setUnlocked(v) { try { v ? sessionStorage.setItem('arkeido.unlock', '1') : sessionStorage.removeItem('arkeido.unlock'); } catch (e) {} }

  function askPassword() {
    return new Promise(function (resolve) {
      var d = h('dialog', { class: 'ed-dlg ed-lock' });
      var f = h('form', { method: 'dialog' });
      var inp = h('input', { type: 'password', autocomplete: 'current-password', 'aria-label': s('lockPw') });
      var err = h('p', { class: 'ed-err', hidden: '' });
      f.appendChild(h('h3', { text: s('lockT') }));
      f.appendChild(field('lockPw', inp));
      f.querySelector('[data-k]').textContent = s('lockPw');
      f.appendChild(err);
      var go = h('button', { type: 'submit', class: 'ed-btn primary', text: s('lockGo') });
      f.appendChild(h('div', { class: 'ed-actions' }, [go]));
      d.appendChild(f); document.body.appendChild(d);
      var done = false;
      function finish(ok) { if (done) return; done = true; if (d.open) d.close(); d.remove(); resolve(ok); }
      d.addEventListener('cancel', function () { finish(false); });
      d.addEventListener('close', function () { finish(false); });
      f.addEventListener('submit', function (e) {
        e.preventDefault(); go.disabled = true;
        var wait = Math.min(fails, 5) * 1000; // abranda tentativas repetidas
        setTimeout(function () {
          check(inp.value).then(function (ok) {
            if (ok) { fails = 0; setUnlocked(true); finish(true); return; }
            fails++; err.textContent = s('lockBad'); err.hidden = false; inp.value = ''; go.disabled = false; inp.focus();
          }).catch(function () { err.textContent = s('lockNo'); err.hidden = false; go.disabled = false; });
        }, wait);
      });
      d.showModal(); inp.focus();
    });
  }

  function clearHash() { if (/edit/.test(location.hash + location.search)) history.replaceState(null, '', location.pathname); }

  // ponto único de entrada no modo de edição
  function request() {
    if (on) { toggle(false); return; }
    if (isUnlocked()) { toggle(true); return; }
    if (!(window.crypto && crypto.subtle)) { alert(s('lockNo')); clearHash(); return; }
    askPassword().then(function (ok) { if (ok) toggle(true); else clearHash(); });
  }

  addEventListener('hashchange', function () { if (location.hash === '#edit') request(); });
  addEventListener('keydown', function (e) { if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') { e.preventDefault(); request(); } });
  if (location.hash === '#edit' || /[?&]edit/.test(location.search)) request();
})();
