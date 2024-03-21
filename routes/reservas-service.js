'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;
const Reservas = function () {
};

Reservas.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://alejandrosanzhuerta:FEC63469FE850FD16C03C7763D2B84A6@ash-pnet-2023-2024.rkdqjy6.mongodb.net/?retryWrites=true&w=majority&appName=ash-pnet-2023-2024",
        function (err, database) {
            if (err) {
				console.log(err);
				callback(err);
            }

			db = database.db('ash-pnet-2023-2024').collection('reservas');
			console.log("Conexión correcta");

            callback(err, database);
        });
};

Reservas.prototype.add = function (movie, callback) {
    return db.insertOne(movie, callback);
};

Reservas.prototype.get = function (_id, callback) {
    return db.find({_id: ObjectId(_id)}).toArray(callback);
};

Reservas.prototype.getAll = function (callback) {
    return db.find({}).toArray(callback);
};

Reservas.prototype.update = function (_id, updatedMovie, callback) {
    delete updatedMovie._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedMovie}, callback);};

Reservas.prototype.remove = function (_id, callback) {
    return db.deleteOne({_id: ObjectId(_id)}, callback);
};

Reservas.prototype.removeAll = function (callback) {
    return db.deleteMany({}, callback);
};

module.exports = new Reservas();


