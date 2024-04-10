const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(logger('dev'));

//localhost:8080/
app.get('/', function (req, res) {
	   res.status(200).send('Hello World!');
});

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
app.get('/movies', function (req, res) {
	res.status(200).send(movies);
});

app.post('/movies', function (req, res) {
    movies.push(req.body);
    res.status(201).send("Film created!");
});

app.delete('/movies', function (req, res) {
    movies = [];
    res.status(200).send("Films deleted!");
});

app.get('/movies/:title', function (req, res) {
    let title = req.params.title;
    res.status(200).send(movies.filter(m => m.title === title));
});

app.put('/movies/:title', function (req, res) {
    let title = req.params.title;
    //Dos versiones:
    movies.splice(movies.findIndex(m => m.title === title), 1);
    //movies = movies.findIndex(m => m.title !== title);
    movies.push(req.body);
    res.status(200).send("Film updated!");
});

app.delete('/movies/:title', function (req, res) {
    let title = req.params.title;
    movies = movies.filter(m => m.title !== title);
    res.status(200).send("Film deleted!");
});




const server = http.createServer(app);

server.listen(PORT, function () {
	   console.log('Server up and running on localhost:' + PORT);
});
