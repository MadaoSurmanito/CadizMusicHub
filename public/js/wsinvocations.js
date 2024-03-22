function getReserva(ReservaId) {
  let myUrl = '/Reservas/' + ReservaId
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: myUrl,
    success: function (data) {
      $('#resReserva').html(JSON.stringify(data[0]))
    },
    error: function (res) {
      let mensaje = JSON.parse(res.responseText)
      alert('ERROR: ' + mensaje.msg)
    },
  })
}

function postReserva() {
  $.ajax({
    type: 'POST',
    url: '/Reservas',
    contentType: 'application/json',
    dataType: 'text',
    data: JSON.stringify({
      title: 'Dunkirk',
      director: 'Christopher Nolan',
      year: 2017,
    }),
    // data: JSON.stringify({
    //     "title": "The Lion King",
    //     "director": "Cristian Nolan",
    //     "year": 2001
    // }),
    success: function (data) {
      let datos = JSON.parse(data)
      $('#resReserva').html(datos.msg)
    },
    error: function (res) {
      alert('ERROR: ' + res.statusText)
    },
  })
}

function getAllReservas() {
  let myUrl = '/Reservas'
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: myUrl,
    success: function (data) {
      // Hacer que se vea mejor
      // Genera 2 tablas, uno con datos de las salas de ensayo y otro con datos de los estudios de grabación
      // Formato del JSON de reserva de sala de ensayo:
      // {"_id":"65fd6801f8d136a42cc68f76","nombre":"Alejandro","apellidos":"Sanz Huerta","fechaNac":"2001-07-20","email":"ash.fuertecortadura@gmail.com","telefono":"603480001","tipoSala":"1","participantes":"2","fechaReserva":"2025-01-20","sala":"2","tramoHorario":["10","11","12"],"datosArtisticos":{"nombreArtistico":"ODISEA","genero":"Metal","instagram":"","spotify":""},"precioTotal":"36"}]
      // Formato del JSON de reserva de estudio de grabación:
      // {"_id":"65fd67fde21dfda18720dca0","nombre":"Alejandro","apellidos":"Ramos Rodriguez","fechaNac":"0098-06-16","email":"alejandro@probandocosas.esi","telefono":"555555555","tipoSala":"2","participantes":"5","fechaReserva":"2024-03-31","estudio":"2","tramoHorario":["13","14","15"],"tecnico":"true","precioTotal":"80"},
      // Ordename el JSON poniendo primero los que tengan tipoSala 1 y luego los que tengan tipoSala 2
      // En cada tabla, añade una fila con el total de reservas y el total de precio de todas las reservas
      
      $('#resReserva').html(res)
    },
    error: function (res) {
      console.error('ERROR:', res.status, res.statusText)
    },
  })
}

function deleteReserva(ReservaId) {
  let myUrl = '/Reservas/' + ReservaId
  $.ajax({
    type: 'DELETE',
    dataType: 'json',
    url: myUrl,
    success: function (data) {
      $('#resReserva').html(data.msg)
    },
    error: function (res) {
      alert('ERROR: ' + res.statusText)
    },
  })
}
function deleteAllReservas() {
  $.ajax({
    type: 'DELETE',
    url: '/Reservas',
    success: function (data) {
      $('#resReserva').html(data)
    },
    error: function (res) {
      alert('ERROR: ' + res.statusText)
    },
  })
}
