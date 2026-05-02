/* =====================================================
   M. HUZAIFA BHATTI — script.js
   ===================================================== */

'use strict';

/* ══════════════════════════════════
   THEME
══════════════════════════════════ */
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

(function initTheme() {
  const saved = localStorage.getItem('hb-theme') || 'light';
  html.setAttribute('data-theme', saved);
})();

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('hb-theme', next);
  buildParticles(); // refresh canvas colours
});

/* ══════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════ */
const cursorEl = document.getElementById('cursor');
const trailEl  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorEl.style.left = mx + 'px';
  cursorEl.style.top  = my + 'px';
});

(function trailLoop() {
  tx += (mx - tx) * 0.13;
  ty += (my - ty) * 0.13;
  trailEl.style.left = tx + 'px';
  trailEl.style.top  = ty + 'px';
  requestAnimationFrame(trailLoop);
})();

document.querySelectorAll('a, button, .mag-card, .stat-chip, .pill, .cert-card, .orbit-bubble').forEach(el => {
  el.addEventListener('mouseenter', () => cursorEl.classList.add('big'));
  el.addEventListener('mouseleave', () => cursorEl.classList.remove('big'));
});

/* ══════════════════════════════════
   NAVBAR SHADOW ON SCROLL
══════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ══════════════════════════════════
   TYPEWRITER
══════════════════════════════════ */
const twEl = document.getElementById('typewriter');
const words = [
  'a BSCS Student',
  'a Co-Founder & CTO',
  'a CS Teacher',
  'an Android Developer',
  'a Web Developer',
  'a Problem Solver',
  'a Builder',
];
let wi = 0, ci = 0, del = false;

function typeStep() {
  const w = words[wi];
  if (!del) {
    ci++;
    twEl.textContent = w.slice(0, ci);
    if (ci === w.length) { del = true; setTimeout(typeStep, 1800); return; }
  } else {
    ci--;
    twEl.textContent = w.slice(0, ci);
    if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(typeStep, del ? 48 : 78);
}
typeStep();

/* ══════════════════════════════════
   HERO NAME — LETTER SPLIT
══════════════════════════════════ */
const letterKF = document.createElement('style');
letterKF.textContent = '@keyframes ltIn { to { opacity:1; transform:translateY(0) rotate(0deg); } }';
document.head.appendChild(letterKF);

function splitText(id, delay) {
  const el = document.getElementById(id);
  if (!el) return;
  const txt = el.textContent;
  el.textContent = '';
  [...txt].forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00a0' : ch;
    const rot = (Math.random() - 0.5) * 22;
    s.style.cssText = `
      display:inline-block;
      opacity:0;
      transform:translateY(65px) rotate(${rot}deg);
      animation:ltIn 0.55s ${delay + i * 0.045}s cubic-bezier(.34,1.56,.64,1) forwards;
    `;
    el.appendChild(s);
  });
}
splitText('nameLine1', 0.1);
splitText('nameLine2', 0.42);

/* ══════════════════════════════════
   CANVAS BACKGROUND
══════════════════════════════════ */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); buildParticles(); }, { passive: true });

function themeColor() {
  return html.getAttribute('data-theme') === 'dark'
    ? { ink:'#ede8df', accent:'#ff6b6b', blue:'#64b5f6', yellow:'#ffe082' }
    : { ink:'#111010', accent:'#e63946', blue:'#2196f3', yellow:'#f4d03f' };
}

class Dot {
  constructor(initY) {
    const c = themeColor();
    const pool = [c.ink, c.accent, c.blue, c.yellow];
    this.x   = Math.random() * W;
    this.y   = initY ? Math.random() * H : -16;
    this.vx  = (Math.random() - 0.5) * 0.38;
    this.vy  = Math.random() * 0.28 + 0.1;
    this.sz  = Math.random() * 3 + 1;
    this.a   = Math.random() * 0.45 + 0.1;
    this.rot = Math.random() * Math.PI * 2;
    this.rv  = (Math.random() - 0.5) * 0.022;
    this.type= Math.floor(Math.random() * 5);
    this.col = pool[Math.floor(Math.random() * pool.length)];
  }
  update() {
    this.x   += this.vx;
    this.y   += this.vy;
    this.rot += this.rv;
    if (this.y > H + 18) {
      const c = themeColor();
      const pool = [c.ink, c.accent, c.blue, c.yellow];
      this.col = pool[Math.floor(Math.random() * pool.length)];
      this.x = Math.random() * W;
      this.y = -16;
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.a;
    ctx.strokeStyle = this.col;
    ctx.fillStyle   = this.col;
    ctx.lineWidth   = 1.5;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    const s = this.sz;
    switch (this.type) {
      case 0: ctx.beginPath(); ctx.arc(0,0,s,0,Math.PI*2); ctx.fill(); break;
      case 1:
        ctx.beginPath();
        ctx.moveTo(-s*2,0); ctx.lineTo(s*2,0);
        ctx.moveTo(0,-s*2); ctx.lineTo(0,s*2);
        ctx.stroke(); break;
      case 2:
        for (let i=0;i<4;i++){
          ctx.save(); ctx.rotate(i*Math.PI/4);
          ctx.beginPath(); ctx.moveTo(0,-s*3); ctx.lineTo(0,s*3);
          ctx.stroke(); ctx.restore();
        } break;
      case 3: ctx.beginPath(); ctx.arc(0,0,s*2,0,Math.PI*2); ctx.stroke(); break;
      case 4: ctx.beginPath(); ctx.moveTo(-s*2,0); ctx.lineTo(s*2,0); ctx.stroke(); break;
    }
    ctx.restore();
  }
}

function buildParticles() {
  particles = Array.from({ length: 75 }, () => new Dot(true));
}
buildParticles();

let waveOff = 0;
function drawWaves() {
  const c = themeColor();
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.strokeStyle = c.ink;
  ctx.lineWidth   = 1;
  for (let y = 0; y < H; y += 58) {
    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const wy = Math.sin((x + waveOff) * 0.011) * 11;
      x === 0 ? ctx.moveTo(x, y + wy) : ctx.lineTo(x, y + wy);
    }
    ctx.stroke();
  }
  ctx.restore();
}

(function canvasLoop() {
  ctx.clearRect(0, 0, W, H);
  waveOff += 0.5;
  drawWaves();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(canvasLoop);
})();

/* ══════════════════════════════════
   INTERSECTION OBSERVER
══════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add('show');

    // skill bars
    el.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });

    // stat counters
    el.querySelectorAll('.stat-num').forEach(n => {
      const to = +n.dataset.to, step = to / 38;
      let cur = 0;
      const tick = () => {
        cur = Math.min(cur + step, to);
        n.textContent = Math.round(cur);
        if (cur < to) requestAnimationFrame(tick);
      };
      tick();
    });

    // section underlines
    el.querySelectorAll('.ud').forEach(u => setTimeout(() => u.classList.add('drawn'), 180));

    // avatar badge
    const av = el.querySelector('.avatar-wrap');
    if (av) setTimeout(() => av.classList.add('show'), 300);

    observer.unobserve(el);
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.js-reveal, .bar-item.js-bar, .about-p, .section, #about, .leader-card, .edu-item, .cert-card'
).forEach(el => observer.observe(el));

/* observe bar items individually */
document.querySelectorAll('.bar-item').forEach(el => observer.observe(el));

/* ══════════════════════════════════
   MAGNETIC EFFECT
══════════════════════════════════ */
document.querySelectorAll('.mag-card').forEach(el => {
  const strength = parseFloat(el.dataset.mag || 0.18);
  el.addEventListener('mousemove', e => {
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * strength;
    const dy = (e.clientY - (r.top  + r.height / 2)) * strength;
    el.style.transform = `translate(${dx}px,${dy}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform 0.55s cubic-bezier(.34,1.56,.64,1)';
    setTimeout(() => { el.style.transition = ''; }, 600);
  });
});

/* ══════════════════════════════════
   ORBIT BUBBLES
══════════════════════════════════ */
const orbitWrap = document.getElementById('orbitWrap');
const skillData = [
  { name:'C/C++',       color:'#e63946' },
  { name:'Java',        color:'#f4d03f' },
  { name:'HTML',        color:'#e67e22' },
  { name:'CSS',         color:'#2196f3' },
  { name:'JavaScript',  color:'#f4d03f' },
  { name:'Android',     color:'#27ae60' },
  { name:'Firebase',    color:'#e63946' },
  { name:'SQL',         color:'#9b59b6' },
  { name:'Figma',       color:'#e91e8c' },
  { name:'SQLite',      color:'#8e44ad' },
  { name:'IT Support',  color:'#2196f3' },
  { name:'Leadership',  color:'#27ae60' },
];

if (orbitWrap) {
  const rings   = [{ r:105, n:6, spd:0.006, dir:1 }, { r:165, n:6, spd:0.004, dir:-1 }];
  let idx = 0;
  rings.forEach(ring => {
    for (let i = 0; i < ring.n; i++) {
      const sk  = skillData[idx % skillData.length]; idx++;
      const bub = document.createElement('div');
      bub.className   = 'orbit-bubble';
      bub.textContent = sk.name;
      bub.style.color       = sk.color;
      bub.style.borderColor = sk.color;
      orbitWrap.appendChild(bub);

      let angle = (i / ring.n) * Math.PI * 2;
      const CX = 200, CY = 200;
      (function step() {
        angle += ring.spd * ring.dir;
        const x = CX + ring.r * Math.cos(angle) - bub.offsetWidth  / 2;
        const y = CY + ring.r * Math.sin(angle) - bub.offsetHeight / 2;
        bub.style.left = x + 'px';
        bub.style.top  = y + 'px';
        requestAnimationFrame(step);
      })();
    }
  });
}

/* ══════════════════════════════════
   STAGGER PROJECT CARDS
══════════════════════════════════ */
document.querySelectorAll('.proj-card').forEach((c, i) => {
  c.style.transitionDelay = (i * 0.08) + 's';
  observer.observe(c);
});

/* ══════════════════════════════════
   3-D TILT on project cards
══════════════════════════════════ */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(640px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(.34,1.56,.64,1)';
    setTimeout(() => { card.style.transition = ''; }, 550);
  });
});

/* ══════════════════════════════════
   BUTTON RIPPLE
══════════════════════════════════ */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r    = this.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const el   = document.createElement('span');
    el.className = 'ripple-el';
    el.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - r.left - size/2}px;
      top:${e.clientY - r.top  - size/2}px;
    `;
    this.appendChild(el);
    setTimeout(() => el.remove(), 600);
  });
});

/* ══════════════════════════════════
   ACTIVE NAV ON SCROLL
══════════════════════════════════ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => a.classList.remove('active'));
    const lnk = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
    if (lnk) lnk.classList.add('active');
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObs.observe(s));

/* ══════════════════════════════════
   RANDOM DOODLE STAMPS
══════════════════════════════════ */
const stampGlyphs = ['✦','◌','△','✧','⬡','⊕','◇','⟡','✕','◎'];

document.querySelectorAll('.section').forEach(sec => {
  [1,2].forEach(() => {
    const d = document.createElement('div');
    d.textContent = stampGlyphs[Math.floor(Math.random() * stampGlyphs.length)];
    const side = Math.random() > .5 ? 'left' : 'right';
    d.style.cssText = `
      position:absolute; pointer-events:none; z-index:0;
      ${side}:${-10 + Math.random()*28}px;
      top:${15 + Math.random()*65}%;
      font-size:${1.4 + Math.random()*1.6}rem;
      color:var(--ink); opacity:.065;
      transform:rotate(${(Math.random()-.5)*44}deg);
      animation:floatAnim ${6+Math.random()*5}s ease-in-out infinite;
      animation-delay:${-Math.random()*7}s;
    `;
    sec.style.position = 'relative';
    sec.appendChild(d);
  });
});

/* ══════════════════════════════════
   BLOB PARALLAX
══════════════════════════════════ */
const b1 = document.querySelector('.blob-1');
const b2 = document.querySelector('.blob-2');
const b3 = document.querySelector('.blob-3');

document.addEventListener('mousemove', e => {
  const cx = (e.clientX / innerWidth  - .5) * 2;
  const cy = (e.clientY / innerHeight - .5) * 2;
  if (b1) b1.style.transform = `translate(${cx*22}px,${cy*22}px)`;
  if (b2) b2.style.transform = `translate(${cx*-16}px,${cy*-16}px)`;
  if (b3) b3.style.transform = `translate(calc(-50% + ${cx*11}px),calc(-50% + ${cy*11}px))`;
}, { passive: true });

/* ══════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ══════════════════════════════════
   KONAMI CODE EASTER EGG
══════════════════════════════════ */
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;

document.addEventListener('keydown', e => {
  ki = e.key === konami[ki] ? ki + 1 : 0;
  if (ki === konami.length) { ki = 0; fireConfetti(); }
});

function fireConfetti() {
  const colors = ['#e63946','#2196f3','#27ae60','#f4d03f','#9b59b6','#e91e8c'];
  const kfStyle = document.createElement('style');
  kfStyle.textContent = '@keyframes cFall { to { transform: translateY(105vh) rotate(720deg); opacity:0; } }';
  document.head.appendChild(kfStyle);

  for (let i = 0; i < 110; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999;
      width:${7+Math.random()*9}px; height:${7+Math.random()*9}px;
      background:${colors[i % colors.length]};
      left:${Math.random()*100}vw; top:-12px;
      border-radius:${Math.random()>.5?'50%':'3px'};
      animation:cFall ${1.4+Math.random()*2.2}s ${Math.random()*.8}s ease-in forwards;
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }

  const toast = document.createElement('div');
  toast.textContent = '🎉 Easter Egg unlocked! Huzaifa is awesome! 🎉';
  const toastKF = document.createElement('style');
  toastKF.textContent = '@keyframes toastIn { from{transform:translateX(-50%) scale(0) rotate(-8deg)} to{transform:translateX(-50%) scale(1) rotate(0deg)} }';
  document.head.appendChild(toastKF);
  toast.style.cssText = `
    position:fixed; bottom:36px; left:50%;
    transform:translateX(-50%);
    background:var(--ink); color:var(--bg);
    font-family:'Permanent Marker',cursive; font-size:1.05rem;
    padding:16px 32px;
    border:3px solid var(--accent); border-radius:4px 16px 5px 14px;
    box-shadow:6px 6px 0 var(--accent);
    z-index:9999; white-space:nowrap;
    animation:toastIn .45s cubic-bezier(.34,1.56,.64,1) both;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

/* ══════════════════════════════════
   HAMBURGER MENU (MOBILE)
══════════════════════════════════ */
const hamBtn   = document.getElementById('hamBtn');
const mobileNav = document.getElementById('mobileNav');

if (hamBtn && mobileNav) {
  hamBtn.addEventListener('click', () => {
    hamBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamBtn.contains(e.target) && !mobileNav.contains(e.target)) {
      hamBtn.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });
}
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .5s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});