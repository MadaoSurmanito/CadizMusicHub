// Obtener referencia al botón
var botonSubir = document.getElementById('botonSubir');

// Función para mostrar u ocultar el botón basado en el desplazamiento
window.addEventListener('scroll', function() {
    // Mostrar el botón cuando el desplazamiento sea mayor a 100px
    if (window.scrollY > 100) {
        botonSubir.classList.add('mostrar');
    } else {
        botonSubir.classList.remove('mostrar');
    }
});