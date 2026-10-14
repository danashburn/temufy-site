(() => {
  const form = document.querySelector('[data-form="not-connected"]');
  form?.addEventListener('submit', event => event.preventDefault());
  const bar = document.getElementById('sticky-bar');
  const heroAction = document.getElementById('hero-action-group');
  const occluders = [document.getElementById('risk-check'), document.getElementById('price-action-group'), document.querySelector('.close-action-group'), document.getElementById('footer')];
  const visible = element => {
    const rect = element.getBoundingClientRect();
    return rect.top < innerHeight && rect.bottom > 0;
  };
  const updateBar = () => {
    const show = innerWidth < 768 && heroAction.getBoundingClientRect().bottom < 0 && !occluders.some(visible);
    if (!show && bar.contains(document.activeElement)) return;
    bar.hidden = !show;
    const height = show ? bar.getBoundingClientRect().height : 0;
    document.body.style.setProperty('--sticky-reserve', `${height}px`);
    document.scrollingElement.style.scrollPaddingBottom = show ? `${height + 16}px` : '';
  };
  addEventListener('scroll', updateBar, { passive: true });
  addEventListener('resize', updateBar);
  bar.addEventListener('focusout', () => requestAnimationFrame(updateBar));
  if ('ResizeObserver' in window) new ResizeObserver(updateBar).observe(bar);
  updateBar();
})();
