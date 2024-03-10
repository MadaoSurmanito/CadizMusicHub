//Todo lo relacionado con el JavaScript que tiene que ver con el formulario de reserva de salas
let horasSala = [];
let horasEstudio = [];

document.addEventListener("DOMContentLoaded", function () {
    //Que se muestre un formulario o otro dependiendo del tipo de sala :)
    let seleccionSala = document.getElementById("tipoEs");
    seleccionSala.addEventListener("change", function (event) {
        let salasEnsayo = document.getElementsByClassName("SalaEnsayo");
        let estudioGrabacion = document.getElementsByClassName("Grabacion");
        // 0 = nada
        if (event.target.value == 0) {
            for (let i = 0; i < salasEnsayo.length; i++) {
                salasEnsayo[i].style.display = "none";
            }
            for (let i = 0; i < estudioGrabacion.length; i++) {
                estudioGrabacion[i].style.display = "none";
            }
        }
        // 1 = sala de ensayo
        else if (event.target.value == 1) {
            for (let i = 0; i < salasEnsayo.length; i++) {
                salasEnsayo[i].style.display = "flex";
            }
            for (let i = 0; i < estudioGrabacion.length; i++) {
                estudioGrabacion[i].style.display = "none";
            }
        }
        // 2 = estudio de grabacion
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
    if (ev.target.matches(".SalaEnsayo td>button")) HoraASala(ev.target);
    if (ev.target.matches(".Grabacion td>button")) HoraAEstudio(ev.target);
});

//Actualizaciones de los precios en los textos del formulario
document.addEventListener("change", ev => {
    if (ev.target.matches("#sala")) PrecioSala(ev.target.value);
});
document.addEventListener("change", ev => {
    if (ev.target.matches("#estudio")) PrecioEstudio(ev.target.value);
});
document.addEventListener("change", ev => {
    if (ev.target.matches("#tecnico")) PrecioTotalEstudio(ev.target.value);
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
    let eleccionSala = document.getElementById("tipoEs");

    // Quitamos los errores de algun envio anterior y los colores de los campos
    let errores = document.querySelectorAll("#problemas>p");
    let nErrores = errores.length;
    let inputs = document.querySelectorAll("form input");
    for (let i = 0; i < nErrores; i++) errores[i].parentNode.removeChild(errores[i]);
    for (let i = 0; i < inputs.length - 1; i++) inputs[i].style.backgroundColor = "#d9d9d9";

    //Validacion del nombre
    if (!(/^[a-zA-Z]+$/.test(nombre.value))) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo nombre es erroneo"));
        document.getElementById("problemas").appendChild(error);
        nombre.style.backgroundColor = "#fa7268";
    }

    //Validacion de los apellidos
    if (!(/^[a-zA-z]+( [a-zA-z]+)*$/.test(apellidos.value))) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo apellidos es erroneo"));
        document.getElementById("problemas").appendChild(error);
        apellidos.style.backgroundColor = "#fa7268";
    }

    //Validacion de la fecha de nacimiento
    let fechaDeHoy = new Date();
    let fechaDada = new Date(fechaNac.value);
    if (fechaNac.value == "" || fechaDada.toString() == 'Invalid Date' || fechaDada.getFullYear() > fechaDeHoy.getFullYear() - 18) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo fecha de nacimiento es erroneo"));
        document.getElementById("problemas").appendChild(error);
        fechaNac.style.backgroundColor = "#fa7268";
    }

    //Validacion del email
    if (!(/[a-zA-Z0-9]+@[a-z]+\.[a-z]+/.test(email.value))) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo email es erroneo"));
        document.getElementById("problemas").appendChild(error);
        email.style.backgroundColor = "#fa7268";
    }

    //Validacion del telefono
    if (!(/^[0-9]{9}$/.test(telefono.value))) {
        bien = false;
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("El campo telefono es erroneo"));
        document.getElementById("problemas").appendChild(error);
        telefono.style.backgroundColor = "#fa7268";
    }

    //Eleccion de sala, que tiene que estar seleccionado si o si nos guste o no
    if (eleccionSala.value < 1 || eleccionSala.value > 2) {
        bien = false;
        // Si no se ha seleccionado nada, se añade un error
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("Debes seleccionar un tipo de sala"));
        document.getElementById("problemas").appendChild(error);
        eleccionSala.style.backgroundColor = "#fa7268";
    }
    else {
        //Validacion para Sala de ensayo
        if (eleccionSala.value == 1) {
            let participantes = document.getElementById("participantesSal");
            let fechaReserva = document.getElementById("fechaReservaSal");
            let salaReservada = document.getElementById("sala");

            // Si no se ha seleccionado ninguna sala, se añade un error
            if (salaReservada.value <= 0 || salaReservada.value > 3) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Debes seleccionar la sala que quieres reservar"));
                document.getElementById("problemas").appendChild(error);
                salaReservada.style.backgroundColor = "#fa7268";
            }
            else {
                //Como no tenemos base de datos, estas cosas van fijas ahora mismo.
                // Cuando tengamos una esto hay que tocarlo para que sea dinamica con el servidor
                // Si la sala es la 1
                if (salaReservada.value == 1) {
                    if (participantes.value > 10 || participantes.value < 1) {
                        bien = false;
                        let error = document.createElement("p");
                        error.appendChild(document.createTextNode("Aforo incorrecto para esta sala"));
                        document.getElementById("problemas").appendChild(error);
                        participantes.style.backgroundColor = "#fa7268";
                    }
                }
                // Si la sala es la 2
                else if (salaReservada.value == 2) {
                    if (participantes.value > 8 || participantes.value < 1) {
                        bien = false;
                        let error = document.createElement("p");
                        error.appendChild(document.createTextNode("Aforo incorrecto para esta sala"));
                        document.getElementById("problemas").appendChild(error);
                        participantes.style.backgroundColor = "#fa7268";
                    }
                }
                // Si la sala es la 3
                else {
                    if (participantes.value > 15 || participantes.value < 1) {
                        bien = false;
                        let error = document.createElement("p");
                        error.appendChild(document.createTextNode("Aforo incorrecto para esta sala"));
                        document.getElementById("problemas").appendChild(error);
                        participantes.style.backgroundColor = "#fa7268";

                    }
                }
            }
            // Comprobamos la fecha de reserva
            let fechaR = new Date(fechaReserva.value);
            if (fechaR.getDay() == fechaDeHoy.getDay() && fechaR.getMonth() == fechaDeHoy.getMonth() && fechaR.getFullYear() == fechaDeHoy.getFullYear()) fechaR = fechaDeHoy;
            if (fechaReserva.value == "" || fechaR.toString() == 'Invalid Date' || fechaR < fechaDeHoy) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Fecha de reserva incorrecta"));
                document.getElementById("problemas").appendChild(error);
                fechaReserva.style.backgroundColor = "#fa7268";
            }
            // Comprobamos las horas de reserva
            // Si no se ha seleccionado ninguna hora o se han seleccionado mas de 3
            // De normal, un usuario no podria seleccionar mas de 3 horas ya que la bloqueamos
            // Sin embargo, esto es un control de seguridad por si alguien intenta modificar el HTML
            if (horasSala.length > 3 || horasSala.length < 1) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Debes seleccionar al menos 1 hora"));
                document.getElementById("problemas").appendChild(error);
            }
            // Comprobamos que las horas de reserva sean consecutivas
            else {
                horasSala.sort();
                if (!horasSala.every(Consecutivos)) {
                    bien = false;
                    let error = document.createElement("p");
                    error.appendChild(document.createTextNode("El tramo horario debe ser consecutivo"));
                    document.getElementById("problemas").appendChild(error);
                }

                if (horasSala[0] <= fechaR.getHours()) {
                    bien = false;
                    let error = document.createElement("p");
                    error.appendChild(document.createTextNode("Tienes que reservar un tramo posible"));
                    document.getElementById("problemas").appendChild(error);
                }
            }

            //Por si acaso, vamos a asegurarnos de que el precio total no lo modificaron antes de tiempo o algo
            PrecioTotalSala();
        }
        //Estudio de grabación
        else {
            let participantes = document.getElementById("participantesEs");
            let fechaReserva = document.getElementById("fechaReservaEs");
            let salaReservada = document.getElementById("estudio");
            // Si no se ha seleccionado ningun estudio, se añade un error
            if (salaReservada.value <= 0 || salaReservada.value > 3) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Debes seleccionar el estudio que quieres reservar"));
                document.getElementById("problemas").appendChild(error);
                salaReservada.style.backgroundColor = "#fa7268";
            }
            else {
                //Como no tenemos base de datos, estas cosas van fijas ahora mismo. Cuando tengamos una esto hay que tocarlo para que sea dinamica con el servidor
                // Si el estudio es el 1
                if (salaReservada.value == 1) {
                    if (participantes.value > 5 || participantes.value < 1) {
                        bien = false;
                        let error = document.createElement("p");
                        error.appendChild(document.createTextNode("Aforo incorrecto para este estudio"));
                        document.getElementById("problemas").appendChild(error);
                        participantes.style.backgroundColor = "#fa7268";
                    }
                }
                // Si el estudio es el 2
                else if (salaReservada.value == 2) {
                    if (participantes.value > 10 || participantes.value < 1) {
                        bien = false;
                        let error = document.createElement("p");
                        error.appendChild(document.createTextNode("Aforo incorrecto para este estudio"));
                        document.getElementById("problemas").appendChild(error);
                        participantes.style.backgroundColor = "#fa7268";
                    }
                }
                // Si el estudio es el 3
                else {
                    if (participantes.value > 2 || participantes.value < 1) {
                        bien = false;
                        let error = document.createElement("p");
                        error.appendChild(document.createTextNode("Aforo incorrecto para este estudio"));
                        document.getElementById("problemas").appendChild(error);
                        participantes.style.backgroundColor = "#fa7268";

                    }
                }
            }
            // Comprobamos la fecha de reserva
            let fechaR = new Date(fechaReserva.value);
            if (fechaR.getDay() == fechaDeHoy.getDay() && fechaR.getMonth() == fechaDeHoy.getMonth() && fechaR.getFullYear() == fechaDeHoy.getFullYear()) fechaR = fechaDeHoy;
            if (fechaReserva.value == "" || fechaR.toString() == 'Invalid Date' || fechaR < fechaDeHoy) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Fecha de reserva incorrecta"));
                document.getElementById("problemas").appendChild(error);
                fechaReserva.style.backgroundColor = "#fa7268";
            }
            // Comprobamos las horas de reserva
            // Si no se ha seleccionado ninguna hora o se han seleccionado mas de 3
            // De normal, un usuario no podria seleccionar mas de 3 horas ya que la bloqueamos
            // Sin embargo, esto es un control de seguridad por si alguien intenta modificar el HTML
            if (horasSala.length > 3 || horasSala.length < 1) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Debes seleccionar al menos 1 hora"));
                document.getElementById("problemas").appendChild(error);
            }
            // Comprobamos que las horas de reserva sean consecutivas
            else {
                horasSala.sort();
                if (!horasSala.every(Consecutivos)) {
                    bien = false;
                    let error = document.createElement("p");
                    error.appendChild(document.createTextNode("El tramo horario debe ser consecutivo"));
                    document.getElementById("problemas").appendChild(error);
                }

                if (horasEstudio[0] <= fechaR.getHours()) {
                    bien = false;
                    let error = document.createElement("p");
                    error.appendChild(document.createTextNode("Tienes que reservar un tramo posible"));
                    document.getElementById("problemas").appendChild(error);
                }
            }

            //Por si acaso, vamos a asegurarnos de que el precio total no lo modificaron antes de tiempo o algo
            PrecioTotalEstudio();
        }
    }
    console.log(document.getElementById("precioTotal").value);
    return bien;
}

//Funcion que añade o borra la hora a la sala, controlando el maximo
function HoraASala(elementoHora) {
    let hora = parseInt(elementoHora.value);
    // Si la hora no esta en el array, la añadimos
    if (horasSala.indexOf(hora) == undefined || horasSala.indexOf(hora) == -1) {
        // Si no se han seleccionado 3 horas, la añadimos
        if (horasSala.length < 3) {
            horasSala.push(hora);
            horasSala.sort();
            // Si las horas son consecutivas, las marcamos
            if (horasSala.every(Consecutivos)) {
                elementoHora.style.backgroundColor = "green";
                elementoHora.style.color = "#f0f0f0";
            }
            // Si no, la borramos
            else {
                horasSala.splice(horasSala.indexOf(hora), 1);
            }
        }
    }
    // Si la hora esta en el array, la borramos
    else {
        horasSala.splice(horasSala.indexOf(hora), 1);
        elementoHora.removeAttribute("style");
    }

    PrecioTotalSala(); //Actualizar el precio total de las salas
}

//Funcion que añade o borra la hora al estudio, controlando el maximo y tal
function HoraAEstudio(elementoHora) {
    let hora = parseInt(elementoHora.value);
    //  Si la hora no esta en el array, la añadimos
    if (horasEstudio.indexOf(hora) == undefined || horasEstudio.indexOf(hora) == -1) {
        // Si no se han seleccionado 3 horas, la añadimos
        if (horasEstudio.length < 3) {
            horasEstudio.push(hora);
            horasEstudio.sort();
            // Si las horas son consecutivas, las marcamos
            if (horasEstudio.every(Consecutivos)) {
                elementoHora.style.backgroundColor = "green";
                elementoHora.style.color = "#f0f0f0";
            }
            // Si no, la borramos
            else {
                horasEstudio.splice(horasEstudio.indexOf(hora), 1);
            }
        }
    }
    // Si la hora esta en el array, la borramos
    else {
        horasEstudio.splice(horasEstudio.indexOf(hora), 1);
        elementoHora.removeAttribute("style");
    }

    PrecioTotalEstudio(); //Actualizar el precio total para el estudio
}


//Comprobacion para las horas
function Consecutivos(valor, indice, array) {
    if (indice == 0) return true;
    else return (parseInt(valor) == parseInt(array[indice - 1]) + 1);
}

//Funcion de los precios de las salas
function PrecioSala(sala) {
    if (sala == 0) document.getElementById("CosteSala").innerHTML = "Coste de esta sala: 0 €/h";
    if (sala == 1) document.getElementById("CosteSala").innerHTML = "Coste de esta sala: 3 €/h";
    if (sala == 2) document.getElementById("CosteSala").innerHTML = "Coste de esta sala: 12 €/h";
    if (sala == 3) document.getElementById("CosteSala").innerHTML = "Coste de esta sala: 3 €/h";

    PrecioTotalSala();
}
// Funcion para el precio total de la sala
function PrecioTotalSala() {
    let sala = document.getElementById("sala").value;
    let precioTotal = 0;
    if (horasSala.length == 0 || sala == 0) precioTotal = 0;
    else {
        if (sala == 1) precioTotal = horasSala.length * 3;
        if (sala == 2) precioTotal = horasSala.length * 12;
        if (sala == 3) precioTotal = horasSala.length * 3;
    }

    document.getElementById("CosteTotalSala").innerHTML = "Coste total: " + precioTotal + " €";
    document.getElementById("precioTotal").value = precioTotal;
}

//Funcion de los precios de cada estudio
function PrecioEstudio(estudio) {
    if (estudio == 0) document.getElementById("CosteEstudio").innerHTML = "Coste de esta sala: 0 €/h";
    if (estudio == 1) document.getElementById("CosteEstudio").innerHTML = "Coste de esta sala: 15 €/h";
    if (estudio == 2) document.getElementById("CosteEstudio").innerHTML = "Coste de esta sala: 20 €/h";
    if (estudio == 3) document.getElementById("CosteEstudio").innerHTML = "Coste de esta sala: 10 €/h";

    PrecioTotalEstudio();
}

// Funcion para el precio total del estudio
function PrecioTotalEstudio() {
    let estudio = document.getElementById("estudio").value;
    let asesor = document.getElementById("tecnico");
    let precioTotal = 0;
    if (horasEstudio.length == 0 || estudio == 0) precioTotal = 0;
    else {
        if (estudio == 1) precioTotal = horasEstudio.length * 10;
        if (estudio == 2) precioTotal = horasEstudio.length * 20;
        if (estudio == 3) precioTotal = horasEstudio.length * 15;
    }
    if (asesor.checked == true) precioTotal += 20;

    document.getElementById("CosteTotalEstudio").innerHTML = "Coste total: " + precioTotal + " €";
    document.getElementById("precioTotal").value = precioTotal;
}