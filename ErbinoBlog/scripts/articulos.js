// control del menú hamburguesa y accesibilidad de mosaicos
(function(){
  // menú hamburguesa (misma lógica que tus otras páginas)
  const nav = document.querySelector('.aurora-menu');
  if (nav){
    const toggle = nav.querySelector('.menu-toggle');
    const menu = nav.querySelector('#menu');
    function setExpanded(val){
      if (!toggle) return;
      toggle.setAttribute('aria-expanded', String(val));
      nav.classList.toggle('is-open', val);
      document.body.classList.toggle('menu-open', val);
    }
    if (toggle){
      toggle.addEventListener('click', ()=> setExpanded(!nav.classList.contains('is-open')));
      document.addEventListener('keydown', (e)=> { if (e.key === 'Escape') setExpanded(false); });
      if (menu){
        menu.addEventListener('click', (e)=> { if (e.target.tagName === 'A') setExpanded(false); });
      }
    }
  }

  // permitir "Enter" para activar mosaicos cuando están enfocados
  const tiles = Array.from(document.querySelectorAll('.mosaic .tile'));
  tiles.forEach(tile => {
    tile.setAttribute('tabindex', '0'); // hace focusable
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // navegar al href
        const href = tile.getAttribute('href');
        if (href) window.location.href = href;
      }
    });
  });
})();