'use strict';

const express = require('express');
const router = express.Router();

let movies = [
    {
        "title": "Jurassic Park",
        "director": "Steven Spielberg",
        "year": 1993
    },
    {
        "title": "The Lion King",
        "director": ["Rob Minkoff", "Roger Allers"],
        "year": 1994
    }
];


//localhost:8080/movies
router.get('/', function (req, res) {
	res.status(200).send(movies);
});

router.post('/', function (req, res) {
    movies.push(req.body);
    res.status(201).send("Film created!");
});

router.delete('/', function (req, res) {
    movies = [];
    res.status(200).send("Films deleted!");
});

router.get('/:title', function (req, res) {
    let title = req.params.title;
    res.status(200).send(movies.filter(m => m.title === title));
});

router.put('/:title', function (req, res) {
    let title = req.params.title;
    //Dos versiones:
    movies.splice(movies.findIndex(m => m.title === title), 1);
    //movies = movies.findIndex(m => m.title !== title);
    movies.push(req.body);
    res.status(200).send("Film updated!");
});

router.delete('/:title', function (req, res) {
    let title = req.params.title;
    movies = movies.filter(m => m.title !== title);
    res.status(200).send("Film deleted!");
});

module.exports = router;
