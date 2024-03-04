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
    if (ev.target.matches(".SalaEnsayo td>button")) HoraASala(ev.target);
    if (ev.target.matches(".Grabacion td>button")) HoraAEstudio(ev.target);
});

//Actualizaciones de los precios en los textos del formulario
document.addEventListener("change", ev => {
    if(ev.target.matches("#sala")) PrecioSala(ev.target.value);
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
    let eleccionSala = document.getElementById("tipoEs");

    //Eliminar todos los fallos que se generan ya que se pudo reenviar el formulario en verdad
    let errores = document.querySelectorAll("#problemas>p");
    let nErrores = errores.length;
    let inputs = document.querySelectorAll("form input");
    for(let i = 0; i < nErrores; i++) errores[i].parentNode.removeChild(errores[i]);
    for(let i = 0; i < inputs.length-1; i++) inputs[i].style.backgroundColor = "#d9d9d9";

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
        let error = document.createElement("p");
        error.appendChild(document.createTextNode("Debes seleccionar un tipo de sala"));
        document.getElementById("problemas").appendChild(error);
        eleccionSala.style.backgroundColor = "#fa7268";
    }
    else {
        //Sala de ensayo
        if (eleccionSala.value == 1) {
            //Sala en si
            let participantes = document.getElementById("participantesSal");
            let fechaReserva = document.getElementById("fechaReservaSal");
            let salaReservada = document.getElementById("sala");

            if (salaReservada.value < 0 || salaReservada.value > 3) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Debes seleccionar la sala que quieres reservar"));
                document.getElementById("problemas").appendChild(error);
                salaReservada.style.backgroundColor = "#fa7268";
            }
            else {
                //Como no tenemos base de datos, estas cosas van fijas ahora mismo. Cuando tengamos una esto hay que tocarlo para que sea dinamica con el servidor
                if (salaReservada.value == 1) {
                    if (participantes.value > 10 || participantes.value < 1) {
                        bien = false;
                        let error = document.createElement("p");
                        error.appendChild(document.createTextNode("Aforo incorrecto para esta sala"));
                        document.getElementById("problemas").appendChild(error);
                        participantes.style.backgroundColor = "#fa7268";
                    }
                }
                else {
                    if (salaReservada.value == 2) {
                        if (participantes.value > 8 || participantes.value < 1) {
                            bien = false;
                            let error = document.createElement("p");
                            error.appendChild(document.createTextNode("Aforo incorrecto para esta sala"));
                            document.getElementById("problemas").appendChild(error);
                            participantes.style.backgroundColor = "#fa7268";
                        }
                    }
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
            }

            let fechaR = new Date(fechaReserva.value);
            if (fechaReserva.value == "" || fechaR.toString() == 'Invalid Date' || fechaR < fechaDeHoy) {
                bien = false;
                let error = document.createElement("p");
                error.appendChild(document.createTextNode("Fecha de reserva incorrecta"));
                document.getElementById("problemas").appendChild(error);
                fechaReserva.style.backgroundColor = "#fa7268";
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
function HoraASala(elementoHora) {
    let hora = parseInt(elementoHora.value);
    if (horasSala.indexOf(hora) == undefined || horasSala.indexOf(hora) == -1) {
        horasSala.push(hora);
        elementoHora.style.backgroundColor = "green";
        elementoHora.style.color = "#f0f0f0";
    }
    else {
        horasSala.splice(horasSala.indexOf(hora), 1);
        elementoHora.style.backgroundColor = "#f0f0f0";
        elementoHora.style.color = "black";
    }

    PrecioTotalSala(); //Actualizar el precio total de las salas
}

//Funcion que añade o borra la hora al estudio, controlando el maximo y tal
function HoraAEstudio(hora) {
    if (horasEstudio.indexOf(hora) == undefined || horasSala.indexOf(hora) == -1) {
        horasEstudio.push(hora);
    }
    else {
        horasEstudio.splice(horasEstudio.indexOf(hora), 1);
    }
}


//Comprobacion para las horas
function Consecutivos(valor, indice, array) {
    if (indice == 0) return true;
    else return (parseInt(valor) == parseInt(array[indice - 1]) + 1);
}

//Funcion de los precios de las salas
function PrecioSala(sala)
{
    if(sala == 0) document.getElementById("CosteSala").innerHTML = "Coste de esta sala: 0 €/h";
    if(sala == 1) document.getElementById("CosteSala").innerHTML = "Coste de esta sala: 3 €/h";
    if(sala == 2) document.getElementById("CosteSala").innerHTML = "Coste de esta sala: 12 €/h";
    if(sala == 3) document.getElementById("CosteSala").innerHTML = "Coste de esta sala: 3 €/h";
    
    PrecioTotalSala();
}

function PrecioTotalSala()
{
    let sala = document.getElementById("sala").value;
    if(horasSala.length == 0 || sala == 0) document.getElementById("CosteTotalSala").innerHTML = "Coste total: 0 €";
    else
    {
        if(sala == 1) document.getElementById("CosteTotalSala").innerHTML = "Coste total: "+horasSala.length*3+" €";
        if(sala == 2) document.getElementById("CosteTotalSala").innerHTML = "Coste total: "+horasSala.length*12+" €";
        if(sala == 3) document.getElementById("CosteTotalSala").innerHTML = "Coste total: "+horasSala.length*3+" €";
    }
}