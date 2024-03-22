// let reservas = [
//     {
//         "id": "1",
//         "Nombre": "Juan",
//         "Apellidos": "Perez",
//         "Fecha de Nacimiento": "01/01/1990",
//         "Correo electrónico": "juan@correo.com",
//         "Telefono": 123456789,
//         "nº participantes sala": 2,
//         "Fecha de reserva": "02/03/2024",
//         "Sala": "Sala 1",
//         "tramo horario": [10, 11, 12],
//         "Nombre artista/banda": "Juanito",
//         "Género musical": "Rock",
//         "Cuenta de instagram": "@juanito",
//         "Perfil de Spotify": "juanito"
//     },
//     {
//         "id": "2",
//         "Nombre": "Ana",
//         "Apellidos": "Lopez",
//         "Fecha de Nacimiento": "02/02/1991",
//         "Correo electrónico": "ana@correo.com",
//         "Telefono": 987654321,
//         "n participantes estudio": 2,
//         "Fecha de reserva": "02/03/2024",
//         "Estudio": "Estudio 1",
//         "tramo horario": [10, 11, 12],
//         "tecnico": true
//     }
// ];
'use strict';

const express = require('express');
const router = express.Router();
const baseDeDatos = require('./reservas-service');

router.get('/', function (req, res) {
    baseDeDatos.getAll((err, movies) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (movies.length == 0) {
            res.status(500).send({
                msg: "No hay reservas ahora mismo."
            });
        } else {
            res.status(200).send(movies);
        }
    }
    );
});

router.post('/', function (req, res) {
    let movie = req.body;
    if (Object.entries(movie).length === 0) {
        res.status(400).send({
            msg: 'No me diste datos, que esperas que haga?'
        });
    }
    else {
        baseDeDatos.add(movie, (err, movie) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            }
            else {
                res.status(201).send({
                    msg: 'Reserva registrada'
                });
            }
        });
    }
});


router.delete('/', function (req, res) {
    baseDeDatos.removeAll((err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Reservas eliminadas'
            });
        }
    });
});


router.get('/:_id', function (req, res) {
    let _id = req.params._id;
    baseDeDatos.get(_id, (err, movie) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (movie.length == 0) {
            res.status(500).send({
                msg: "Esa reserva no exite sabes?"
            });
        } else {
            res.status(200).send(movie);
        }
    }
    );
});


router.put('/:_id', function (req, res) {
    const _id = req.params._id;
    const updatedMovie = req.body;
    baseDeDatos.update(_id, updatedMovie, (err, numUpdates) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (numUpdates.modifiedCount === 0) {
            res.status(500).send({
                msg: "Algo fue mal, no se pudo actualizar la reserva."
            });
        } else {
            res.status(200).send({
                msg: 'Cambios realizados!'
            });
        }
    });
});


router.delete('/:_id', function (req, res) {
    let _id = req.params._id
    baseDeDatos.remove(_id, (err) => {
        if (err) {
            res.status(500).send({
                msg: err,
            })
        } else {
            res.status(200).send({
                msg: 'Reserva eliminada!',
            })
        }
    })
});

module.exports = router;
