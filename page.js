(() => {
  const body = document.body;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    try {
      const heroHeadline = document.querySelector('.hero-headline');
      const heroImage = document.querySelector('.reveal-hero-image');
      for (const node of [heroHeadline, heroImage]) node.classList.add('reveal-ready');
      requestAnimationFrame(() => {
        heroHeadline.classList.add('reveal-visible');
        setTimeout(() => heroImage.classList.add('reveal-visible'), 40);
      });
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach((node) => {
        if (node.getBoundingClientRect().top >= innerHeight) {
          observer.observe(node);
          node.classList.add('reveal-ready');
        }
      });
    } catch (_) {
      document.querySelectorAll('.reveal-ready').forEach(node => node.classList.remove('reveal-ready'));
    }
  }

  const bar = document.getElementById('sticky-bar');
  const heroGroup = document.getElementById('hero-action-group');
  const occluders = [document.getElementById('price-action-group'), document.querySelector('.close-action-group'), document.getElementById('footer')];
  const intersects = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top < innerHeight && rect.bottom > 0;
  };
  const updateBar = () => {
    const shouldShow = innerWidth < 768 && heroGroup.getBoundingClientRect().bottom < 0 && !occluders.some(intersects);
    if (!shouldShow && bar.contains(document.activeElement)) return;
    bar.hidden = !shouldShow;
    const height = shouldShow ? bar.getBoundingClientRect().height : 0;
    body.style.setProperty('--sticky-reserve', `${height}px`);
    document.scrollingElement.style.scrollPaddingBottom = shouldShow ? `${height + 16}px` : '';
  };
  addEventListener('scroll', updateBar, { passive: true });
  addEventListener('resize', updateBar);
  bar.addEventListener('focusout', () => requestAnimationFrame(updateBar));
  new ResizeObserver(updateBar).observe(bar);
  updateBar();
})();
