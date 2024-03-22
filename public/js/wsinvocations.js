document.addEventListener("click", ev => {
  if (ev.target.matches("#salasEnsayo .botonActualizar")) updateReserva(ev.target, 1);
  if (ev.target.matches("#estudiosGrabacion .botonActualizar")) updateReserva(ev.target, 2);
});

function getReserva() {
  let email = document.getElementById('emailGetReserva').value;
  let myUrl = '/Reservas/' + email
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: myUrl,
    success: function (data) {
        MostrarDatosSalas(data);
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
        MostrarDatosSalas(data);
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

function mostrarReservaUsuario()
{
  let div = '<div><p>Introduce el email del cuál quieres sacar las reservas</p><input type="text" id="emailGetReserva"><input type="button" value="Obtener Reservas" onclick="getReserva()"></div>';
  $('#resReserva').html(div);
}

function MostrarDatosSalas(data)
{
  let res = ''
      // Si no hay reservas
      res += '<h2>Reservas Salas de Ensayo</h2>'
      res += '<table id="salasEnsayo" border="1">'
      res +=
        '<tr><th>Borrar</th><th>Actualizar</th><th>Nombre</th><th>Apellidos</th><th>Fecha de nacimiento</th><th>Email</th><th>Teléfono</th><th>Participantes</th><th>Fecha de reserva</th><th>Sala</th><th>Tramo horario</th><th>Nombre artístico</th><th>Género</th><th>Instagram</th><th>Spotify</th><th>Precio total</th></tr>'
      let i = 0

      while (i < data.length && data[i].tipoSala == 1) {
        res += '<tr>'
        // Borrar reserva
        res +=
          '<td><button onclick="deleteReserva(\'' +
          data[i]._id +
          '\')">Borrar</button></td>'
        res += '<td><button class="botonActualizar">Actualizar</button></td>'
        res += '<td hidden><input type="hidden" value="' + data[i]._id + '"></td>' 
        res += '<td><input type="text" value="' + data[i].nombre + '"></td>' 
        res += '<td><input type="text" value="' + data[i].apellidos + '"></td>'
        res += '<td><input type="text" value="' + data[i].fechaNac + '"></td>'
        res += '<td><input type="text" value="' + data[i].email + '"></td>'
        res += '<td><input type="text" value="' + data[i].telefono + '"></td>'
        res += '<td><input type="text" value="' + data[i].participantes + '"></td>'
        res += '<td><input type="text" value="' + data[i].fechaReserva + '"></td>'
        res += '<td><input type="text" value="' + data[i].sala + '"></td>'
        res += '<td><input type="text" value="' + data[i].tramoHorario + '"></td>'
        res += '<td><input type="text" value="' + data[i].datosArtisticos.nombreArtistico + '"></td>'
        res += '<td><input type="text" value="' + data[i].datosArtisticos.genero + '"></td>'
        res += '<td><input type="text" value="' + data[i].datosArtisticos.instagram + '"></td>'
        res += '<td><input type="text" value="' + data[i].datosArtisticos.spotify + '"></td>'
        res += '<td><input type="text" value="' + data[i].precioTotal + '"></td>'
        
        
        res += '</tr>'
        i++
      }
      res += '</table>'
      res += '<br>'
      res += '<h2>Reservas Estudios de Grabación</h2>'
      res += '<table id="estudiosGrabacion" border="1">'
      res +=
        '<tr><th>Borrar</th><th>Actualizar</th><th>Nombre</th><th>Apellidos</th><th>Fecha de nacimiento</th><th>Email</th><th>Teléfono</th><th>Participantes</th><th>Fecha de reserva</th><th>Estudio</th><th>Tramo horario</th><th>Técnico</th><th>Precio total</th></tr>'

      while (i < data.length && data[i].tipoSala == 2) {
        res += '<tr>'
        // Borrar reserva
        res +=
          '<td><button onclick="deleteReserva(\'' +
          data[i]._id +
          '\')">Borrar</button></td>'
          res += '<td><button class="botonActualizar">Actualizar</button></td>'
          res += '<td hidden><input type="hidden" value="' + data[i]._id + '"></td>' 
          res += '<td><input type="text" value="' + data[i].nombre + '"></td>' 
          res += '<td><input type="text" value="' + data[i].apellidos + '"></td>'
          res += '<td><input type="text" value="' + data[i].fechaNac + '"></td>'
          res += '<td><input type="text" value="' + data[i].email + '"></td>'
          res += '<td><input type="text" value="' + data[i].telefono + '"></td>'
          res += '<td><input type="text" value="' + data[i].participantes + '"></td>'
          res += '<td><input type="text" value="' + data[i].fechaReserva + '"></td>'
          res += '<td><input type="text" value="' + data[i].estudio + '"></td>'
          res += '<td><input type="text" value="' + data[i].tramoHorario + '"></td>'
          res += '<td><input type="text" value="' + data[i].tecnico + '"></td>'
          res += '<td><input type="text" value="' + data[i].precioTotal + '"></td>'
        res += '</tr>'
        i++
      }
      res += '</table>'
      $('#resReserva').html(res)
}

function updateReserva(target, tipoSala) {
  let datos = target.parentNode.parentNode.children;
  let myUrl = '/Reservas/' + datos[2].children[0].value;
  $.ajax({
    type: 'PUT',
    url: myUrl,
    contentType: 'application/json',
    dataType: 'text',
    data: DatosActualizar(datos, tipoSala),
    success: function (data) {
      let datos = JSON.parse(data)
      $('#resReserva').html(datos.msg)
    },
    error: function (res) {
      alert('ERROR: ' + res.statusText)
    },
  })
}

function DatosActualizar(datos, tipoSala) {
  let reserva = {
    nombre: datos[3].children[0].value,
    apellidos: datos[4].children[0].value,
    fechaNac: datos[5].children[0].value,
    email: datos[6].children[0].value,
    telefono: datos[7].children[0].value,
    participantes: datos[8].children[0].value,
    fechaReserva: datos[9].children[0].value
  }

  if(tipoSala == 1)
  {
    reserva.sala = datos[10].children[0].value;
    reserva.tramoHorario = datos[11].children[0].value;
    reserva.datosArtisticos = {
      nombreArtistico: datos[12].children[0].value,
      genero: datos[13].children[0].value,
      instagram: datos[14].children[0].value,
      spotify: datos[15].children[0].value,
    }
    reserva.precioTotal = datos[16].children[0].value;
  }
  else
  {
    reserva.estudio = datos[10].children[0].value;
    reserva.tramoHorario = datos[11].children[0].value;
    reserva.tecnico = datos[12].children[0].value;
    reserva.precioTotal = datos[13].children[0].value;
  }

  return JSON.stringify(reserva)
}