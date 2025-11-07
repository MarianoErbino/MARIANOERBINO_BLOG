document.addEventListener('DOMContentLoaded', function () {
  // Selecciona enlaces y botones que usan la palabra "Inscribite"
  const candidates = Array.from(document.querySelectorAll('a.continuar, button'));
  const inscribibles = candidates.filter(el => {
    const text = (el.textContent || '').trim().toUpperCase();
    return text === 'INSCRIBITE' || text === 'INSCRÍBETE' || text === 'INSCRIBIRSE';
  });

  inscribibles.forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (el.classList.contains('inscripto')) return;
      el.classList.add('inscripto');
      el.textContent = 'INSCRIPTO';
      el.setAttribute('aria-pressed', 'true');
    });
  });

  // Maneja "INSCRIBITE" -> "INSCRIPTO", "COMPRAR" -> "ENVIADO" y "ENVIAR" -> "ENVIADO"
  const elements = Array.from(document.querySelectorAll('a.continuar, button, input[type="submit"], input[type="button"]'));

  function textNormalized(el) {
    if (el.tagName === 'INPUT') return (el.value || '').trim().toUpperCase();
    return (el.textContent || el.innerText || '').trim().toUpperCase();
  }

  elements.forEach(el => {
    const txt = textNormalized(el);

    // INSCRIBITE -> INSCRIPTO (ancla o botón)
    if (['INSCRIBITE', 'INSCRÍBETE', 'INSCRIBIRSE'].includes(txt)) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        if (el.classList.contains('inscripto')) return;
        el.classList.add('inscripto');
        if (el.tagName === 'INPUT') el.value = 'INSCRIPTO';
        else el.textContent = 'INSCRIPTO';
        el.setAttribute('aria-pressed', 'true');
        if (el.tagName !== 'A') el.disabled = true;
      });
    }

    // COMPRAR -> ENVIADO
    if (txt === 'COMPRAR') {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        if (el.classList.contains('enviado')) return;
        el.classList.add('enviado');
        if (el.tagName === 'INPUT') el.value = 'ENVIADO';
        else el.textContent = 'ENVIADO';
        el.setAttribute('aria-pressed', 'true');
        if (el.tagName !== 'A') el.disabled = true;
      });
    }

    // ENVIAR -> ENVIADO (formularios / botones enviar)
    if (txt === 'ENVIAR' || txt === 'ENVIAR PEDIDO' || txt === 'ENVIAR' ) {
      el.addEventListener('click', function (e) {
        // si es un submit real, permitir envío y luego cambiar estado
        // prevenimos envíos rápidos múltiples para ver el cambio visual
        e.preventDefault();
        if (el.classList.contains('enviado')) return;
        el.classList.add('enviado');
        if (el.tagName === 'INPUT') el.value = 'ENVIADO';
        else el.textContent = 'ENVIADO';
        el.setAttribute('aria-pressed', 'true');
        if (el.tagName !== 'A') el.disabled = true;

        // Si es un formulario y quieres enviar, descomenta la línea siguiente:
        // el.closest('form')?.submit();
      });
    }
  });
});