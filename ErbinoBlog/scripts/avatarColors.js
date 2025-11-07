// Cambia el color del título del aside cada 2s usando inline !important
document.addEventListener('DOMContentLoaded', function () {
  const el = document.querySelector('.avatar-title') || document.querySelector('.avatar h3');
  if (!el) return;

  const colors = ['#032b44', '#FFD700', '#FF7F50', '#8A2BE2', '#2ecc71'];
  let i = 0;

  // aseguramos una transición suave
  el.style.setProperty('transition', 'color 500ms ease');

  // aplicar color inicial con prioridad !important para sobreescribir reglas CSS con !important
  el.style.setProperty('color', colors[i], 'important');

  setInterval(() => {
    i = (i + 1) % colors.length;
    el.style.setProperty('color', colors[i], 'important');
  }, 2000);
});