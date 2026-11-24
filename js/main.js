const dict = {
  pt: {
    'nav.software':'Software','nav.pricing':'Preços','nav.services':'Serviços','nav.portfolio':'Portfólio','nav.contact':'Contacto',
    'hero.eyebrow':'Software para arquitetura · SketchUp · Blender',
    'hero.title':'Renders de <em>Cycles</em>,<br>sem sair do SketchUp.',
    'hero.lead':'O Arkeido Cyclops faz imagens fotorrealistas do seu modelo SketchUp com o motor Cycles do Blender. O Arkeido Link mantém o SketchUp e o Blender sincronizados nos dois sentidos.',
    'hero.cta1':'Experimentar 15 dias grátis','hero.cta2':'Conhecer as aplicações','hero.note':'Windows · Mac em beta',
    'sw.eyebrow':'As aplicações','sw.title':'Feitas por arquitetos, para arquitetos.',
    'cy.badge':'Render','cy.lead':'Renderize no SketchUp com a qualidade do Cycles, sem aprender o Blender.',
    'cy.f1':'Render fotorrealista com o Cycles do Blender, instalado e configurado automaticamente.',
    'cy.f2':'Perfis de dia e de noite, céus HDRI e câmaras do próprio modelo.',
    'cy.f3':'Histórico de renders e pós-produção por câmara.',
    'cy.f4':'Apresentações interativas para o cliente percorrer no browser, com um link.',
    'cy.more':'Ver preços →',
    'lk.badge':'Fluxo de trabalho','lk.lead':'O SketchUp e o Blender a trabalhar no mesmo modelo.',
    'lk.f1':'Envie o modelo do SketchUp para o Blender com um clique — grátis.',
    'lk.f2':'Sincronização nos dois sentidos, automática, com resolução de conflitos.',
    'lk.f3':'UVs e câmaras mantidas entre as duas aplicações.',
    'lk.f4':'Incluído no Cyclops Plus.','lk.more':'Ver preços →',
    'pr.eyebrow':'Preços','pr.title':'Experimente 15 dias. Pague só se gostar.',
    'pr.normal':'Normal','pr.free':'Grátis','pr.normal.d':'As funções essenciais do Cyclops, para sempre.','pr.download':'Descarregar',
    'pr.once':'pagamento único','pr.link.d':'Sincronização SketchUp ⇄ Blender, UVs e câmaras. Enviar para o Blender é grátis.','pr.buy':'Comprar',
    'pr.month':'/ mês','pr.year':'Anual','pr.perp':'Perpétua','pr.pro.d':'Todas as funções do Cyclops.','pr.trial':'Experimentar grátis',
    'pr.best':'Mais completo','pr.plus.d':'Cyclops Pro + Arkeido Link.',
    'pr.n1':'Licenças perpétuas incluem 1 ano de atualizações; depois, plano de atualizações opcional (Pro 99 €/ano, Plus 109 €/ano).',
    'pr.n2':'Estudantes e professores: Cyclops Pro grátis para uso não comercial.',
    'pr.n3':'Reembolso em 14 dias, sem perguntas. <a href="legal/reembolsos.html">Política de reembolso</a>',
    'pr.n4':'Preços em euros. O IVA é calculado na compra conforme o país. Pagamentos processados pela Polar.',
    'services.eyebrow':'Também fazemos','services.title':'Serviços de estúdio',
    's0.t':'Aplicações Arkeido (suporte, licenças)',
    's1.t':'Arquitetura','s1.d':'Projeto de habitação, comércio e reabilitação — do estudo prévio ao projeto de execução.',
    's2.t':'Modelação 3D & Renderização','s2.d':'Imagens fotorrealistas, vídeos e walkthroughs que mostram o projeto antes de existir.',
    's3.t':'Desenvolvimento de Software','s3.d':'Aplicações web, desktop e mobile à medida, das ferramentas internas a produtos completos.',
    's4.t':'Web Design','s4.d':'Websites rápidos, elegantes e otimizados, com identidade visual alinhada à sua marca.',
    's5.t':'Publicidade & Colocação de Produtos','s5.d':'Vídeos publicitários e integração de marcas e produtos em conteúdos, do conceito à produção final.',
    'port.eyebrow':'Trabalho selecionado','port.title':'Portfólio','port.soon':'Novo projeto em breve','port.visit':'Visitar projeto',
    'f.all':'Todos','f.arq':'Arquitetura','f.3d':'3D','f.sw':'Software','f.web':'Web','f.ads':'Publicidade & Colocação de Produtos',
    'contact.eyebrow':'Vamos conversar','contact.title':'Dúvidas, suporte ou um projeto?','contact.lead':'Escreva-nos sobre as aplicações, licenças ou um projeto de estúdio. Respondemos em 1–2 dias úteis.',
    'form.name':'Nome','form.email':'Email','form.service':'Assunto','form.msg':'Mensagem','form.send':'Enviar mensagem',
    'form.err':'Preencha todos os campos corretamente.','form.sending':'A enviar…','form.ok':'Mensagem enviada. Obrigado!','form.fail':'Não foi possível enviar. Escreva-nos para geral@arkeido.com.',
    'ft.terms':'Termos','ft.privacy':'Privacidade','ft.refunds':'Reembolsos','ft.third':'Licenças de terceiros'
  },
  en: {
    'nav.software':'Software','nav.pricing':'Pricing','nav.services':'Services','nav.portfolio':'Portfolio','nav.contact':'Contact',
    'hero.eyebrow':'Software for architects · SketchUp · Blender',
    'hero.title':'<em>Cycles</em> renders,<br>without leaving SketchUp.',
    'hero.lead':'Arkeido Cyclops renders your SketchUp model photorealistically with the Blender Cycles engine. Arkeido Link keeps SketchUp and Blender in sync both ways.',
    'hero.cta1':'Try free for 15 days','hero.cta2':'Explore the apps','hero.note':'Windows · Mac in beta',
    'sw.eyebrow':'The apps','sw.title':'Made by architects, for architects.',
    'cy.badge':'Rendering','cy.lead':'Render in SketchUp with Cycles quality, without learning Blender.',
    'cy.f1':'Photorealistic rendering with Blender Cycles, installed and set up automatically.',
    'cy.f2':'Day and night profiles, HDRI skies and the cameras of your model.',
    'cy.f3':'Render history and per-camera post-processing.',
    'cy.f4':'Interactive presentations your client walks through in the browser, from a link.',
    'cy.more':'See pricing →',
    'lk.badge':'Workflow','lk.lead':'SketchUp and Blender working on the same model.',
    'lk.f1':'Send your SketchUp model to Blender in one click — free.',
    'lk.f2':'Automatic two-way sync, with conflict resolution.',
    'lk.f3':'UVs and cameras kept between both apps.',
    'lk.f4':'Included in Cyclops Plus.','lk.more':'See pricing →',
    'pr.eyebrow':'Pricing','pr.title':'Try it for 15 days. Pay only if you like it.',
    'pr.normal':'Normal','pr.free':'Free','pr.normal.d':'The essential Cyclops features, forever.','pr.download':'Download',
    'pr.once':'one-time','pr.link.d':'SketchUp ⇄ Blender sync, UVs and cameras. Sending to Blender is free.','pr.buy':'Buy',
    'pr.month':'/ month','pr.year':'Annual','pr.perp':'Perpetual','pr.pro.d':'Every Cyclops feature.','pr.trial':'Try free',
    'pr.best':'Most complete','pr.plus.d':'Cyclops Pro + Arkeido Link.',
    'pr.n1':'Perpetual licences include 1 year of updates; after that, an optional updates plan (Pro €99/year, Plus €109/year).',
    'pr.n2':'Students and teachers: Cyclops Pro free for non-commercial use.',
    'pr.n3':'14-day refund, no questions asked. <a href="legal/refunds.html">Refund policy</a>',
    'pr.n4':'Prices in euros. VAT is calculated at checkout for your country. Payments processed by Polar.',
    'services.eyebrow':'We also do','services.title':'Studio services',
    's0.t':'Arkeido apps (support, licences)',
    's1.t':'Architecture','s1.d':'Residential, commercial and refurbishment design — from feasibility to construction documents.',
    's2.t':'3D Modeling & Rendering','s2.d':'Photorealistic images, videos and walkthroughs that show the project before it exists.',
    's3.t':'Software Development','s3.d':'Custom web, desktop and mobile applications, from internal tools to full products.',
    's4.t':'Web Design','s4.d':'Fast, elegant, optimized websites with a visual identity aligned to your brand.',
    's5.t':'Advertising & Product Placement','s5.d':'Advertising videos and brand/product integration in content, from concept to final production.',
    'port.eyebrow':'Selected work','port.title':'Portfolio','port.soon':'New project coming soon','port.visit':'Visit project',
    'f.all':'All','f.arq':'Architecture','f.3d':'3D','f.sw':'Software','f.web':'Web','f.ads':'Advertising & Product Placement',
    'contact.eyebrow':"Let's talk",'contact.title':'Questions, support or a project?','contact.lead':'Write to us about the apps, licences or a studio project. We reply within 1–2 business days.',
    'form.name':'Name','form.email':'Email','form.service':'Subject','form.msg':'Message','form.send':'Send message',
    'form.err':'Please fill in all fields correctly.','form.sending':'Sending…','form.ok':'Message sent. Thank you!','form.fail':'Could not send. Please email us at geral@arkeido.com.',
    'ft.terms':'Terms','ft.privacy':'Privacy','ft.refunds':'Refunds','ft.third':'Third-party licences'
  },
  es: {
    'nav.software':'Software','nav.pricing':'Precios','nav.services':'Servicios','nav.portfolio':'Portafolio','nav.contact':'Contacto',
    'hero.eyebrow':'Software para arquitectura · SketchUp · Blender',
    'hero.title':'Renders de <em>Cycles</em>,<br>sin salir de SketchUp.',
    'hero.lead':'Arkeido Cyclops crea imágenes fotorrealistas de su modelo de SketchUp con el motor Cycles de Blender. Arkeido Link mantiene SketchUp y Blender sincronizados en ambos sentidos.',
    'hero.cta1':'Probar 15 días gratis','hero.cta2':'Conocer las aplicaciones','hero.note':'Windows · Mac en beta',
    'sw.eyebrow':'Las aplicaciones','sw.title':'Hechas por arquitectos, para arquitectos.',
    'cy.badge':'Render','cy.lead':'Renderice en SketchUp con la calidad de Cycles, sin aprender Blender.',
    'cy.f1':'Render fotorrealista con Cycles de Blender, instalado y configurado automáticamente.',
    'cy.f2':'Perfiles de día y de noche, cielos HDRI y las cámaras del propio modelo.',
    'cy.f3':'Historial de renders y postproducción por cámara.',
    'cy.f4':'Presentaciones interactivas que su cliente recorre en el navegador, con un enlace.',
    'cy.more':'Ver precios →',
    'lk.badge':'Flujo de trabajo','lk.lead':'SketchUp y Blender trabajando en el mismo modelo.',
    'lk.f1':'Envíe el modelo de SketchUp a Blender con un clic — gratis.',
    'lk.f2':'Sincronización automática en ambos sentidos, con resolución de conflictos.',
    'lk.f3':'UVs y cámaras conservadas entre las dos aplicaciones.',
    'lk.f4':'Incluido en Cyclops Plus.','lk.more':'Ver precios →',
    'pr.eyebrow':'Precios','pr.title':'Pruébelo 15 días. Pague solo si le gusta.',
    'pr.normal':'Normal','pr.free':'Gratis','pr.normal.d':'Las funciones esenciales de Cyclops, para siempre.','pr.download':'Descargar',
    'pr.once':'pago único','pr.link.d':'Sincronización SketchUp ⇄ Blender, UVs y cámaras. Enviar a Blender es gratis.','pr.buy':'Comprar',
    'pr.month':'/ mes','pr.year':'Anual','pr.perp':'Perpetua','pr.pro.d':'Todas las funciones de Cyclops.','pr.trial':'Probar gratis',
    'pr.best':'Más completo','pr.plus.d':'Cyclops Pro + Arkeido Link.',
    'pr.n1':'Las licencias perpetuas incluyen 1 año de actualizaciones; después, plan de actualizaciones opcional (Pro 99 €/año, Plus 109 €/año).',
    'pr.n2':'Estudiantes y profesores: Cyclops Pro gratis para uso no comercial.',
    'pr.n3':'Reembolso en 14 días, sin preguntas. <a href="legal/devoluciones.html">Política de reembolso</a>',
    'pr.n4':'Precios en euros. El IVA se calcula en la compra según el país. Pagos procesados por Polar.',
    'services.eyebrow':'También hacemos','services.title':'Servicios de estudio',
    's0.t':'Aplicaciones Arkeido (soporte, licencias)',
    's1.t':'Arquitectura','s1.d':'Proyectos de vivienda, comercio y rehabilitación — desde el estudio previo hasta el proyecto de ejecución.',
    's2.t':'Modelado 3D y Renderizado','s2.d':'Imágenes fotorrealistas, vídeos y recorridos virtuales que muestran el proyecto antes de que exista.',
    's3.t':'Desarrollo de Software','s3.d':'Aplicaciones web, de escritorio y móviles a medida, desde herramientas internas hasta productos completos.',
    's4.t':'Diseño Web','s4.d':'Sitios web rápidos, elegantes y optimizados, con identidad visual alineada a su marca.',
    's5.t':'Publicidad y Colocación de Productos','s5.d':'Vídeos publicitarios e integración de marcas y productos en contenidos, desde el concepto hasta la producción final.',
    'port.eyebrow':'Trabajo seleccionado','port.title':'Portafolio','port.soon':'Nuevo proyecto próximamente','port.visit':'Visitar proyecto',
    'f.all':'Todos','f.arq':'Arquitectura','f.3d':'3D','f.sw':'Software','f.web':'Web','f.ads':'Publicidad y Colocación de Productos',
    'contact.eyebrow':'Hablemos','contact.title':'¿Dudas, soporte o un proyecto?','contact.lead':'Escríbanos sobre las aplicaciones, licencias o un proyecto de estudio. Respondemos en 1–2 días hábiles.',
    'form.name':'Nombre','form.email':'Email','form.service':'Asunto','form.msg':'Mensaje','form.send':'Enviar mensaje',
    'form.err':'Complete todos los campos correctamente.','form.sending':'Enviando…','form.ok':'Mensaje enviado. ¡Gracias!','form.fail':'No se pudo enviar. Escríbanos a geral@arkeido.com.',
    'ft.terms':'Términos','ft.privacy':'Privacidad','ft.refunds':'Reembolsos','ft.third':'Licencias de terceros'
  }
};

// Países de língua portuguesa/espanhola para deteção automática por IP (via Cloudflare); resto do mundo cai em inglês
const PT_COUNTRIES = ['PT', 'BR'];
const ES_COUNTRIES = ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ'];

function countryToLang(cc) {
  if (!cc) return 'en';
  cc = cc.toUpperCase();
  if (PT_COUNTRIES.includes(cc)) return 'pt';
  if (ES_COUNTRIES.includes(cc)) return 'es';
  return 'en';
}

// O domínio corre atrás da Cloudflare, que expõe o país do visitante neste endpoint sem precisar de backend próprio
function detectLangByCountry() {
  return fetch('/cdn-cgi/trace', { cache: 'no-store' })
    .then(r => r.text())
    .then(t => countryToLang((t.match(/loc=([A-Z]{2})/) || [])[1]));
}

let lang = 'pt';
let storedLang = null;
try { storedLang = localStorage.getItem('lang'); } catch (e) {}

function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => { const v = dict[l][el.dataset.i18n]; if (v) el.textContent = v; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = dict[l][el.dataset.i18nHtml]; if (v) el.innerHTML = v; });
  // legal pages in PT/ES/EN: PT keeps the href, ES uses data-href-es, EN data-href-en
  document.querySelectorAll('[data-href-en]').forEach(el => {
    if (!el.dataset.hrefPt) el.dataset.hrefPt = el.getAttribute('href');
    el.setAttribute('href', l === 'pt' ? el.dataset.hrefPt : (l === 'es' && el.dataset.hrefEs) || el.dataset.hrefEn);
  });
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  try { localStorage.setItem('lang', l); } catch (e) {}
  document.dispatchEvent(new Event('langchange'));
}
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

if (storedLang) {
  setLang(storedLang);
} else {
  const timeout = new Promise(resolve => setTimeout(() => resolve('en'), 1500));
  Promise.race([detectLangByCountry(), timeout]).then(setLang).catch(() => setLang('en'));
}

// nav
const nav = document.getElementById('nav'), links = document.getElementById('links');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });
document.getElementById('burger').addEventListener('click', () => links.classList.toggle('open'));
links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('open'); });

// reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// contact form (sent in the background via FormSubmit)
const note = document.getElementById('note');
document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, d = Object.fromEntries(new FormData(f)), btn = f.querySelector('button');
  note.hidden = false;
  if (d._honey) return;
  if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || !d.message.trim()) { note.textContent = dict[lang]['form.err']; return; }
  note.textContent = dict[lang]['form.sending'];
  btn.disabled = true;
  try {
    const r = await fetch('https://formsubmit.co/ajax/geral@arkeido.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: d.name, email: d.email, service: d.service, message: d.message,
        _subject: `Arkeido — ${d.service} — ${d.name}`, _replyto: d.email, _template: 'table', _captcha: 'false' })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || r.status);
    note.textContent = dict[lang]['form.ok'];
    f.reset();
  } catch (err) {
    console.error(err);
    note.textContent = dict[lang]['form.fail'];
  } finally { btn.disabled = false; }
});

document.getElementById('year').textContent = new Date().getFullYear();
