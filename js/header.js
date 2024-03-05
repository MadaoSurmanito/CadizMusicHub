// Controlar el desplazamiento y cambiar la clase del encabezado
window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});