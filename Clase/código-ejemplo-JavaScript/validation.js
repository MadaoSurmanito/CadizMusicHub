function esNumerico(elem) {
     let expresionNumerica = /^[0-9]+$/;
     if (elem.value.match(expresionNumerica)) {
          return true;
     } else {
          alert("Por favor, inserta solamente números");
          return false;
     }
}

function esNombre(elem) {
     let expresionRegular = /^[a-zA-z]+ [a-zA-z]+$/;
     if (elem.value.match(expresionRegular)) {
          return true;
     } else {
          alert("Por favor, inserta un nombre completo");
          return false;
     }
}

document.addEventListener("DOMContentLoaded", function () {
     let formContacto = document.getElementById("form_contact");
     formContacto.addEventListener("submit", function (event) {
          let edad = document.getElementById("age");
          let nombre = document.getElementById("name");
          let resEdad = esNumerico(edad);
          let resNombre = esNombre(nombre);
          if (resEdad && resNombre) {
               alert("Formulario correcto");
          }
          else {
               event.preventDefault(); // Detener el envío del formulario
          }
     });
});