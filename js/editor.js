/* Modo de edição do portfólio — sem código.
   Ativar: abrir o site com #edit no fim do endereço (ex.: index.html#edit) ou Ctrl+Shift+E.
   As alterações ficam guardadas neste navegador; use "Exportar" para gerar o ficheiro projects.js publicável. */
(function () {
  var L = {
    pt: {
      lockT: 'Área reservada', lockPw: 'Palavra-passe', lockGo: 'Entrar', lockBad: 'Palavra-passe errada.', lockNo: 'Este navegador não suporta a verificação. Abra o site por https://.',
      more: 'Mais imagens (galeria)', addMore: 'Adicionar imagens', capPt: 'Legenda (PT)', capEn: 'Legenda (EN)',
      vids: 'Vídeos (um link por linha)', vidsPh: 'Link do YouTube, Vimeo ou ficheiro .mp4', vidsBad: 'Link de vídeo não reconhecido. Use YouTube, Vimeo ou um endereço terminado em .mp4/.webm:',
      mode: 'Modo de edição', add: '+ Novo projeto', pub: 'Publicar', reset: 'Descartar alterações', exit: 'Sair',
      hint: 'As alterações só aparecem no site depois de clicar em «Publicar».',
      pubBusy: 'A publicar…', pubOk: 'Publicado! O site mostra as alterações dentro de alguns minutos.',
      pubAuth: 'O GitHub recusou a chave. Clique em Publicar e cole uma chave nova.', pubErr: 'Não foi possível publicar. Verifique a ligação e tente outra vez.',
      tokT: 'Ligar ao GitHub (só uma vez)', tokGo: 'Guardar chave',
      tokHelp: 'Para publicar, o editor precisa de uma chave do GitHub. Crie-a assim:',
      tok1: '1. Abra o link abaixo e escolha um nome (ex.: Arkeido).', tok2: '2. Em «Repository access» escolha «Only select repositories» → ArkeidoSite.', tok3: '3. Em «Permissions → Repository» ponha «Contents» em «Read and write».', tok4: '4. Clique em «Generate token», copie a chave e cole-a aqui. Fica guardada só neste navegador.',
      newT: 'Novo projeto', editT: 'Editar projeto', title: 'Título', cat: 'Categoria', dPt: 'Descrição (PT)', dEn: 'Descrição (EN)',
      url: 'Ligação (opcional)', urlPh: 'https://… ou demos/site/index.html', img: 'Imagem', upload: 'Carregar imagem', remove: 'Remover',
      imgPath: 'ou caminho/URL da imagem', imgLoaded: '(imagem carregada)', color: 'Cor de fundo (sem imagem)',
      save: 'Guardar', cancel: 'Cancelar', needTitle: 'Indique um título.',
      quota: 'Guardado apenas até ao fecho da página: o navegador ficou sem espaço. Use uma imagem mais pequena ou um caminho (img/…).',
      resetQ: 'Descartar as alterações por publicar e voltar ao que está no site?',
      impQ: 'Substituir todos os projetos pelos do ficheiro?', impBad: 'Ficheiro inválido.',
      expDone: 'Ficheiro projects.js descarregado. Substitua js/projects.js do site por ele para publicar.'
    },
    en: {
      lockT: 'Private area', lockPw: 'Password', lockGo: 'Enter', lockBad: 'Wrong password.', lockNo: 'This browser cannot verify the password. Open the site over https://.',
      more: 'More images (gallery)', addMore: 'Add images', capPt: 'Caption (PT)', capEn: 'Caption (EN)',
      vids: 'Videos (one link per line)', vidsPh: 'YouTube, Vimeo or .mp4 file link', vidsBad: 'Video link not recognised. Use YouTube, Vimeo or an address ending in .mp4/.webm:',
      mode: 'Edit mode', add: '+ New project', pub: 'Publish', reset: 'Discard changes', exit: 'Exit',
      hint: 'Changes only show on the site after you click "Publish".',
      pubBusy: 'Publishing…', pubOk: 'Published! The site shows the changes within a few minutes.',
      pubAuth: 'GitHub rejected the key. Click Publish and paste a new one.', pubErr: 'Could not publish. Check your connection and try again.',
      tokT: 'Connect to GitHub (one time only)', tokGo: 'Save key',
      tokHelp: 'To publish, the editor needs a GitHub key. Create it like this:',
      tok1: '1. Open the link below and choose a name (e.g. Arkeido).', tok2: '2. Under "Repository access" pick "Only select repositories" → ArkeidoSite.', tok3: '3. Under "Permissions → Repository" set "Contents" to "Read and write".', tok4: '4. Click "Generate token", copy the key and paste it here. It is stored only in this browser.',
      newT: 'New project', editT: 'Edit project', title: 'Title', cat: 'Category', dPt: 'Description (PT)', dEn: 'Description (EN)',
      url: 'Link (optional)', urlPh: 'https://… or demos/site/index.html', img: 'Image', upload: 'Upload image', remove: 'Remove',
      imgPath: 'or image path/URL', imgLoaded: '(image uploaded)', color: 'Background colour (no image)',
      save: 'Save', cancel: 'Cancel', needTitle: 'Please enter a title.',
      quota: 'Saved for this page view only: the browser ran out of space. Use a smaller image or a path (img/…).',
      resetQ: 'Discard unpublished changes and go back to what is on the site?',
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
    bar.appendChild(btn('ed-btn', 'add', function () { openForm(null); }));
    bar.appendChild(btn('ed-btn primary', 'pub', function () { publish(this); }));
    bar.appendChild(btn('ed-btn', 'reset', function () { if (confirm(s('resetQ'))) Portfolio.reset(); }));
    bar.appendChild(btn('ed-btn', 'exit', function () { toggle(false); }));
    bar.appendChild(h('span', { class: 'ed-hint', 'data-k': 'hint' }));
    document.body.appendChild(bar);

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
    ['arq', '3d', 'sw', 'web', 'ads'].forEach(function (c) { sel.appendChild(h('option', { value: c, 'data-cat': c })); });
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
    var coverCap = capInputs(function () { return st.imgCap; });
    dlg._coverCap = coverCap;
    var imgBox = h('div', { class: 'ed-f' }, [h('span', { 'data-k': 'img' }), prev, row, file, field('imgPath', path), coverCap]);
    form.appendChild(imgBox);
    file.addEventListener('change', function () { if (file.files[0]) readImage(file.files[0]); file.value = ''; });

    // galeria: várias imagens
    var gal = h('div', { class: 'ed-gal' });
    var gfile = h('input', { type: 'file', accept: 'image/*', multiple: '', hidden: '' });
    gfile.addEventListener('change', function () {
      var fs = Array.prototype.slice.call(gfile.files); gfile.value = '';
      Promise.all(fs.map(compress)).then(function (ds) { ds.forEach(function (d) { if (d) st.imgs.push({ src: d, cap: {} }); }); refreshGallery(); });
    });
    form.appendChild(h('div', { class: 'ed-f' }, [h('span', { 'data-k': 'more' }), gal, h('div', { class: 'ed-row' }, [btn('ed-btn', 'addMore', function () { gfile.click(); })]), gfile]));
    dlg._gal = gal;
    form.appendChild(field('vids', h('textarea', { name: 'vids', rows: '3', maxlength: '1000', autocomplete: 'off' })));

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

  // redimensiona para no máximo 1400px e comprime (o navegador guarda pouco espaço)
  function compress(f) {
    return new Promise(function (resolve) {
      var r = new FileReader();
      r.onload = function () {
        if (/svg/.test(f.type)) { resolve(r.result); return; }
        var im = new Image();
        im.onload = function () {
          var k = Math.min(1, 1400 / im.width), c = document.createElement('canvas');
          c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
          c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
          resolve(c.toDataURL('image/jpeg', .8));
        };
        im.onerror = function () { resolve(''); };
        im.src = r.result;
      };
      r.onerror = function () { resolve(''); };
      r.readAsDataURL(f);
    });
  }
  function readImage(f) { compress(f).then(function (d) { if (d) { st.img = d; refreshImg(); } }); }

  // dois campos discretos (PT/EN) ligados a um objeto {pt, en}
  function capInputs(getObj) {
    var box = h('div', { class: 'ed-caps' });
    ['pt', 'en'].forEach(function (l) {
      var i = h('input', { maxlength: '140', autocomplete: 'off', 'data-cap': l });
      i.addEventListener('input', function () { getObj()[l] = i.value; });
      box.appendChild(i);
    });
    return box;
  }
  function fillCaps(box, obj) {
    Array.prototype.forEach.call(box.children, function (i) { i.value = obj[i.dataset.cap] || ''; i.placeholder = s(i.dataset.cap === 'pt' ? 'capPt' : 'capEn'); });
  }

  function refreshGallery() {
    var g = dlg._gal; g.textContent = '';
    st.imgs.forEach(function (it, i) {
      var w = h('div', { class: 'ed-gi' });
      var im = h('img', { alt: '' }); im.src = it.src;
      var x = h('button', { type: 'button', 'aria-label': 'Remover', text: '✕' });
      x.addEventListener('click', function () { st.imgs.splice(i, 1); refreshGallery(); });
      var caps = capInputs(function () { return it.cap; }); fillCaps(caps, it.cap);
      w.appendChild(im); w.appendChild(caps); w.appendChild(x); g.appendChild(w);
    });
  }

  function openForm(id) {
    cur = id ? Portfolio.find(id) : null;
    st = {
      grad: cur ? cur.grad || 1 : 1, img: cur ? cur.img || '' : '',
      imgCap: cur && cur.imgCap ? JSON.parse(JSON.stringify(cur.imgCap)) : {},
      imgs: cur && cur.imgs ? cur.imgs.map(function (x) { return typeof x === 'string' ? { src: x, cap: {} } : { src: x.src, cap: Object.assign({}, x.cap) }; }) : []
    };
    var f = form.elements;
    f.title.value = cur ? cur.title || '' : '';
    f.cat.value = cur ? cur.cat : 'web';
    f.dPt.value = cur && cur.desc ? cur.desc.pt || '' : '';
    f.dEn.value = cur && cur.desc ? cur.desc.en || '' : '';
    f.url.value = cur ? cur.url || '' : '';
    f.vids.value = cur && cur.videos ? cur.videos.join('\n') : '';
    form.querySelector('.ed-err').hidden = true;
    labels();
    refreshImg();
    fillCaps(dlg._coverCap, st.imgCap);
    refreshGallery();
    dlg.showModal();
    f.title.focus();
  }
  window.Editor = { open: openForm };

  function capOrUndef(c) { c = { pt: (c.pt || '').trim(), en: (c.en || '').trim() }; return c.pt || c.en ? c : undefined; }

  function submit() {
    var f = form.elements, err = form.querySelector('.ed-err');
    if (!f.title.value.trim()) { err.textContent = s('needTitle'); err.hidden = false; f.title.focus(); return; }
    var vids = f.vids.value.split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean);
    var bad = vids.filter(function (x) { return !Portfolio.videoInfo(x); });
    if (bad.length) { err.textContent = s('vidsBad') + ' ' + bad[0]; err.hidden = false; f.vids.focus(); return; }
    var p = {
      id: cur ? cur.id : 'p-' + Date.now().toString(36),
      cat: f.cat.value, title: f.title.value.trim(), grad: st.grad, img: st.img, imgCap: capOrUndef(st.imgCap), imgs: st.imgs.map(function (it) { return capOrUndef(it.cap) ? { src: it.src, cap: capOrUndef(it.cap) } : it.src; }), videos: vids, url: f.url.value.trim(),
      desc: { pt: f.dPt.value.trim(), en: f.dEn.value.trim() }
    };
    var ok = Portfolio.upsert(p);
    dlg.close();
    if (!ok) alert(s('quota'));
  }

  /* ---------- publicar (grava no GitHub; o site atualiza sozinho) ---------- */
  var REPO = 'creotocrata/ArkeidoSite', BRANCH = 'main', API = 'https://api.github.com/repos/' + REPO + '/contents/';

  function getToken() { try { return localStorage.getItem('arkeido.gh') || ''; } catch (e) { return ''; } }
  function setToken(v) { try { v ? localStorage.setItem('arkeido.gh', v) : localStorage.removeItem('arkeido.gh'); } catch (e) {} }

  function gh(method, path, body, token) {
    return fetch(API + path + (method === 'GET' ? '?ref=' + BRANCH : ''), {
      method: method,
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, status: r.status, json: j }; }); });
  }
  function b64utf8(t) { return btoa(unescape(encodeURIComponent(t))); }

  function askToken() {
    return new Promise(function (resolve) {
      var d = h('dialog', { class: 'ed-dlg' });
      var f = h('form', { method: 'dialog' });
      f.appendChild(h('h3', { text: s('tokT') }));
      f.appendChild(h('p', { class: 'ed-help', text: s('tokHelp') }));
      ['tok1', 'tok2', 'tok3'].forEach(function (k) { f.appendChild(h('p', { class: 'ed-help', text: s(k) })); });
      f.appendChild(h('a', { href: 'https://github.com/settings/personal-access-tokens/new', target: '_blank', rel: 'noopener', class: 'ed-link', text: 'github.com/settings/personal-access-tokens/new' }));
      f.appendChild(h('p', { class: 'ed-help', text: s('tok4') }));
      var inp = h('input', { type: 'password', autocomplete: 'off', 'aria-label': 'token' });
      f.appendChild(inp);
      var cancel = h('button', { type: 'button', class: 'ed-btn', text: s('cancel') });
      cancel.addEventListener('click', function () { finish(''); });
      var go = h('button', { type: 'submit', class: 'ed-btn primary', text: s('tokGo') });
      f.appendChild(h('div', { class: 'ed-actions' }, [cancel, go]));
      d.appendChild(f); document.body.appendChild(d);
      var done = false;
      function finish(v) { if (done) return; done = true; if (d.open) d.close(); d.remove(); resolve(v); }
      d.addEventListener('close', function () { finish(''); });
      f.addEventListener('submit', function (e) { e.preventDefault(); finish(inp.value.trim()); });
      d.showModal(); inp.focus();
    });
  }

  var uid = 0;
  // se a imagem veio do computador (data URL), grava-a em img/ e devolve o caminho; senão devolve-a igual
  async function uploadData(src, p, token) {
    var m = /^data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,(.+)$/.exec(src || '');
    if (!m) return src;
    var name = 'img/' + p.id + '-' + Date.now().toString(36) + (uid++) + '.' + m[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');
    var up = await gh('PUT', name, { message: 'Imagem: ' + (p.title || p.id), content: m[2], branch: BRANCH }, token);
    if (!up.ok) throw up;
    return name;
  }

  async function publish(button) {
    var token = getToken();
    if (!token) { token = await askToken(); if (!token) return; setToken(token); }
    var label = button.textContent;
    button.disabled = true; button.textContent = s('pubBusy');
    try {
      var list = JSON.parse(JSON.stringify(Portfolio.get()));
      // imagens carregadas do computador passam a ficheiros em img/
      for (var i = 0; i < list.length; i++) {
        var p = list[i];
        p.img = await uploadData(p.img, p, token);
        for (var j = 0; p.imgs && j < p.imgs.length; j++) {
          if (typeof p.imgs[j] === 'string') p.imgs[j] = await uploadData(p.imgs[j], p, token);
          else p.imgs[j].src = await uploadData(p.imgs[j].src, p, token);
        }
      }
      var cur = await gh('GET', 'js/projects.js', null, token);
      if (!cur.ok) throw cur;
      var src = '/* Projetos do portfólio — gerado pelo modo de edição. Não editar à mão. */\nwindow.PROJECTS = ' + JSON.stringify(list, null, 2) + ';\n';
      var put = await gh('PUT', 'js/projects.js', { message: 'Atualizar portfólio', content: b64utf8(src), sha: cur.json.sha, branch: BRANCH }, token);
      if (!put.ok) throw put;
      Portfolio.replaceAll(list);
      alert(s('pubOk'));
    } catch (e) {
      if (e && (e.status === 401 || e.status === 403 || e.status === 404)) { setToken(''); alert(s('pubAuth')); }
      else alert(s('pubErr'));
    } finally { button.disabled = false; button.textContent = label; }
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
    if (dlg) { form.elements.url.placeholder = s('urlPh'); form.elements.vids.placeholder = s('vidsPh'); fillCaps(dlg._coverCap, st.imgCap || {}); }
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
