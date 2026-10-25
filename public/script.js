(() => {
  const EMAIL = 'polakondrej14@gmail.com';
  document.documentElement.classList.add('js');

  // Rok v patičce
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Přilepená hlavička – stín po scrollu
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobilní menu
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 1021px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  // Animace při scrollu
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Akordeon
  document.querySelectorAll('.faq__item button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });

  // Tlačítka v ceníku předvyplní výběr ve formuláři
  const select = document.getElementById('f-co');
  document.querySelectorAll('[data-plan]').forEach((a) => {
    a.addEventListener('click', () => { select.value = a.dataset.plan; });
  });

  // Formulář → mailto
  const form = document.getElementById('form');
  const status = document.getElementById('form-status');
  const rules = {
    jmeno: (v) => v.trim().length >= 2 || 'Vyplňte prosím své jméno.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Zadejte prosím platný e-mail, např. jana@seznam.cz.',
    telefon: (v) => !v.trim() || /^\+?[\d\s()-]{9,}$/.test(v.trim()) || 'Telefon zadejte ve tvaru např. 777 123 456.',
    co: (v) => !!v || 'Vyberte prosím, co potřebujete.',
    zprava: (v) => v.trim().length >= 5 || 'Napište prosím alespoň krátkou zprávu.',
    souhlas: (_, el) => el.checked || 'Bez souhlasu vám bohužel nemohu odpovědět.'
  };

  const validate = (el) => {
    const rule = rules[el.name];
    if (!rule) return true;
    const result = rule(el.value, el);
    const err = document.getElementById('e-' + el.name);
    if (result === true) { el.removeAttribute('aria-invalid'); err.textContent = ''; return true; }
    el.setAttribute('aria-invalid', 'true'); err.textContent = result; return false;
  };

  form.querySelectorAll('input, select, textarea').forEach((el) => {
    el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'blur', () => validate(el));
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid')) validate(el); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const fields = [...form.elements].filter((el) => rules[el.name]);
    const invalid = fields.filter((el) => !validate(el));
    if (invalid.length) { invalid[0].focus(); return; }

    const d = Object.fromEntries(new FormData(form));
    const subject = `Poptávka webu (Fajne weby) – ${d.co} – ${d.jmeno.trim()}`;
    const body = [
      `Jméno: ${d.jmeno.trim()}`,
      `E-mail: ${d.email.trim()}`,
      `Telefon: ${d.telefon.trim() || '–'}`,
      `Typ podniku: ${d.typ.trim() || '–'}`,
      `Co potřebuji: ${d.co}`,
      '',
      'Zpráva:',
      d.zprava.trim(),
      '',
      '— Odesláno z formuláře na webu Fajne weby'
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Otevírám váš e-mailový program… Pokud se neotevřel, napište mi prosím přímo na ' + EMAIL + '.';
  });
})();
