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
      // Formato: Película 1: Título: Dunkirk, Director: Christopher Nolan, Año: 2017

      let res = ''
      data.forEach((data) => {
        res +=
          '• Título: ' +
          data.title +
          ', Director: ' +
          data.director +
          ', Año: ' +
          data.year +
          '<br>'
      })
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
