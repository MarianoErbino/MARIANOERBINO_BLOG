// ==================== EFECTO VISUAL DE SECCIONES ==================== 
// Permite destacar una sección al hacer clic en ella (efecto de agrandado)
// Mejora la experiencia visual y la navegación por el contenido de proyectos
document.querySelectorAll('section, footer').forEach(function(el) {
    el.addEventListener('click', function() {
        // Si esta sección ya está agrandada, la desagrandamos (toggle)
        if (el.classList.contains('agrandado')) {
            el.classList.remove('agrandado');
        } else {
            // Quitar el agrandado de todas las demás secciones (solo una a la vez)
            document.querySelectorAll('section, footer').forEach(function(e) {
                e.classList.remove('agrandado');
            });
            // Agregar agrandado a esta sección para destacarla
            el.classList.add('agrandado');
        }
    });
});

// ==================== MENÚ HAMBURGUESA ==================== 
// Controla el menú de navegación móvil en la página de proyectos
// Se muestra en dispositivos móviles para una mejor experiencia de usuario
const btn = document.getElementById('hamburg-btn');
const menu = document.getElementById('hamburg-menu');

if (btn && menu) {
    // Toggle del menú al hacer clic en el botón hamburguesa (tres líneas)
    btn.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
    
    // Cierra el menú al hacer clic fuera de él (mejora la UX)
    document.addEventListener('click', function(e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('show');
        }
    });
}