/*
File Name 		: main.js
Author			: Sachin
Version			: 1.0
Date			: 09 Mar 2019
Description		: Initailaizes the server.                 
                 global.__base  =  /sailorApp/src/
*/
global.__base = __dirname + '/';
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');
var http = require('http');
var path = require('path');

var port = (process.env.PORT || '3000');

var server = require(global.__base +'server.js');
var Server = new server();

Server.init(function(err, data){
	if(err)
	{
		console.log(err);
	}
	else
	{
		var app = express();
		var routes = require(global.__base + 'routes');
		app.set('port', port);
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		//serving static files
		app.use(express.static(path.join(global.__base, 'public')));
		app.get('/', function(req, res) {
		res.sendFile(path.join(global.__base, 'public' + 'index.html'));
		});
        app.use('/', routes)
		var server = http.createServer(app);
		server.listen(port, function(err, doc){
			console.log("Listening in port 300 !!!!")
		});
	}
});