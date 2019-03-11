var async = require('async');
var mongoose = require('mongoose');


var async = require('async');
var mongoose = require('mongoose');
var formidable = require('formidable');
var fs = require('fs');

var SailorSchema = require(global.__base + 'data/mongo/model/sailorData.js');
var BoatSchema = require(global.__base + 'data/mongo/model/boat.js');
var Reservation = require(global.__base + 'data/mongo/model/reservation.js');

module.exports = {
   getReservation : function(req, res, next){
    async.series([ 
       async.apply(getSailorReservation,req.body.sailorName)
    ],function(err, data){
      if(err){
        console.log(err);
        callback(err, false)
      }
      else{
        var response = {
                Status : 200,
                Message : "Success"
              }
        res.status(200).send(data);
      }

    })
  },
  getAllSailors : function(req, res, next){
    async.series([ 
       getAllSailor
    ],function(err, data){
      if(err){
        console.log(err);
        callback(err, false)
      }
      else{
        var response = {
                Status : 200,
                Message : "Success"
              }
        res.status(200).send(data);
      }

    })
  }, getAllBoats : function(req, res, next){
    async.series([ 
       getAllBoats
    ],function(err, data){
      if(err){
        console.log(err);
        callback(err, false)
      }
      else{
        var response = {
                Status : 200,
                Message : "Success"
              }
        res.status(200).send(data);
      }

    })
  },
  getAllReservation : function(req, res, next){
    async.waterfall([ 
      async.apply(getSailorId,req.body.sailorName),
       getAllReservation
    ],function(err, data){
      if(err){
        console.log(err);
        callback(err, false)
      }
      else{
        var response = {
                Status : 200,
                Message : "Success"
              }
        res.status(200).send(data);
      }

    })
  },
  getAllBoatReservation : function(req, res, next){
    async.waterfall([ 
      async.apply(getBoatId,req.body.boatName),
       getAllBoatReservation
    ],function(err, data){
      if(err){
        console.log(err);
        callback(err, false)
      }
      else{
        var response = {
                Status : 200,
                Message : "Success"
              }
        res.status(200).send(data);
      }

    })
  }
}


function getAllBoatReservation(data, callback){
  Reservation.findAllBoatReservation(data._id, function(err, data){
    if(err){
      console.log(err);
      callback(err, false);
    }
    else{
      callback(null,data);
    }
  })
}


function getAllReservation(data, callback){
  console.log(data)
  Reservation.findAllReservation(data._id, function(err, data){
    if(err){
      console.log(err);
      callback(err, false);
    }
    else{
      callback(null,data);
    }
  })
}

function getSailorId(sailorName, callback){
  SailorSchema.findSailorName(sailorName, function(err, data){
    if(err){
      console.log(err);
      callback(err, false);
    }
    else{
      callback(null,data);
    }
  })
}


function getBoatId(name, callback){
 BoatSchema.findBoatName(name, function(err, data){
    if(err){
      console.log(err);
      callback(err, false);
    }
    else{
      callback(null,data);
    }
  })
}


function getSailorReservation(sailorName, callback){
  SailorSchema.findSailorName(sailorName, function(err, data){
    if(err){
      console.log(err);
      callback(err, false);
    }
    else{
      callback(null,data);
    }
  })
}


function getAllSailor(callback){
  SailorSchema.getAllSailor(function(err, data){
    if(err){
      console.log(err);
      callback(err, false);
    }
    else{
      callback(null,data);
    }
  })
}


function getAllBoats(callback){
  BoatSchema.getAllBoats(function(err, data){
    if(err){
      console.log(err);
      callback(err, false);
    }
    else{
      callback(null,data);
    }
  })
}
