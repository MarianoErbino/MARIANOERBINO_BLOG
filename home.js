// ==================== FUNCIONALIDAD "LEER MÁS" ==================== 
// Esta función maneja el botón "Leer más" en la sección "Sobre mí"
// Permite expandir y contraer información adicional
document.addEventListener('DOMContentLoaded', function() {
    const btnLeerMas = document.getElementById('btn-leer-mas');
    const sobreMiMas = document.getElementById('sobre-mi-mas');
    if (btnLeerMas && sobreMiMas) {
        btnLeerMas.addEventListener('click', function() {
            // Alterna la visibilidad del texto adicional y cambia el texto del botón
            if (sobreMiMas.style.display === "none" || sobreMiMas.style.display === "") {
                sobreMiMas.style.display = "block";
                btnLeerMas.textContent = "Leer menos";
            } else {
                sobreMiMas.style.display = "none";
                btnLeerMas.textContent = "Leer más";
            }
        });
    }
});

// ==================== SISTEMA DE MODALES ==================== 
// Gestiona la apertura y cierre de ventanas modales (pop-ups)
// Usadas para mostrar información detallada de certificaciones y experiencia

// --- Mostrar modal al hacer clic en "(ver más)" ---
// Abre el modal correspondiente cuando se hace clic en los enlaces "ver más"
document.querySelectorAll('.ver-mas').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Muestra el modal correspondiente al enlace usando el atributo data-modal
        document.getElementById(this.dataset.modal).style.display = 'block';
    });
});

// --- Cerrar modal al hacer clic en la cruz ---
// Permite cerrar el modal haciendo clic en el botón X
document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', function() {
        // Oculta el modal al hacer clic en la cruz
        this.closest('.modal').style.display = 'none';
    });
});

// --- Cerrar modal al hacer clic fuera del contenido del modal ---
// Cierra el modal si el usuario hace clic en el fondo oscuro (overlay)
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) modal.style.display = "none";
    });
};

// ==================== MENÚ HAMBURGUESA ==================== 
// Controla el menú de navegación móvil (tres líneas horizontales)
// Se muestra en dispositivos móviles y se oculta en desktop
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('hamburg-btn');
    const menu = document.getElementById('hamburg-menu');
    if (btn && menu) {
        // Toggle del menú al hacer clic en el botón hamburguesa
        btn.addEventListener('click', function() {
            menu.classList.toggle('show');
        });
        // Cierra el menú al hacer click fuera de él (mejora la UX)
        document.addEventListener('click', function(e) {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    }
});

// ==================== EFECTO VISUAL DE SECCIONES ==================== 
// Permite destacar una sección al hacer clic en ella (efecto de agrandado)
// Mejora la experiencia visual y la navegación por el contenido
document.querySelectorAll('section, footer').forEach(function(el) {
    el.addEventListener('click', function() {
        // Si la sección ya está agrandada, la deselecciona (toggle)
        if (el.classList.contains('agrandado')) {
            el.classList.remove('agrandado');
        } else {
            // Remueve la clase de todas las demás secciones (solo una a la vez)
            document.querySelectorAll('section, footer').forEach(function(e) {
                e.classList.remove('agrandado');
            });
            // Agrega la clase a la sección clickeada
            el.classList.add('agrandado');
        }
    });
});

