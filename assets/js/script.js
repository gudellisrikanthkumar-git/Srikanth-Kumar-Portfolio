const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const setTheme = (theme) => {
  root.dataset.theme = theme;
  themeToggle?.setAttribute('aria-pressed', String(theme === 'dark'));
  try { localStorage.setItem('theme', theme); } catch (e) {}
};
if (!root.dataset.theme) root.dataset.theme = 'light';
themeToggle?.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// Scroll progress + active nav link
const progress = document.querySelector('.scroll-progress');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
};
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();

const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute('href'));
  if (section) navObserver.observe(section);
});

// Animated counters: keeps any prefix/suffix like "+", "%", " hrs"
const animateCount = (el) => {
  const match = el.textContent.trim().match(/^(\d+)(.*)$/);
  if (!match) return;
  const target = Number(match[1]);
  const suffix = match[2];
  if (reduceMotion) return;
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// Terminal lines appear one by one
const playTerminal = (terminal) => {
  terminal.querySelectorAll('.t-line').forEach((line, i) => {
    line.style.animationDelay = reduceMotion ? '0ms' : `${i * 380}ms`;
  });
  terminal.classList.add('is-playing');
};

// Scroll reveal
const revealTargets = document.querySelectorAll(
  '.section-label, .about-grid h2, .about-copy, .work-intro, .project, .skills-grid h2, .skill-group, .experience-section h2, .timeline-item, .education-grid > div, .contact-inner > *, .impact-stat, .impact-label'
);
revealTargets.forEach((el) => {
  el.classList.add('reveal-on-scroll');
  const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal-on-scroll')) : [];
  el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 4) * 90}ms`);
});

const onVisible = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.classList.contains('reveal-on-scroll')) el.classList.add('is-visible');
    if (el.matches('.impact-stat strong, .project-stats strong')) animateCount(el);
    if (el.classList.contains('terminal')) playTerminal(el);
    onVisible.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-on-scroll, .impact-stat strong, .project-stats strong, .terminal').forEach((el) => onVisible.observe(el));

// Typing effect in hero
const typed = document.querySelector('.typed');
if (typed && !reduceMotion) {
  const words = typed.dataset.words.split('|');
  let wordIndex = 0;
  let charIndex = words[0].length;
  let deleting = true;
  const step = () => {
    const word = words[wordIndex];
    if (deleting) {
      charIndex -= 1;
      if (charIndex <= 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
    } else {
      charIndex += 1;
    }
    typed.textContent = words[wordIndex].slice(0, Math.max(charIndex, 0));
    let delay = deleting ? 35 : 70;
    if (!deleting && charIndex === words[wordIndex].length) { deleting = true; delay = 1900; }
    setTimeout(step, delay);
  };
  setTimeout(step, 2200);
}

// Photo tilt (desktop only)
const visual = document.querySelector('.hero-visual');
if (visual && finePointer && !reduceMotion) {
  visual.addEventListener('animationend', () => { visual.style.animation = 'none'; }, { once: true });
  visual.addEventListener('mousemove', (e) => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    visual.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    visual.style.setProperty('--shine-x', `${(x + 0.5) * 100}%`);
    visual.style.setProperty('--shine-y', `${(y + 0.5) * 100}%`);
  });
  visual.addEventListener('mouseleave', () => { visual.style.transform = ''; });
}

// Cursor follower (desktop only)
const ring = document.querySelector('.cursor-ring');
if (ring && finePointer && !reduceMotion) {
  root.classList.add('has-cursor');
  let mx = -100, my = -100, rx = -100, ry = -100;
  addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!ring.classList.contains('is-active')) { rx = mx; ry = my; }
    ring.classList.add('is-active');
  }, { passive: true });
  document.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });
  let last = performance.now();
  const follow = (now) => {
    // Frame-rate independent easing: ~55% of the gap per 60fps frame
    const t = 1 - Math.pow(0.45, (now - last) / 16.67);
    last = now;
    rx += (mx - rx) * t;
    ry += (my - ry) * t;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(follow);
  };
  requestAnimationFrame(follow);
}
// Password-locked resume: decrypts assets/resume/resume.enc in the browser.
// Format and key derivation must match scripts/encrypt_resume.mjs.
const resumeDialog = document.querySelector('.resume-dialog');
if (resumeDialog) {
  const form = resumeDialog.querySelector('.resume-form');
  const input = resumeDialog.querySelector('#resume-password');
  const error = resumeDialog.querySelector('.resume-error');
  const submit = resumeDialog.querySelector('.resume-submit');
  let encrypted = null;
  let resumeUrl = null;

  const downloadResume = (url) => {
    Object.assign(document.createElement('a'), { href: url, download: 'Gudelli_Srikanth_Kumar_Resume.pdf' }).click();
  };
  const openResume = (url, win = window.open(url, '_blank')) => {
    if (!win) downloadResume(url);
  };

  document.querySelectorAll('[data-resume]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeUrl) { openResume(resumeUrl); return; }
      error.textContent = '';
      input.value = '';
      resumeDialog.showModal();
      input.focus();
    });
  });

  resumeDialog.querySelector('.resume-close').addEventListener('click', () => resumeDialog.close());
  resumeDialog.addEventListener('click', (e) => { if (e.target === resumeDialog) resumeDialog.close(); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!input.value) { error.textContent = 'Please enter the password.'; return; }
    submit.disabled = true;
    error.textContent = 'Unlocking…';
    // Open the tab during the click so pop-up blockers allow it; fill it once decrypted.
    const tab = window.open('', '_blank');
    try {
      if (!encrypted) {
        const res = await fetch('assets/resume/resume.enc', { cache: 'no-cache' });
        if (!res.ok) throw new Error('missing');
        encrypted = new Uint8Array(await res.arrayBuffer());
      }
      const salt = encrypted.slice(0, 16);
      const iv = encrypted.slice(16, 28);
      const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(input.value), 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 600000, hash: 'SHA-256' },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      const pdf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted.slice(28));
      resumeUrl = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
      resumeDialog.close();
      if (tab) tab.location.href = resumeUrl; else downloadResume(resumeUrl);
    } catch (err) {
      tab?.close();
      error.textContent = err.message === 'missing'
        ? 'Resume is unavailable right now. Please request it by email.'
        : 'Incorrect password. Please try again.';
      input.select();
    } finally {
      submit.disabled = false;
    }
  });
}