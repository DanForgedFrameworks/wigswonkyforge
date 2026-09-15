/* Wig's Wonky Forge — page behaviour. Data lives in js/data.js. */
(function () {
  'use strict';

  // Where the contact form sends. FormSubmit needs no account: the first message sent
  // triggers a one-off confirmation email to this address, and it works once that is clicked.
  var CONTACT_EMAIL = 'wig@wonkyforge.co.uk';

  var D = window.WWF_DATA;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;
  var TILE_SIZES = '(min-width: 1200px) 25vw, (min-width: 640px) 45vw, 100vw';

  function img(name, w) { return 'assets/img/' + name + '-' + w + '.webp'; }
  function srcset(name) { return img(name, 800) + ' 800w, ' + img(name, 1600) + ' 1600w'; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function tilt(i, amt) { return (i % 2 ? amt : -amt) + 'deg'; }
  function photoTag(name, alt) {
    return '<img src="' + img(name, 800) + '" srcset="' + srcset(name) + '" sizes="' + TILE_SIZES + '" alt="' + esc(alt) + '" loading="lazy">';
  }
  function cycleAttr(photos) { return photos.length > 1 ? ' data-cycle="' + esc(photos.join(',')) + '"' : ''; }
  function count(photos) { return photos.length > 1 ? photos.length + ' photos' : ''; }
  function fill(key, html) { var el = document.querySelector('[data-render="' + key + '"]'); if (el) el.innerHTML = html; }

  /* ---------- render ---------- */
  var no = 0;
  fill('catalogue', D.catalogue.map(function (g) {
    return '<div class="group"><p class="kicker is-muted hairline-top">' + esc(g[0]) + '</p><div class="grid-tiles">' +
      g[1].map(function (p) {
        var n = String(++no).padStart(2, '0');
        return '<figure class="tile" data-reveal><div class="tile-media"' + cycleAttr(p[1]) + '>' + photoTag(p[1][0], p[2]) + '</div>' +
          '<figcaption class="cap-no"><b>' + n + '</b><span><span class="cap-name">' + esc(p[0]) + '</span>' +
          (count(p[1]) ? '<span class="cap-count">' + count(p[1]) + '</span>' : '') + '</span></figcaption></figure>';
      }).join('') + '</div></div>';
  }).join(''));

  fill('gnomes', D.gnomes.map(function (g, i) {
    return '<figure class="tile' + (g[2] ? ' span-2' : '') + '" data-reveal style="gap:12px">' +
      '<div class="tile-media ' + (g[2] ? 'is-wide' : 'is-tall') + '" style="--tilt:' + tilt(i, 1.1) + '">' + photoTag(g[0], g[1]) + '</div>' +
      '<figcaption class="label is-muted">' + esc(g[1]) + '</figcaption></figure>';
  }).join(''));

  fill('bespoke', D.bespoke.map(function (b, i) {
    return '<figure class="tile' + (b[2] ? ' span-2' : '') + '" data-reveal style="gap:12px">' +
      '<div class="tile-media ' + (b[2] ? 'is-wide' : 'is-tall') + '" style="--tilt:' + tilt(i, 1.1) + '"' + cycleAttr(b[1]) + '>' + photoTag(b[1][0], b[0]) + '</div>' +
      '<figcaption class="cap-row"><span class="cap-name">' + esc(b[0]) + '</span>' +
      (count(b[1]) ? '<span class="cap-count">' + count(b[1]) + '</span>' : '') + '</figcaption></figure>';
  }).join(''));

  fill('homes', D.homes.map(function (h, i) {
    return '<figure class="tile" data-reveal style="gap:12px">' +
      '<img class="photo is-wide" style="--tilt:' + tilt(i, 1.2) + ';object-position:' + (h[2] || 'center 30%') + '" src="' + img(h[0], 800) + '" srcset="' + srcset(h[0]) + '" sizes="' + TILE_SIZES + '" alt="' + esc(h[1]) + '" loading="lazy">' +
      '<figcaption class="label is-muted">' + esc(h[1]) + '</figcaption></figure>';
  }).join(''));

  fill('memorial', D.memorial.map(function (m, i) {
    return '<button type="button" data-mem-thumb="' + i + '" aria-label="Show photo ' + (i + 1) + ': ' + esc(m[1]) + '"><img src="' + img(m[0], 800) + '" alt="" loading="lazy"></button>';
  }).join(''));

  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle'), nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) { nav.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? 'Close' : 'Menu'; };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  }

  /* ---------- hero video ---------- */
  var heroVid = document.querySelector('[data-hero-video]');
  if (heroVid) {
    var still = heroVid.previousElementSibling;
    if (reduced) { heroVid.remove(); }
    else {
      var showVid = function () { if (still) still.style.opacity = '0'; };
      heroVid.addEventListener('playing', showVid);
      heroVid.addEventListener('error', function () { heroVid.style.display = 'none'; });
      heroVid.play().catch(function () {});
    }
  }

  /* ---------- hover photo cycle: 1.5s after hover, then every 3s; stays where it got to ---------- */
  if (!reduced && canHover) {
    document.querySelectorAll('[data-cycle]').forEach(function (box) {
      var photos = box.getAttribute('data-cycle').split(','), pic = box.querySelector('img'), i = 0, first, loop;
      var step = function () {
        i = (i + 1) % photos.length;
        var name = photos[i], pre = new Image();
        pre.src = img(name, 800);
        pic.classList.add('is-fading');
        setTimeout(function () {
          pic.srcset = srcset(name); pic.src = img(name, 800);
          var done = function () { pic.classList.remove('is-fading'); };
          if (pic.complete) done(); else pic.addEventListener('load', done, { once: true });
        }, 400);
      };
      box.addEventListener('mouseenter', function () { first = setTimeout(function () { step(); loop = setInterval(step, 3000); }, 1500); });
      box.addEventListener('mouseleave', function () { clearTimeout(first); clearInterval(loop); });
    });
  }

  /* ---------- catalogue clips: play on hover; button pins playback ---------- */
  document.querySelectorAll('.clip').forEach(function (fig) {
    var v = fig.querySelector('video'), btn = fig.querySelector('[data-clip-toggle]'), bar = fig.querySelector('.clip-bar div');
    var label = function () { btn.textContent = v.paused ? 'Play' : 'Pause'; };
    if (canHover && !reduced) {
      v.parentElement.addEventListener('mouseenter', function () { v.play().catch(function () {}); });
      v.parentElement.addEventListener('mouseleave', function () { if (!v.dataset.pinned) v.pause(); });
    }
    btn.addEventListener('click', function () {
      if (v.paused) { v.dataset.pinned = '1'; v.play().catch(function () {}); }
      else { delete v.dataset.pinned; v.pause(); }
    });
    v.addEventListener('play', label); v.addEventListener('pause', label);
    v.addEventListener('timeupdate', function () { if (v.duration) bar.style.width = (v.currentTime / v.duration * 100) + '%'; });
  });

  /* ---------- memorial viewer ---------- */
  var main = document.querySelector('[data-mem-main]');
  if (main) {
    var thumbs = Array.prototype.slice.call(document.querySelectorAll('[data-mem-thumb]'));
    var cap = document.querySelector('[data-mem-cap]'), cnt = document.querySelector('[data-mem-count]'), cur = 0;
    var show = function (n, animate) {
      cur = (n + thumbs.length) % thumbs.length;
      var m = D.memorial[cur];
      var swap = function () {
        main.srcset = srcset(m[0]); main.src = img(m[0], 800); main.alt = m[1];
        var done = function () { main.style.opacity = ''; };
        if (main.complete) done(); else main.addEventListener('load', done, { once: true });
      };
      if (animate) { main.style.opacity = '0'; setTimeout(swap, 200); }
      thumbs.forEach(function (t, k) { t.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
      cap.textContent = m[1];
      cnt.textContent = (cur + 1) + ' / ' + thumbs.length;
    };
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { show(k, true); }); });
    document.querySelector('[data-mem-prev]').addEventListener('click', function () { show(cur - 1, true); });
    document.querySelector('[data-mem-next]').addEventListener('click', function () { show(cur + 1, true); });
    show(0, false);
  }

  /* ---------- contact form ---------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var note = form.querySelector('[data-form-note]'), sendBtn = form.querySelector('button[type="submit"]');
    var mailtoFallback = function (name, email, msg) {
      var body = encodeURIComponent(msg + '\n\n— ' + name + '\n' + email);
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Wonky Forge enquiry from ' + name) + '&body=' + body;
      note.className = 'form-note';
      note.textContent = 'Opening your email app instead — hit send and it lands with me.';
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var f = form.elements;
      if (f.namedItem('_honey').value) return;
      var name = f.namedItem('name').value.trim(), email = f.namedItem('email').value.trim(), msg = f.namedItem('message').value.trim();
      sendBtn.disabled = true; note.className = 'form-note'; note.textContent = 'Sending…';
      fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: name, email: email, message: msg, _subject: 'Wonky Forge enquiry from ' + name, _template: 'table', _replyto: email })
      }).then(function (r) { return r.json().then(function (j) { if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || 'failed'); }); })
        .then(function () { form.reset(); note.className = 'form-note is-ok'; note.textContent = "Sent — it's landed with me. I'll get back to you."; })
        .catch(function () { mailtoFallback(name, email, msg); })
        .then(function () { sendBtn.disabled = false; });
    });
  }

  /* ---------- reveals and heading word-splits ---------- */
  if (reduced || !('IntersectionObserver' in window)) return;

  document.querySelectorAll('[data-split]').forEach(function (h) {
    var words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', words.join(' '));
    h.innerHTML = words.map(function (w, i) { return '<span class="split-word" aria-hidden="true"><span style="--i:' + i + '">' + esc(w) + '</span></span>'; }).join(' ');
  });

  var vh = window.innerHeight;
  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]')).filter(function (el) {
    return el.getBoundingClientRect().top > vh * 0.92; // already on screen: leave it alone
  });
  reveals.forEach(function (el) { el.classList.add('reveal-wait'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      if (el.hasAttribute('data-split')) el.classList.add('is-split-in');
      else { el.classList.add('reveal-go'); el.classList.remove('reveal-wait'); }
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(function (el) { io.observe(el); });
  document.querySelectorAll('[data-split]').forEach(function (el) { io.observe(el); });

  // Belt and braces: nothing stays hidden past 8s.
  setTimeout(function () {
    document.querySelectorAll('.reveal-wait').forEach(function (el) { el.classList.remove('reveal-wait'); });
    document.querySelectorAll('[data-split]').forEach(function (el) { el.classList.add('is-split-in'); });
  }, 8000);
})();
