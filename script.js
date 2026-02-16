gsap.registerPlugin(ScrollTrigger);  //плагин

const slides = Array.from(document.querySelectorAll(".slider .slide"));
slides.forEach((s, i) => (s.style.opacity = i === 0 ? 1 : 0));
let current = 0;

ScrollTrigger.create({
  trigger: ".slider-section",
  start: "top 70%",     // когда верх блока дошёл до 70% экрана
  end: "bottom 30%",    // когда низ блока дошёл до 30% экрана
  scrub: true,
  onUpdate: (self) => {
    const max = slides.length - 1;
    const index = Math.min(max, Math.floor(self.progress * slides.length));

    if (index !== current) {
      gsap.to(slides[current], { opacity: 0, duration: 0.25, overwrite: true });
      gsap.to(slides[index],   { opacity: 1, duration: 0.25, overwrite: true });
      current = index;
    }
  }
});





const track = document.getElementById('track');
const cards = Array.from(document.querySelectorAll('.card'));
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

const cur = document.getElementById('cur');
const total = document.getElementById('total');

let index = 0;

function pad2(n){ return String(n).padStart(2,'0'); }

function update(){
  // активная карточка
  cards.forEach((c,i) => c.classList.toggle('is-active', i === index));

  // сдвиг ленты
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const step = cardWidth + gap;

  track.style.transform = `translateX(${-index * step}px)`;

  // счетчик
  cur.textContent = pad2(index + 1);
  total.textContent = pad2(cards.length);
}

btnNext.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  update();
});

btnPrev.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  update();
});

update();








  const overlay = document.getElementById('menuOverlay');
  const openBtn = document.getElementById('openMenuBurger');
  const closeBtn = document.getElementById('menuClose');

  function openMenu() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  // клик по затемнению (не по панели)
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeMenu();
  });















  










document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('track');
  const cards = Array.from(document.querySelectorAll('.card'));

  const cur = document.getElementById('cur');
  const total = document.getElementById('total');

  const dotsWrap = document.getElementById('dots');
  const viewport = document.querySelector('.features-viewport');

  if (!track || cards.length === 0 || !cur || !total) return;

  let index = 0;
  let dots = [];

  const pad2 = (n) => String(n).padStart(2, '0');

  function buildDots(){
    if (!dotsWrap) return;

    dotsWrap.innerHTML = '';
    dots = cards.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Слайд ${i+1}`);

      dot.addEventListener('click', () => {
        index = i;
        update();
      });

      dotsWrap.appendChild(dot);
      return dot;
    });
  }

  function getStep(){
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return cardWidth + gap;
  }

  function update(){
    // активная карточка
    cards.forEach((c,i) => c.classList.toggle('is-active', i === index));

    // сдвиг ленты
    const step = getStep();
    track.style.transform = `translateX(${-index * step}px)`;

    // счетчик
    cur.textContent = pad2(index + 1);
    total.textContent = pad2(cards.length);

    // точки
    if (dots.length){
      dots.forEach((d,i) => d.classList.toggle('is-active', i === index));
    }
  }

  /* ===== СВАЙП ===== */
  let startX = 0;
  let startY = 0;
  let moved = false;

  if (viewport){
    viewport.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      moved = false;
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      // если движение больше по X чем по Y — считаем это свайпом
      if (Math.abs(dx) > Math.abs(dy)) moved = true;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (!moved) return;

      const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
      const dx = endX - startX;
      const threshold = 50;

      if (dx < -threshold){
        // свайп влево → следующий
        index = Math.min(index + 1, cards.length - 1);
        update();
      } else if (dx > threshold){
        // свайп вправо → предыдущий
        index = Math.max(index - 1, 0);
        update();
      }
    }, { passive: true });
  }

  window.addEventListener('resize', update);

  buildDots();
  update();
});
























document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('menuClose');

  const openBtns = [
    document.getElementById('openMenuMob'),
    document.getElementById('openMenuBurger'),
    document.getElementById('openMenu'),
  ].filter(Boolean);

  if (!overlay || !closeBtn || openBtns.length === 0) return;

  function openMenu() {
    overlay.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  // открыть
  openBtns.forEach(btn => btn.addEventListener('click', openMenu));

  // закрыть по крестику
  closeBtn.addEventListener('click', closeMenu);

  // закрыть по клику на фон (вне панели)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  // закрыть по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});
