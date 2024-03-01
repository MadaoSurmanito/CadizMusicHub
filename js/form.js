//Todo lo relacionado con el JavaScript que tiene que ver con el formulario de reserva de salas
let horasSala = [];
let horasEstudio = [];

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

//Botones para las horas
document.addEventListener("click", ev => {
    if (ev.target.matches(".SalaEnsayo td>button")) HoraASala(ev.target.value);
    if (ev.target.matches(".Grabacion td>button")) HoraAEstudio(ev.target.value);
});

//Validacion del formulario
function validacionFormulario() {
    //Lo primero, despejar todos los errores anteriores que puedan existir
    let parrafos = document.getElementById("problemas").getElementsByTagName("p");
    let tamanno = parrafos.length;
    for (let i = 0; i < tamanno; i++) parrafos[0].parentNode.removeChild(parrafos[0]);

    //Si todo va bien se envia true, false en caso contrario
    let bien = true;

    //Los datos de la persona, que son comunes
    let nombre = document.getElementById("nombre");
    let apellidos = document.getElementById("apellidos");
    let fechaNac = document.getElementById("fechaNac").value;
    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");
    let eleccionSala = document.getElementById("tipoEs").value;

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

    //Validacion de la fecha de nacimiento
    let fechaDeHoy = new Date();
    let fechaDada = new Date(fechaNac);
    if (fechaNac == "" || fechaDada.toString() == 'Invalid Date' || fechaDada.getFullYear() < fechaDeHoy.getFullYear() - 18) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo fecha de nacimiento es erroneo"));
        document.getElementById("problemas").appendChild(error);
    }

    //Validacion del email
    if (!(/^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/.test(email))) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo email es erroneo"));
        document.getElementById("problemas").appendChild(error);
    }

    //Validacion del telefono
    if (!(/^[0-9]{9}$/.test(telefono))) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo telefono es erroneo"));
        document.getElementById("problemas").appendChild(error);
    }

    //Eleccion de sala, que tiene que estar seleccionado si o si nos guste o no
    if (eleccionSala != 1 || eleccionSala != 2) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("Debes seleccionar un tipo de sala"));
        document.getElementById("problemas").appendChild(error);
    }
    else {
        //Sala de ensayo
        if (eleccionSala == 1) {
            //Sala en si
            let participantes = document.getElementById("participantesSal");
            let fechaReserva = document.getElementById("fechaReservaSal").value;
            let salaReservada = document.getElementById("sala").value;

            if (salaReservada < 0 || salaReservada > 3) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Debes seleccionar la sala que quieres reservar"));
                document.getElementById("problemas").appendChild(error);
            }
            else {
                //Como no tenemos base de datos, estas cosas van fijas ahora mismo. Cuando tengamos una esto hay que tocarlo para que sea dinamica con el servidor
                if (salaReservada == 1) {
                    if (participantes > 10 || participantes < 1) {
                        bien = false;
                        let error = document.createElement("p");
                        error.appendChild(document.createTextNode("Aforo incorrecto para esta sala"));
                        document.getElementById("problemas").appendChild(error);
                    }
                }
                else {
                    if (salaReservada == 2) {
                        if (participantes > 8 || participantes < 1) {
                            bien = false;
                            let error = document.createElement("p");
                            error.appendChild(document.createTextNode("Aforo incorrecto para esta sala"));
                            document.getElementById("problemas").appendChild(error);
                        }
                    }
                    else {
                        if (participantes > 15 || participantes < 1) {
                            bien = false;
                            let error = document.createElement("p");
                            error.appendChild(document.createTextNode("Aforo incorrecto para esta sala"));
                            document.getElementById("problemas").appendChild(error);
                        }
                    }
                }
            }

            let fechaR = new Date(fechaReserva);
            if (fechaReserva == "" || fechaR.toString() == 'Invalid Date' || fechaR < fechaDeHoy) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Fecha de reserva incorrecta"));
                document.getElementById("problemas").appendChild(error);
            }

            if (horasSala.length > 3 || horasSala.length < 1) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("No puedes seleccionar mas de 3 horas"));
                document.getElementById("problemas").appendChild(error);
            }
            else {
                horasSala.sort();
                if (!horasSala.every(Consecutivos)) {
                    bien = false;
                    let error = document.createElement("p");
                    error.appendChild(document.createTextNode("Seleccione el tramo horario de forma correcta"));
                    document.getElementById("problemas").appendChild(error);
                }
            }
        }
        //Estudio de grabación
        else {

        }
    }

    return bien;
}

//Funcion que añade o borra la hora a la sala, controlando el maximo y tal
function HoraASala(hora) {
    if (horasSala.find(hora) == undefined) {
        horasSala.push(hora);
    }
    else {
        horasSala.splice(horasSala.indexOf(hora), 1);
    }
}

//Funcion que añade o borra la hora al estudio, controlando el maximo y tal
function HoraAEstudio(hora) {
    if (horasEstudio.find(hora) == undefined) {
        horasEstudio.push(hora);
    }
    else {
        horasEstudio.splice(horasEstudio.indexOf(hora), 1);
    }
}


//Comprobacion para las horas
function Consecutivos(valor, indice, array) {
    if (indice == 0) return true;
    else return (valor == array[indice - 1]);
}