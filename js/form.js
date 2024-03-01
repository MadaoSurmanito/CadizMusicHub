//Todo lo relacionado con el JavaScript que tiene que ver con el formulario de reserva de salas


document.addEventListener("DOMContentLoaded", function () {
    //Que se muestre un formulario o otro dependiendo del tipo de sala :)
    let seleccionSala = document.getElementById("tipoEs");
    seleccionSala.addEventListener("change", function (event) {
        let salasEnsayo = document.getElementsByClassName("SalaEnsayo");
        let estudioGrabacion = document.getElementsByClassName("Grabacion");
        if (event.target.value == 0) {
            for (let i = 0; i < salasEnsayo.length; i++) {
                salasEnsayo[i].style.display = "none";
            }
            for (let i = 0; i < estudioGrabacion.length; i++) {
                estudioGrabacion[i].style.display = "none";
            }
        }
        else if (event.target.value == 1) {
            for (let i = 0; i < salasEnsayo.length; i++) {
                salasEnsayo[i].style.display = "flex";
            }
            for (let i = 0; i < estudioGrabacion.length; i++) {
                estudioGrabacion[i].style.display = "none";
            }
        }
        else if (event.target.value == 2) {
            for (let i = 0; i < salasEnsayo.length; i++) {
                salasEnsayo[i].style.display = "none";
            }
            for (let i = 0; i < estudioGrabacion.length; i++) {
                estudioGrabacion[i].style.display = "flex";
            }
        }
    });

    //Que el formulario se valide
    let formularioReserva = document.forms[0];
    formularioReserva.addEventListener("submit", function (event) {
        if (!validacionFormulario()) event.preventDefault(); // Detener el envío del formulario
    });
});

//Validacion del formulario
function validacionFormulario() {
    //Si todo va bien se envia true, false en caso contrario
    let bien = true;

    //Los datos de la persona, que son comunes
    let nombre = document.getElementById("nombre");
    let apellidos = document.getElementById("apellidos");
    let fechaNac = document.getElementById("fechaNac");
    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");

    //Validacion del nombre
    if (!(/^[a-zA-Z]+$/.test(nombre))) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo nombre es erroneo"));
        document.getElementById("problemas").appendChild(error);
    }

    //Validacion de los apellidos
    if (!(/[a-zA-z]+( [a-zA-z]+)*/.test(apellidos))) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo apellidos es erroneo"));
        document.getElementById("problemas").appendChild(error);
    }

    return bien;
}