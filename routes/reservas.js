'use strict';

const express = require('express');
const router = express.Router();

let reservas = [
    {
        "id": "1",
        "Nombre": "Juan",
        "Apellidos": "Perez",
        "Fecha de Nacimiento": "01/01/1990",
        "Correo electrónico": "juan@correo.com",
        "Telefono": 123456789,
        "nº participantes sala": 2,
        "Fecha de reserva": "02/03/2024",
        "Sala": "Sala 1",
        "tramo horario": [10, 11, 12],
        "Nombre artista/banda": "Juanito",
        "Género musical": "Rock",
        "Cuenta de instagram": "@juanito",
        "Perfil de Spotify": "juanito"
    },
    {
        "id": "2",
        "Nombre": "Ana",
        "Apellidos": "Lopez",
        "Fecha de Nacimiento": "02/02/1991",
        "Correo electrónico": "ana@correo.com",
        "Telefono": 987654321,
        "n participantes estudio": 2,
        "Fecha de reserva": "02/03/2024",
        "Estudio": "Estudio 1",
        "tramo horario": [10, 11, 12],
        "tecnico": true
    }
];


//localhost:8080/reservas
router.get('/', function (req, res) {
	res.status(200).send(reservas);
});

router.post('/', function (req, res) {
    reservas.push(req.body);
    res.status(201).send("reserva created!");
});

router.delete('/', function (req, res) {
    reservas = [];
    res.status(200).send("reservas deleted!");
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    res.status(200).send(reservas.filter(m => m.id === id));
});

router.put('/:id', function (req, res) {
    let id = req.params.id;
    let index = reservas.findIndex(m => m.id === id);
    if (index === -1) {
        res.status(404).send("reserva not found!");
    }
    else {
        reservas.splice(index, 1);
        reservas.push(req.body);
        res.status(200).send("reserva updated!");
    }
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    let index = reservas.findIndex(m => m.id === id);
    if (index === -1) {
        res.status(404).send("reserva not found!");
    }
    else {
        reservas = reservas.filter(m => m.id !== id);
        res.status(200).send("reserva deleted!");
    }
});

module.exports = router;
