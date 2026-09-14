document.getElementById('year').textContent = new Date().getFullYear();

/* ---- Nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---- Scroll reveal ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---- FAQ accordion ---- */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item){ other.classList.remove('open'); other.querySelector('.faq-a').style.maxHeight = null; }
    });
    if (isOpen){ item.classList.remove('open'); a.style.maxHeight = null; }
    else { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
  });
});

/* ---- Lead form ---- */
document.getElementById('leadFormEl').addEventListener('submit', (e) => {
  e.preventDefault();
  const entry = {
    name: document.getElementById('lName').value.trim(),
    business: document.getElementById('lBusiness').value.trim(),
    phone: document.getElementById('lPhone').value.trim(),
    businessType: document.getElementById('lType').value,
    need: document.getElementById('lNeed').value,
    message: document.getElementById('lMsg').value.trim(),
    date: new Date().toISOString()
  };
  try{
    const pending = JSON.parse(localStorage.getItem('vexlyn_pending_leads') || '[]');
    pending.push(entry);
    localStorage.setItem('vexlyn_pending_leads', JSON.stringify(pending));
  }catch(err){ /* storage unavailable */ }
  document.getElementById('leadSuccessNote').style.display = 'block';
  e.target.reset();
});

/* ---- Chatbot ---- */
const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatQuick = document.getElementById('chatQuick');

chatToggle.addEventListener('click', () => chatPanel.classList.toggle('open'));

function addMsg(text, cls){
  const d = document.createElement('div');
  d.className = 'msg ' + cls;
  d.textContent = text;
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
}

const CONTACT_LINE = "You can WhatsApp or call +91 99470 27811, or use the 'Start a Project' form on this page.";

function botReply(raw){
  const q = raw.toLowerCase();
  const has = (...words) => words.some(w => q.includes(w));

  if (has('price','cost','how much','fee','charge','quote','budget')){
    return "Pricing depends on the scope of your project — the type of site and which services are involved. Share a few details through the project form and we'll get back to you with a clear quote. " + CONTACT_LINE;
  }
  if (has('how long','timeline','turnaround','when will','how much time')){
    return "Timelines depend on the scope and complexity of the project. A clear timeline is agreed during the Discover and Plan stages, before development starts.";
  }
  if (has('dental','dentist','clinic')){
    return "Yes — dental and eye clinics are core focus areas for us, alongside other healthcare and local businesses.";
  }
  if (has('outside calicut','remote','other city','anywhere','location','based')){
    return "We're based in Calicut, Kerala, and work with businesses locally as well as remotely, wherever they're based.";
  }
  if (has('redesign','existing website','revamp')){
    return "Yes, website redesigns are one of our core services — we can rework an existing site's design, structure and content.";
  }
  if (has('seo','search','google rank')){
    return "Every site is built with SEO foundations in mind — clean structure, fast loading and search-friendly content. We can't promise a #1 ranking, but the groundwork is solid.";
  }
  if (has('support','maintenance','update','bug','after launch')){
    return "Yes, ongoing support and maintenance is available after launch — updates, content changes, bug fixes and backups.";
  }
  if (has('social media','instagram post','stories','campaign design')){
    return "Yes, social media design is one of our services — posts, stories, promotional creatives and profile branding.";
  }
  if (has('reel','reels','video edit','short-form')){
    return "Yes, video editing includes Instagram Reels and other short-form promotional content.";
  }
  if (has('brand','logo','identity')){
    return "Brand design is one of our services — logo design, colour palette, typography and a full identity kit.";
  }
  if (has('photo','photography')){
    return "Yes, we offer photography support for products, clinics/interiors, corporate and event needs.";
  }
  if (has('service','offer','what do you do','what can you build')){
    return "Our services: web design & development, social media design, poster & creative design, video editing, brand design, photography, content & copy support, and ongoing support & maintenance.";
  }
  if (has('process','how do you work','steps')){
    return "The Vexlyn process has 6 stages: Discover, Plan, Design, Develop, Review, and Launch — a structured path from first conversation to going live.";
  }
  if (has('start','project','get started','begin','hire')){
    return "You can start a project by filling in the form in the Contact section, or " + CONTACT_LINE.toLowerCase().replace(/^you can/, 'you can also');
  }
  if (has('whatsapp')){
    return "Yes — you can WhatsApp us directly at +91 99470 27811.";
  }
  if (has('phone','call','contact','number')){
    return CONTACT_LINE;
  }
  if (has('hi','hello','hey')){
    return "Hello! Happy to help with questions about our services, process, or starting a project.";
  }
  if (has('thank')){
    return "You're welcome! Let me know if there's anything else you'd like to know.";
  }
  return "I can help with questions about our services, process, industries we work with, or starting a project. " + CONTACT_LINE;
}

function handleUserMessage(text){
  if(!text.trim()) return;
  addMsg(text, 'user');
  setTimeout(() => addMsg(botReply(text), 'bot'), 420);
}
chatForm.addEventListener('submit', (e) => { e.preventDefault(); const val = chatInput.value; chatInput.value = ''; handleUserMessage(val); });
chatQuick.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => handleUserMessage(btn.dataset.q)));
