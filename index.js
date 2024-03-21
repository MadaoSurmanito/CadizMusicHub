const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use(cors());

// const reservasService = require('./routes/reservas-service');
const baseDeDatos = require('./routes/reservas-service');
const reservasAPI = require('./routes/reservas');
app.use('/reservas', reservasAPI);
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

baseDeDatos.connectDb(function (err) {
     if (err) {
         console.log('Could not connect with MongoDB – moviesService');
         process.exit(1);
     }

     server.listen(PORT, function () {
         console.log('Server up and running on localhost:' + PORT);
     });
 });