//Npm packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');

var Promise = require('bluebird');
var fs = require('fs');
var file = global.__base + 'sailor.json';
	
var sailorRoute = require(global.__base + 'routes/sailor.js');
var reservationRoute = require(global.__base + 'routes/reservation.js');


router.post('/upload',sailorRoute.uploadAndSave);
router.post('/sailorReservations',reservationRoute.getReservation);
router.get('/getAllSailors',reservationRoute.getAllSailors);

router.get('/getAllBoats',reservationRoute.getAllBoats);
router.post('/getAllReservation',reservationRoute.getAllReservation);
router.post('/getAllBoatReservation',reservationRoute.getAllBoatReservation);






module.exports = router;
