/* ════════════════════════════
   NULL_BYTE — main.js
   ════════════════════════════ */

/* ── Mobile hamburger menu ── */
const navHamburger     = document.getElementById('navHamburger');
const mobileNav        = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function openMobileNav() {
  navHamburger.classList.add('open');
  mobileNav.classList.add('open');
  mobileNavOverlay.classList.add('open');
}
function closeMobileNav() {
  navHamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  mobileNavOverlay.classList.remove('open');
}

navHamburger.addEventListener('click', () => {
  mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
});
mobileNavOverlay.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', closeMobileNav);
});


/* ── Custom cursor ── */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, [data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});


/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});


/* ── Matrix rain canvas ── */
(function matrixRain() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソ!@#$%^&*<>?/\\|{}[]'.split('');
  const fontSize = 13;
  let cols = Math.floor(canvas.width / fontSize);
  let drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10,12,18,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px "Share Tech Mono", monospace';

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = i % 5 === 0 ? 'rgba(0,229,255,0.6)' : 'rgba(0,255,136,0.5)';
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  setInterval(draw, 48);
})();


/* ── Scroll reveals ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));


/* ── Filter tabs ── */
const filterTabs = document.querySelectorAll('.filter-tab');
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // In a real app, filter products here
  });
});


/* ── Terminal typewriter ── */
(function terminalWriter() {
  const termBody = document.getElementById('termBody');
  if (!termBody) return;

  const lines = [
    { delay: 200,  text: '<span class="t-green">null_byte@store</span><span class="t-white">:~$</span> ls -la ./collection', type: 'cmd' },
    { delay: 900,  text: '<span class="t-cyan">drwxr-xr-x</span>  virus-hoodie-v2.exe       <span class="t-green">$89</span>', type: 'out' },
    { delay: 1100, text: '<span class="t-cyan">drwxr-xr-x</span>  malware-cargo-pants.zip   <span class="t-green">$110</span>', type: 'out' },
    { delay: 1300, text: '<span class="t-cyan">drwxr-xr-x</span>  rootkit-overcoat.tar.gz   <span class="t-green">$179</span>', type: 'out' },
    { delay: 1500, text: '<span class="t-cyan">drwxr-xr-x</span>  zero-day-tee-v1.bin       <span class="t-green">$59</span>', type: 'out' },
    { delay: 1700, text: '<span class="t-cyan">drwxr-xr-x</span>  skeleton-key-hoodie.jar   <span class="t-green">$95</span>', type: 'out' },
    { delay: 2100, text: '<span class="t-green">null_byte@store</span><span class="t-white">:~$</span> ./deploy --all --ship', type: 'cmd' },
    { delay: 2800, text: '<span class="t-white">[████████████████████]</span> <span class="t-green">100%</span>  Deploying 6 items...', type: 'out' },
    { delay: 3400, text: '<span class="t-green">✓ Order dispatched.</span> Stay in the shadows.', type: 'out' },
  ];

  lines.forEach(({ delay, text, type }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 't-line';
      line.innerHTML = (type === 'cmd' ? '' : '&nbsp;&nbsp;') + text;
      termBody.appendChild(line);
      termBody.scrollTop = termBody.scrollHeight;
    }, delay);
  });
})();


/* ── Cart ── */
let cartItems = [];

function addToCart(name, price, imgSrc, sku) {
  cartItems.push({ name, price, imgSrc, sku, id: Date.now() });
  renderCart();
  openCart();
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartSidebar').classList.add('open');
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartSidebar').classList.remove('open');
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

function renderCart() {
  const badge   = document.getElementById('cartBadge');
  const items   = document.getElementById('cartItemsList');
  const footer  = document.getElementById('cartFooter');
  const empty   = document.getElementById('cartEmptyState');
  const total   = document.getElementById('cartTotalPrice');

  badge.textContent = cartItems.length;

  if (cartItems.length === 0) {
    empty.style.display = 'flex';
    footer.style.display = 'none';
    items.innerHTML = '';
    return;
  }

  empty.style.display  = 'none';
  footer.style.display = 'block';

  let sum = 0;
  items.innerHTML = cartItems.map(item => {
    const num = parseInt(item.price.replace('$', ''));
    sum += num;
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.imgSrc}" alt="${item.name}" onerror="this.style.display='none'">
        </div>
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-sku">SKU: ${item.sku}</p>
          <p class="cart-item-price">${item.price}</p>
        </div>
      </div>
    `;
  }).join('');

  total.textContent = '$' + sum;
}

// Expose to global for inline onclick
window.addToCart = addToCart;
window.openCart  = openCart;
window.closeCart = closeCart;


/* ── Newsletter ── */
document.getElementById('newsletterBtn').addEventListener('click', () => {
  const input = document.getElementById('newsletterInput');
  const val = input.value.trim();
  if (val && val.includes('@')) {
    input.value = '';
    input.placeholder = 'ACCESS_GRANTED — welcome to the network.';
    input.style.color = '#00ff88';
    setTimeout(() => {
      input.placeholder = 'Your email address';
      input.style.color = '';
    }, 3000);
  }
});


/* ── Glitch effect on hover for product names ── */
document.querySelectorAll('.product-name').forEach(el => {
  const original = el.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$';
  let interval;

  el.addEventListener('mouseenter', () => {
    let iter = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      el.textContent = original.split('').map((c, i) => {
        if (i < iter) return original[i];
        return c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (iter >= original.length) clearInterval(interval);
      iter += 0.4;
    }, 30);
  });

  el.addEventListener('mouseleave', () => {
    clearInterval(interval);
    el.textContent = original;
  });
});
