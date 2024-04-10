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

const movies = require('./routes/movies');
app.use('/movies', movies);

const server = http.createServer(app);

server.listen(PORT, function () {
	console.log('Server up and running on localhost:' + PORT);
});
