// ════════ LOADING SCREEN ════════
document.body.classList.add('is-loading');
const loader = document.getElementById('loader');
const loaderBarFill = document.getElementById('loaderBarFill');
const loaderPct = document.getElementById('loaderPct');

(function runLoader(){
  let progress = 0;
  let assetsReady = false;
  const minDuration = 1200; // ms, so it doesn't flash even on fast connections
  const startTime = Date.now();

  // simulate/track progress smoothly toward 90% while real load happens
  const tick = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const target = assetsReady ? 100 : Math.min(90, (elapsed / minDuration) * 90);
    progress += (target - progress) * 0.25;
    if(progress > target - 0.5) progress = target;
    const display = Math.round(progress);
    loaderBarFill.style.width = display + '%';
    loaderPct.textContent = display + '%';

    if(assetsReady && progress >= 99.5){
      clearInterval(tick);
      loaderBarFill.style.width = '100%';
      loaderPct.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('is-loading');
        revealHeroLines();
        startHeroRoleTyping();
        setTimeout(() => loader.remove(), 700);
      }, 250);
    }
  }, 40);

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const wait = Math.max(0, minDuration - elapsed);
    setTimeout(() => { assetsReady = true; }, wait);
  });
  // failsafe: never hang forever
  setTimeout(() => { assetsReady = true; }, 4000);
})();

// ════════ ROLE TYPING EFFECT (hero headline) ════════
const heroRoles = [
  'student',
  'Android developer',
  'web developer',
  'MERN developer',
  'SEO specialist',
  'problem solver',
];
function startHeroRoleTyping(){
  const el = document.getElementById('roleType');
  if(!el || el.dataset.started) return;
  el.dataset.started = '1';
  let ri = 0, ci = heroRoles[0].length, deleting = true;

  function step(){
    const word = heroRoles[ri];
    if(!deleting){
      ci++;
      if(ci > word.length){
        ci = word.length;
        el.textContent = word;
        deleting = true;
        setTimeout(step, 2000);
        return;
      }
      el.textContent = word.slice(0, ci);
      setTimeout(step, 75);
    } else {
      ci--;
      if(ci < 0){
        deleting = false;
        ri = (ri + 1) % heroRoles.length;
        ci = 0;
        el.textContent = '';
        setTimeout(step, 350);
        return;
      }
      el.textContent = word.slice(0, ci);
      setTimeout(step, 40);
    }
  }
  setTimeout(step, 1400);
}


const FALLBACK_ICONS = {
  moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  menu:'<path d="M4 12h16M4 6h16M4 18h16"/>',
  'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  'map-pin':'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  'graduation-cap':'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/>',
  'code-2':'<path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>',
  zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  smartphone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  coffee:'<path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
  database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-1-2-1-3.5A2.5 2.5 0 0 1 11.5 6c0 1.5 1 3 3 4.5 1.6 1.2 2.5 2.5 2.5 4a5 5 0 0 1-10 0c0-.8.2-1.5.5-2Z"/>',
  cloud:'<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6.5 6.5 0 0 0-12.6 2A5 5 0 0 0 6 19h11.5Z"/>',
  'layout-grid':'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  'file-code':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m9 13-2 2 2 2M13 13l2 2-2 2"/>',
  palette:'<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2a10 10 0 1 0 10 10c0-1-.5-2-2-2h-3a2 2 0 0 1-2-2v-.5A3.5 3.5 0 0 1 18.5 4c-1.8-1.3-4-2-6.5-2Z"/>',
  braces:'<path d="M8 3a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2M16 3a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 11 13.5 12 12"/>',
  server:'<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
  atom:'<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2-2 1-7-2-10-3-3-8-4-10-2s-1 7 2 10c3 3 8 4 10 2Z"/><path d="M14.5 9.5C18 6 19 4 18 3c-1-1-3 0-6.5 3.5C8 10 7 12 8 13s3 0 6.5-3.5Z"/>',
  hexagon:'<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>',
  terminal:'<path d="m4 17 6-6-6-6M12 19h8"/>',
  'terminal-square':'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m7 8 3 3-3 3M12 14h5"/>',
  code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  box:'<path d="M21 8V6a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 6v12a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7v-2"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  'git-branch':'<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  binary:'<rect x="14" y="14" width="4" height="6" rx="1"/><rect x="6" y="4" width="4" height="6" rx="1"/><path d="M6 20h4M14 10h4M6 14h2v6M14 4h2v6"/>',
  'folder-open':'<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
  'database-zap':'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3 1 0 1.95-.06 2.84-.16M3 12c0 1.7 4 3 9 3 1.04 0 2.04-.05 3-.16"/><path d="M21 5v8M15 14l-1 4h4l-1 4"/>',
  'layout-panel-left':'<rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  'git-commit-horizontal':'<circle cx="12" cy="12" r="3"/><path d="M3 12h6M15 12h6"/>',
  github:'<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  figma:'<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5Z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0Z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0Z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5Z"/>',
  'key-round':'<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/>',
  'pen-tool':'<path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  'link-2':'<path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/>',
  instagram:'<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><path d="M17.5 6.5h.01"/>',
  car:'<path d="M19 17h2v-3.34a4 4 0 0 0-1.17-2.83L17 8l-2-5H7L5 8 2.17 10.83A4 4 0 0 0 1 13.66V17h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/>',
  wallet:'<path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/><path d="M18 12a2 2 0 0 0 0 4h3v-4Z"/>',
  'clipboard-check':'<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  hospital:'<path d="M19 9h-5V4a2 2 0 0 0-2-2h-0a2 2 0 0 0-2 2v5H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z"/><path d="M12 7v5M9.5 9.5h5"/><path d="M9 22v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20Z"/><path d="M2 12h20"/>',
  'user-circle':'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.66A8 8 0 0 1 12 18a8 8 0 0 1 5 1.66"/>',
  'book-open':'<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2Z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7Z"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z"/>',
  linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  'arrow-up':'<path d="m5 12 7-7 7 7M12 19V5"/>',
};

function paintFallbackIcons(){
  document.querySelectorAll('i[data-lucide]').forEach(el => {
    if(el.querySelector('svg')) return; // already rendered by lucide
    const name = el.getAttribute('data-lucide');
    const path = FALLBACK_ICONS[name];
    if(!path) return;
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  });
}

let lucideAttempts = 0;
function initIcons(){
  if(window.lucide && typeof lucide.createIcons === 'function'){
    lucide.createIcons();
  }
  // Always paint fallbacks for anything lucide didn't catch (CDN blocked, timing, etc.)
  paintFallbackIcons();
}

function pollForLucide(){
  lucideAttempts++;
  initIcons();
  if(lucideAttempts < 8){
    setTimeout(pollForLucide, 350);
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', pollForLucide);
} else {
  pollForLucide();
}
window.addEventListener('load', initIcons);

// ════════ THEME TOGGLE ════════
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const knobIcon = themeToggle.querySelector('.knob');

function setTheme(theme){
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  knobIcon.innerHTML = theme === 'dark'
    ? '<i data-lucide="moon"></i>'
    : '<i data-lucide="sun"></i>';
  initIcons();
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ════════ MOBILE MENU ════════
const mobToggle = document.getElementById('mobToggle');
const mobMenu = document.getElementById('mobMenu');
mobToggle.addEventListener('click', () => {
  mobMenu.classList.toggle('open');
});
mobMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobMenu.classList.remove('open'));
});

// ════════ NAV SCROLL STATE ════════
const mainNav = document.getElementById('mainNav');
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 30);
  toTopBtn.classList.toggle('show', window.scrollY > 600);
}, { passive:true });
toTopBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// ════════ HERO TEXT REVEAL (split lines, starts after loader hides) ════════
function revealHeroLines(){
  document.querySelectorAll('.hero-h .line span').forEach((span, i) => {
    span.style.transition = `opacity .8s cubic-bezier(.16,1,.3,1) ${i*0.12}s, transform .8s cubic-bezier(.16,1,.3,1) ${i*0.12}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    });
  });
}
document.querySelectorAll('.hero-h .line span').forEach(span => {
  span.style.opacity = '0';
  span.style.transform = 'translateY(100%)';
});

// ════════ SCROLL REVEAL ════════
const revealEls = document.querySelectorAll('.reveal, .reveal-l');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('v');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// experience timeline dots
const expItems = document.querySelectorAll('.exp-item');
const expObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('v');
  });
}, { threshold: 0.3 });
expItems.forEach(el => expObserver.observe(el));

// ════════ SKILL TABS ════════
const skillTabs = document.querySelectorAll('.skill-tab');
skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    initIcons();
  });
});

// ════════ PROGRESS RAIL + NAV ACTIVE STATE ════════
const sections = ['home','about','skills','experience','projects','education','contact']
  .map(id => document.getElementById(id)).filter(Boolean);
const railFill = document.getElementById('railFill');
const railDots = document.querySelectorAll('.rail-dot');
const navLinks = document.querySelectorAll('.nav-link, .mob-menu a');

function updateRailAndNav(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
  railFill.style.height = progress + '%';

  let current = sections[0].id;
  const triggerY = window.innerHeight * 0.4;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top <= triggerY) current = sec.id;
  });

  railDots.forEach(dot => dot.classList.toggle('active', dot.dataset.section === current));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.link === current));
}
window.addEventListener('scroll', updateRailAndNav, { passive:true });
window.addEventListener('resize', updateRailAndNav);
updateRailAndNav();

// ════════ CONTACT FORM ════════
function handleSend(){
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const msg = document.getElementById('fmsg').value.trim();
  if(!name || !email || !msg){ alert('Please fill in all required fields.'); return; }
  const mailto = `mailto:bhattihuzaifa3@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + msg)}`;
  window.location.href = mailto;
  const status = document.getElementById('form-status');
  status.style.display = 'block';
}