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

const baseDeDatos = require('./routes/reservas-service');
const reservasAPI = require('./routes/reservas');
app.use('/reservas', reservasAPI);
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

baseDeDatos.connectDb(function (err) {
     if (err) {
         console.log('Oh no! Parece que ha ocurrido un error al conectar con la base de datos.');
         process.exit(1);
     }

     server.listen(PORT, function () {
         console.log('Todo listo, servidor levantado en ' + PORT);
     });
 });