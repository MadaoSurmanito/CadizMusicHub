//Todo lo relacionado con el JavaScript que tiene que ver con el formulario de reserva de salas


document.addEventListener("DOMContentLoaded", function () {
    //Que se muestre un formulario o otro dependiendo del tipo de sala :)
    let seleccionSala = document.getElementById("tipoEs");
    seleccionSala.addEventListener("change", function (event) {
        let salasEnsayo = document.getElementById("SalaEnsayo");
        let estudioGrabacion = document.getElementById("Grabacion");
        if (event.target.value == 0) {
            salasEnsayo.style.display = "none";
            estudioGrabacion.style.display = "none";
        }
        else if (event.target.value == 1) {
            salasEnsayo.style.display = "flex";
            estudioGrabacion.style.display = "none";
        }
        else if (event.target.value == 2) {
            salasEnsayo.style.display = "none";
            estudioGrabacion.style.display = "flex";
        }
    });

    //Que el formulario se valide
    let formularioReserva = document.forms[0];
    formularioReserva.addEventListener("submit", function (event) {
        if(!validacionFormulario()) event.preventDefault(); // Detener el envío del formulario
    });
});

//Validacion del formulario
function validacionFormulario()
{
    //Si todo va bien se envia true, false en caso contrario
    let bien = true;

    //Los datos de la persona, que son comunes
    let nombre = document.getElementById("nombre");
    let apellidos = document.getElementById("apellidos");
    let fechaNac = document.getElementById("fechaNac");
    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");

    //Validacion del nombre
    if(!(/^[a-zA-Z]+$/.test(nombre)))
    {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo nombre es erroneo"));
        document.getElementById("problemas").appendChild(error);
    }

    //Validacion de los apellidos
    if(!(/[a-zA-z]+( [a-zA-z]+)*/.test(apellidos)))
    {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo apellidos es erroneo"));
        document.getElementById("problemas").appendChild(error);
    }

    return bien;
}