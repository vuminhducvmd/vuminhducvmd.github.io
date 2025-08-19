document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('[data-paginate]');
  if (!list) return;

  const items = Array.from(list.querySelectorAll('.paginated-item'));
  const perPage = parseInt(list.dataset.perPage || '10', 10);
  const pager = document.getElementById('pagination');

  const render = (page) => {
    const total = Math.max(1, Math.ceil(items.length / perPage));
    page = Math.min(Math.max(1, page), total);
    items.forEach((el, i) => {
      const p = Math.floor(i / perPage) + 1;
      el.style.display = (p === page) ? '' : 'none';
    });
    if (pager){
      pager.innerHTML = '';
      for (let i = 1; i <= total; i++){
        const b = document.createElement('button');
        b.className = 'page-btn';
        b.textContent = String(i);
        if (i === page) b.setAttribute('aria-current', 'page');
        b.addEventListener('click', () => render(i));
        pager.appendChild(b);
      }
    }
  };

  render(1);
});
