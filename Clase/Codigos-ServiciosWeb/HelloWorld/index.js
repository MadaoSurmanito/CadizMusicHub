const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(logger('dev'));

app.get('/', function (req, res) {
	   res.status(200).send('Hello World!');
});

app.get('/hello', function (req, res) {
	res.status(200).send('HOLA MUNDO!');
});

app.get('/goodbye', function (req, res) {
	res.status(200).send('QUE TE DEN MUNDO!');
});

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

server.listen(PORT, function () {
	console.log('Server up and running on localhost:' + PORT);
});

