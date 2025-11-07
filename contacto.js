// ==================== INICIALIZACIÓN DE LA PÁGINA DE CONTACTO ==================== 
// Este script maneja toda la funcionalidad de la página de contacto:
// menú hamburguesa, validación de formulario y notificaciones
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MENÚ HAMBURGUESA ==================== 
    // Controla el menú de navegación móvil en la página de contacto
    var btn = document.getElementById('hamburg-btn');
    var menu = document.getElementById('hamburg-menu');
    if (btn && menu) {
        // Toggle del menú al hacer clic en el botón hamburguesa
        btn.addEventListener('click', function() {
            menu.classList.toggle('show');
        });
        // Cierra el menú al hacer clic fuera de él (mejora la UX)
        document.addEventListener('click', function(e) {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    }

    // ==================== SISTEMA DE VALIDACIÓN DE FORMULARIO ==================== 
    // Configura la validación en tiempo real y al envío del formulario de contacto
    var form = document.getElementById('contacto-form');
    var msg = document.getElementById('form-msg');
    var privacidad = document.getElementById('privacidad');
    var institucion = form.institucion; // Campo opcional para empresa/institución
    var mensaje = form.mensaje; // Campo opcional para el mensaje del usuario

    // Expresión regular para validar que solo contenga letras y espacios
    var soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    // ==================== VALIDACIÓN EN TIEMPO REAL ==================== 
    // Proporciona feedback visual inmediato mientras el usuario escribe
    
    // Validación del campo nombre (mínimo 2 caracteres, solo letras)
    form.nombre.addEventListener('input', function() {
        if (form.nombre.value.trim().length >= 2 && soloLetras.test(form.nombre.value.trim())) {
            form.nombre.style.borderColor = "#2ecc40"; // Verde = válido
        } else {
            form.nombre.style.borderColor = "#e74c3c"; // Rojo = inválido
        }
    });
    
    // Validación del campo apellido (mínimo 2 caracteres, solo letras)
    form.apellido.addEventListener('input', function() {
        if (form.apellido.value.trim().length >= 2 && soloLetras.test(form.apellido.value.trim())) {
            form.apellido.style.borderColor = "#2ecc40"; // Verde = válido
        } else {
            form.apellido.style.borderColor = "#e74c3c"; // Rojo = inválido
        }
    });

    // ==================== VALIDACIÓN AL ENVÍO DEL FORMULARIO ==================== 
    // Valida todos los campos antes de enviar y muestra errores si los hay
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el envío normal del formulario
        
        // Obtener valores de los campos principales
        var nombre = form.nombre.value.trim();
        var apellido = form.apellido.value.trim();
        var email = form.email ? form.email.value.trim() : ""; // Email si existe
        var errores = []; // Array para acumular errores de validación

        // ==================== VALIDACIÓN INDIVIDUAL DE CAMPOS ==================== 
        
        // Validar nombre (obligatorio, mínimo 2 letras, solo letras)
        if (nombre.length < 2 || !soloLetras.test(nombre)) {
            errores.push("El nombre es obligatorio, mínimo 2 letras y sin números.");
            form.nombre.style.borderColor = "#e74c3c";
        } else {
            form.nombre.style.borderColor = "#2ecc40";
        }

        // Validar apellido (obligatorio, mínimo 2 letras, solo letras)
        if (apellido.length < 2 || !soloLetras.test(apellido)) {
            errores.push("El apellido es obligatorio, mínimo 2 letras y sin números.");
            form.apellido.style.borderColor = "#e74c3c";
        } else {
            form.apellido.style.borderColor = "#2ecc40";
        }

        // Validar email si el campo existe (formato válido de email)
        if (form.email) {
            var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (email === "" || !emailValido) {
                errores.push("El email es obligatorio y debe ser válido.");
                form.email.style.borderColor = "#e74c3c";
            } else {
                form.email.style.borderColor = "#2ecc40";
            }
        }

        // Institución y mensaje son campos opcionales, no se validan como obligatorios
        if (institucion) institucion.style.borderColor = ""; // Sin color = neutral
        if (mensaje) mensaje.style.borderColor = ""; // Sin color = neutral

        // Validar checkbox de privacidad (obligatorio)
        if (!privacidad.checked) {
            errores.push("Debes aceptar el uso de tus datos para ser contactado.");
            msg.style.color = 'red';
            privacidad.focus(); // Enfocar el checkbox para que el usuario lo note
        } else {
            msg.style.color = '';
        }

        // ==================== MOSTRAR RESULTADOS DE VALIDACIÓN ==================== 
        
        // Si hay errores, mostrarlos al usuario
        if (errores.length > 0) {
            msg.style.color = "red";
            msg.innerHTML = errores.join("<br>"); // Mostrar todos los errores separados por saltos de línea
        } else {
            // Si no hay errores, limpiar el formulario y mostrar mensaje de éxito
            msg.innerHTML = ""; // Limpiar mensajes de error
            
            // Resetear colores de borde a normal
            form.nombre.style.borderColor = "";
            form.apellido.style.borderColor = "";
            if (form.email) form.email.style.borderColor = "";
            
            form.reset(); // Limpiar todos los campos del formulario
            mostrarPushpop("¡Mensaje enviado correctamente!"); // Mostrar notificación de éxito
        }
    });

    // ==================== SISTEMA DE NOTIFICACIONES (PUSHPOP) ==================== 
    // Muestra notificaciones emergentes temporales al usuario
    function mostrarPushpop(mensaje) {
        // Crear elemento div para la notificación
        var pushpop = document.createElement('div');
        pushpop.className = 'pushpop-exito';
        
        // Contenido: icono de check verde + mensaje
        pushpop.innerHTML = '<span style="font-size:2.5rem; color:#2ecc40;">&#10003;</span><div style="margin-top:0.5em;">' + mensaje + '</div>';
        
        // Agregar al DOM
        document.body.appendChild(pushpop);
        
        // Mostrar con animación (pequeño delay para que se vea la transición)
        setTimeout(function() {
            pushpop.classList.add('show');
        }, 10);
        
        // Ocultar después de 2 segundos y luego remover del DOM
        setTimeout(function() {
            pushpop.classList.remove('show');
            setTimeout(function() {
                document.body.removeChild(pushpop);
            }, 300); // Tiempo para la animación de salida
        }, 2000); // Duración total de la notificación
    }
});

// ==================== EFECTO VISUAL DE SECCIONES ==================== 
// Permite destacar secciones al hacer clic en la página de contacto
// Funcionalidad similar a las otras páginas pero sin toggle (siempre activa una sección)
document.querySelectorAll('section, footer').forEach(function(el) {
    el.addEventListener('click', function() {
        // Remover la clase de todas las secciones
        document.querySelectorAll('section, footer').forEach(function(e) {
            e.classList.remove('agrandado');
        });
        // Agregar la clase solo a la sección clickeada
        el.classList.add('agrandado');
    });
});