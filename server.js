'use strict'
var async = require('async');
var mongoose = require('mongoose');
var config = require('./config');
var server = function(){

};

server.prototype.init = function(callback){
    mongoose.connect(config.m,{ useNewUrlParser: true },function(error, db){
		if(error){
		   console.log("Oops! Connection Failed! " + error);
		   callback(error);
		}else{	
		   console.log("Ahoy! Connection Successful with Mongo!");
		   callback(null);
		}
  });
}

module.exports = server;
