'use strict';
(function () {
  const $ = (s) => document.querySelector(s);
  const mb = $('#menuBtn'), nl = $('#navLinks');
  if (mb) mb.onclick = () => nl.classList.toggle('open');
  const dt = $('#docsToggle'), dn = $('#docsNav');
  if (dt) dt.onclick = () => dn.classList.toggle('open');

  // docs: filter the sidebar
  const ds = $('#docSearch');
  if (ds) ds.oninput = () => {
    const q = ds.value.trim().toLowerCase();
    document.querySelectorAll('#docsNav a').forEach((a) => { a.style.display = !q || a.dataset.k.includes(q) ? '' : 'none'; });
  };

  // download page: highlight this computer's platform
  const ua = navigator.userAgent;
  const os = /Windows/.test(ua) ? 'windows' : /Mac/.test(ua) ? 'mac' : /Linux|X11/.test(ua) ? 'linux' : '';
  if (os) document.querySelectorAll('[data-os="' + os + '"]').forEach((c) => c.classList.add('mine'));

  // contact form → email
  const f = $('#contactForm');
  if (f) f.onsubmit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    const to = (window.SHIP_CONFIG || {}).salesEmail;
    const msg = $('#cfMsg');
    if (!to) { msg.textContent = 'Online ordering opens soon. Thanks for your interest — please check back shortly.'; return; }
    const body = `Name: ${d.name}\nCompany: ${d.company}\nEmail: ${d.email}\nServer OS: ${d.os}\n\n${d.message}`;
    location.href = `mailto:${to}?subject=${encodeURIComponent('SHIP license request — ' + (d.company || d.name))}&body=${encodeURIComponent(body)}`;
    msg.textContent = 'Your email app should open with the request. If it doesn’t, write to ' + to + '.';
  };
})();
