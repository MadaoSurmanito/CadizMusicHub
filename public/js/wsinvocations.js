function getReserva() {
  let email = document.getElementById('emailGetReserva').value;
  let myUrl = '/Reservas/' + email
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

function postReserva1() {
  $.ajax({
    type: 'POST',
    url: '/Reservas',
    contentType: 'application/json',
    dataType: 'text',
    data: JSON.stringify({
      // Reserva de salas de ejemplo (tipoSala 1)
      nombre: 'Alejandro',
      apellidos: 'Sanz Huerta',
      fechaNac: '2001-07-20',
      email: 'alexsanhue@gmail.com',
      telefono: '603480001',
      tipoSala: '1',
      participantes: '2',
      fechaReserva: '2025-01-20',
      sala: '2',
      tramoHorario: ['10', '11', '12'],
      datosArtisticos: {
        nombreArtistico: 'ODISEA',
        genero: 'Metal',
        instagram: '',
        spotify: '',
      },
      precioTotal: '36',
    }),
    success: function (data) {
      let datos = JSON.parse(data)
      $('#resReserva').html(datos.msg)
    },
    error: function (res) {
      alert('ERROR: ' + res.statusText)
    },
  })
}
function postReserva2() {
  $.ajax({
    type: 'POST',
    url: '/Reservas',
    contentType: 'application/json',
    dataType: 'text',
    data: JSON.stringify({
      // Reserva de estudios de grabación (tipoSala 2)
      nombre: 'Alejandro',
      apellidos: 'Ramos Rodriguez',
      fechaNac: '0098-06-16',
      email: 'alejandro@probandocosas.esi',
      telefono: '555555555',
      tipoSala: '2',
      participantes: '5',
      fechaReserva: '2024-03-31',
      estudio: '2',
      tramoHorario: ['13', '14', '15'],
      tecnico: 'true',
      precioTotal: '80',
    }),
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
      let res = ''
      // Si no hay reservas
      res += '<table border="1">'
      res +=
        '<tr><th>Borrar</th><th>Nombre</th><th>Apellidos</th><th>Fecha de nacimiento</th><th>Email</th><th>Teléfono</th><th>Participantes</th><th>Fecha de reserva</th><th>Sala</th><th>Tramo horario</th><th>Nombre artístico</th><th>Género</th><th>Instagram</th><th>Spotify</th><th>Precio total</th></tr>'
      let i = 0

      while (i < data.length && data[i].tipoSala == 1) {
        res += '<tr>'
        // Borrar reserva
        res +=
          '<td><button onclick="deleteReserva(\'' +
          data[i]._id +
          '\')">Borrar</button></td>'
        res += '<td>' + data[i].nombre + '</td>'
        res += '<td>' + data[i].apellidos + '</td>'
        res += '<td>' + data[i].fechaNac + '</td>'
        res += '<td>' + data[i].email + '</td>'
        res += '<td>' + data[i].telefono + '</td>'
        res += '<td>' + data[i].participantes + '</td>'
        res += '<td>' + data[i].fechaReserva + '</td>'
        res += '<td>' + data[i].sala + '</td>'
        res += '<td>' + data[i].tramoHorario + '</td>'
        // Desglomera los datos artísticos
        res += '<td>' + data[i].datosArtisticos.nombreArtistico + '</td>'
        res += '<td>' + data[i].datosArtisticos.genero + '</td>'
        res += '<td>' + data[i].datosArtisticos.instagram + '</td>'
        res += '<td>' + data[i].datosArtisticos.spotify + '</td>'
        res += '<td>' + data[i].precioTotal + '</td>'
        res += '</tr>'
        i++
      }
      res += '</table>'
      res += '<br>'
      res += '<table border="1">'
      res +=
        '<tr><th>Borrar</th><th>Nombre</th><th>Apellidos</th><th>Fecha de nacimiento</th><th>Email</th><th>Teléfono</th><th>Participantes</th><th>Fecha de reserva</th><th>Estudio</th><th>Tramo horario</th><th>Técnico</th><th>Precio total</th></tr>'

      while (i < data.length && data[i].tipoSala == 2) {
        res += '<tr>'
        // Borrar reserva
        res +=
          '<td><button onclick="deleteReserva(\'' +
          data[i]._id +
          '\')">Borrar</button></td>'
        res += '<td>' + data[i].nombre + '</td>'
        res += '<td>' + data[i].apellidos + '</td>'
        res += '<td>' + data[i].fechaNac + '</td>'
        res += '<td>' + data[i].email + '</td>'
        res += '<td>' + data[i].telefono + '</td>'
        res += '<td>' + data[i].participantes + '</td>'
        res += '<td>' + data[i].fechaReserva + '</td>'
        res += '<td>' + data[i].estudio + '</td>'
        res += '<td>' + data[i].tramoHorario + '</td>'
        res += '<td>' + data[i].tecnico + '</td>'
        res += '<td>' + data[i].precioTotal + '</td>'
        res += '</tr>'
        i++
      }
      res += '</table>'
      $('#resReserva').html(res)
    },
    // si da un error 500, es que no hay reservas

    error: function (res) {
      let mensaje = JSON.parse(res.responseText)
      $('#resReserva').html(mensaje.msg)
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
