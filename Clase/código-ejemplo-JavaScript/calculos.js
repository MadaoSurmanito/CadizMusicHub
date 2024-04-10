// COMPLETAR PARA MÉTODO 2: AÑADIR LISTENER
/*document.addEventListener( ... ) */

document.addEventListener('click', disparador => {
	if(disparador.target.matches("#suma")) sumar();
	else if(disparador.target.matches("#Num")) vaciar();
	else if(disparador.target.matches("#igual")) computar();
});

let Acumulador = 0;
let Operador = "";

// Función: vacía la pantalla de la calculadora cuando se hace click en ella.
function vaciar() {
	let n = document.getElementById("Num");
	n.value = "";
}

/* Función: guarda el número que esté en la pantalla de la calculadora cuando
   se pulse el botón de suma */
function sumar() {
	Acumulador = parseFloat(document.getElementById("Num").value);
	Operador = "+";
}

/* Función: calcula la operación seleccionada usando como operandos el acumulador 
   y el valor que hay en la pantalla. Después, muestra el resultado en la pantalla */
function computar() {
	if (Operador === "+") {
		let n = document.getElementById("Num");
		n.value = Acumulador + parseFloat(n.value);
	}
}
