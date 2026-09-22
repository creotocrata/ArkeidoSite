const dict = {
  pt: {
    'nav.services':'Serviços','nav.portfolio':'Portfólio','nav.process':'Processo','nav.about':'Sobre','nav.contact':'Contacto',
    'hero.eyebrow':'Arquitetura · 3D · Software · Web',
    'hero.title':'Damos forma a <em>ideias</em>,<br>do espaço ao ecrã.',
    'hero.lead':'Somos um estúdio que une arquitetura, visualização 3D e desenvolvimento digital para criar projetos coerentes, do primeiro traço ao produto final.',
    'hero.cta1':'Ver projetos','hero.cta2':'Pedir orçamento',
    'services.eyebrow':'O que fazemos','services.title':'Serviços',
    's1.t':'Arquitetura','s1.d':'Projeto de habitação, comércio e reabilitação — do estudo prévio ao projeto de execução.',
    's2.t':'Modelação 3D & Renderização','s2.d':'Imagens fotorrealistas, vídeos e walkthroughs que mostram o projeto antes de existir.',
    's3.t':'Desenvolvimento de Software','s3.d':'Aplicações web, desktop e mobile à medida, das ferramentas internas a produtos completos.',
    's4.t':'Web Design','s4.d':'Websites rápidos, elegantes e otimizados, com identidade visual alinhada à sua marca.',
    'port.eyebrow':'Trabalho selecionado','port.title':'Portfólio','port.soon':'Novo projeto em breve','port.visit':'Visitar projeto',
    'f.all':'Todos','f.arq':'Arquitetura','f.3d':'3D','f.sw':'Software','f.web':'Web','f.ads':'Publicidade & Colocação de Produtos',
    'proc.eyebrow':'Como trabalhamos','proc.title':'Processo',
    'p1.t':'Conversa','p1.d':'Percebemos objetivos, prazos e orçamento.',
    'p2.t':'Conceito','p2.d':'Esboços, referências e proposta de direção.',
    'p3.t':'Desenvolvimento','p3.d':'Projeto, modelação ou código, com revisões regulares.',
    'p4.t':'Entrega','p4.d':'Ficheiros finais, documentação e acompanhamento.',
    'about.eyebrow':'Sobre nós','about.title':'Um estúdio, várias disciplinas.',
    'about.p1':'A Arkeido nasceu da convicção de que o design de espaços e o design digital partilham a mesma lógica: clareza, função e detalhe.',
    'about.p2':'Trabalhar arquitetura, 3D, software e web sob o mesmo teto permite entregar projetos consistentes, com menos ruído entre equipas e mais qualidade no resultado.',
    'stat1':'áreas de atuação','stat2':'à medida','stat3':'interlocutor',
    'contact.eyebrow':'Vamos conversar','contact.title':'Tem um projeto em mente?','contact.lead':'Conte-nos a sua ideia. Respondemos em 1–2 dias úteis.',
    'form.name':'Nome','form.email':'Email','form.service':'Serviço','form.msg':'Mensagem','form.send':'Enviar mensagem',
    'form.err':'Preencha todos os campos corretamente.','form.ok':'A abrir o seu cliente de email…',
    'footer.tag':'Arquitetura · 3D · Software · Web'
  },
  en: {
    'nav.services':'Services','nav.portfolio':'Portfolio','nav.process':'Process','nav.about':'About','nav.contact':'Contact',
    'hero.eyebrow':'Architecture · 3D · Software · Web',
    'hero.title':'We shape <em>ideas</em>,<br>from space to screen.',
    'hero.lead':'We are a studio that combines architecture, 3D visualization and digital development to deliver coherent projects, from the first sketch to the final product.',
    'hero.cta1':'View projects','hero.cta2':'Request a quote',
    'services.eyebrow':'What we do','services.title':'Services',
    's1.t':'Architecture','s1.d':'Residential, commercial and refurbishment design — from feasibility to construction documents.',
    's2.t':'3D Modeling & Rendering','s2.d':'Photorealistic images, videos and walkthroughs that show the project before it exists.',
    's3.t':'Software Development','s3.d':'Custom web, desktop and mobile applications, from internal tools to full products.',
    's4.t':'Web Design','s4.d':'Fast, elegant, optimized websites with a visual identity aligned to your brand.',
    'port.eyebrow':'Selected work','port.title':'Portfolio','port.soon':'New project coming soon','port.visit':'Visit project',
    'f.all':'All','f.arq':'Architecture','f.3d':'3D','f.sw':'Software','f.web':'Web','f.ads':'Advertising & Product Placement',
    'proc.eyebrow':'How we work','proc.title':'Process',
    'p1.t':'Talk','p1.d':'We understand goals, timelines and budget.',
    'p2.t':'Concept','p2.d':'Sketches, references and a proposed direction.',
    'p3.t':'Development','p3.d':'Design, modeling or code, with regular reviews.',
    'p4.t':'Delivery','p4.d':'Final files, documentation and follow-up.',
    'about.eyebrow':'About us','about.title':'One studio, many disciplines.',
    'about.p1':'Arkeido was born from the belief that designing spaces and designing digital products share the same logic: clarity, function and detail.',
    'about.p2':'Working on architecture, 3D, software and web under one roof lets us deliver consistent projects, with less friction between teams and better results.',
    'stat1':'areas of expertise','stat2':'tailor-made','stat3':'point of contact',
    'contact.eyebrow':"Let's talk",'contact.title':'Have a project in mind?','contact.lead':'Tell us your idea. We reply within 1–2 business days.',
    'form.name':'Name','form.email':'Email','form.service':'Service','form.msg':'Message','form.send':'Send message',
    'form.err':'Please fill in all fields correctly.','form.ok':'Opening your email client…',
    'footer.tag':'Architecture · 3D · Software · Web'
  }
};

let lang = 'pt';
try { lang = localStorage.getItem('lang') || 'pt'; } catch (e) {}

function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => { const v = dict[l][el.dataset.i18n]; if (v) el.textContent = v; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = dict[l][el.dataset.i18nHtml]; if (v) el.innerHTML = v; });
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  try { localStorage.setItem('lang', l); } catch (e) {}
  document.dispatchEvent(new Event('langchange'));
}
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
setLang(lang);

// nav
const nav = document.getElementById('nav'), links = document.getElementById('links');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });
document.getElementById('burger').addEventListener('click', () => links.classList.toggle('open'));
links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('open'); });

// reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// contact form (mailto until a backend/form service is connected)
const note = document.getElementById('note');
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, d = Object.fromEntries(new FormData(f));
  note.hidden = false;
  if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || !d.message.trim()) { note.textContent = dict[lang]['form.err']; return; }
  note.textContent = dict[lang]['form.ok'];
  const body = `${d.message}\n\n— ${d.name} (${d.email})`;
  location.href = `mailto:geral@arkeido.com?subject=${encodeURIComponent(d.service)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
