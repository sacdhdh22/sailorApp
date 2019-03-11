var async = require('async');
var mongoose = require('mongoose');
var formidable = require('formidable');
var fs = require('fs');

var file = global.__base + 'sailor.json';
//var SailorSchema = require(global.__base + 'data/mongo/model/sailor.js');
var Sailor = require(global.__base + 'data/mongo/model/sailorData.js');
var Boat = require(global.__base + 'data/mongo/model/boat.js');
var Reservation = require(global.__base + 'data/mongo/model/reservation.js');

module.exports  = {
     uploadAndSave : function(req, res, next){
	   async.waterfall([
	        async.apply(uploadFile,req),
	        //saveFile 
	        saveFileModels
	   ],function(err, data){
	      if(err){
	          res.status(500).send({
	          Status : 500,
	          Message : "Error"
	        });
	      } else {
	         res.status(200).send("Success");
	      }
	   })
	}
};

	function uploadFile(req,callback){
	  var form = new formidable.IncomingForm();
	  form.parse(req, function(err, field, file){
	    if(err != null){
	      callback(err, null);
	    }
	    else if(file) {
	      var oldpath = file.file.path;
	      var filepath = global.__base + 'sailor.json';
	      fs.rename(oldpath, filepath, function(err){
	        if(err){
	          callback(err,null)
	        }
	        else {
	         callback(null, true)
	        }
	      });;
	   }
	   else {
	    callback(null, true)
	   }
	 });
	}

 function saveFileModels(status,callback){
 		fs.readFile(file, function(err, fileContent){
	      if(err) {
	          callback(err, null);
	      } else {
	          var reservation = []; 
	          data = JSON.parse(fileContent);
	          async.forEachOf(data, function(value, key, callback){

	            async.series([
	               async.apply(saveSailorData, value), //Saves sailor Data
	               async.apply(saveBoatData, value),  //Save boat Data
	               async.apply(reservationData, value)
	            ], function(err, data){
	                if(err != null){
	                  console.log(err)
	                  callback(err, null)
	                }
	                else{
	                  callback(null, true)
	                }
	            })
	          });
	          callback(null, true);
	     } //else ends here

	    });
 }

 function saveSailorData(value, callback){
     var bucket = {
	        SailorId : value.SailorId,
	        SailorName : value.SailorName,
	        Age : value.Age,
	        Rating : value.Rating,
	    }
     var sailor = new Sailor(bucket);
     sailor.save(bucket, function(err, dbData){  
          if(err){
            console.log(err);
            callback(err, null);
          }
          else{
            callback(null, true);              
          };
       });   
 }


 function saveBoatData(value, callback){
   if(value.Reservations){
         value.Reservations.forEach(function(data){
            var bucket = {
            	BoatId : data.BoatId,
            	BoatName : data.BoatName,
            	Colour : data.Colour
            }
             var boat = new Boat(bucket);
		     boat.save(bucket, function(err, dbData){  
		          if(err){
		            console.log(err);
		          }
		          else{
                                
		          };
		       });   
         });
    } 
    callback(null, true);  
 }


 function reservationData(value, callback){
   var sailorId = value.SailorId;

   if(value.Reservations){
      value.Reservations.forEach(function(data){
      	if(data.BoatId && sailorId) {
      		var day = data.Day;  
        
           async.parallel([
              async.apply(getBoatId, data.BoatId),
              async.apply(getSailorId, sailorId)
           	],function(err, data){
              if(err){
              	console.log(err);
              }
              else{
                         console.log(data)
		                var bucket = {
		                	BoatId : data[0].Boat,
		                	SailorId : data[1].Sailor,
		                	Day : day,
		                	Date : new Date(day)    
		                }; 
                        console.log(bucket)
		                var reservation = new Reservation(bucket);
		                reservation.save(bucket, function(err, data){
		                    if(err) {
		   		  				console.log(err)
					   	    }
						    else
					   	    {
					   		
					   	    } 
		                })
              }
           	})
       }
      });

   } 
    callback(null, true);  
 }
  
 function getBoatId(boatId, callback){
     Boat.findBoatId(boatId, function(err, data){
	   if(err) {
   		  callback(err, false);
   	   }
	   else
   	   {
   		  callback(null, {"Boat" : data._id});
   	   }  
     });
 } 

 function getSailorId(sailorId, callback){
     Sailor.findSailorId(sailorId, function(err, data){
	   if(err) {
   		  callback(err, false);
   	   }
	   else
   	   {

   		  callback(null, {"Sailor" : data._id});
   	   }  
     });
 } 
       //   value.Reservations.forEach(function(data){
       //      var bucket = {
       //      	BoatId : data.BoatId,
       //      	BoatName : data.BoatName,
       //      	Colour : data.Colour
       //      }
       //       var boat = new Boat(bucket);
		     // boat.save(bucket, function(err, dbData){  
		     //      if(err){
		     //        console.log(err);
		     //      }
		     //      else{
                                
		     //      };
		     //   });   
       //   });
 

	// function saveFile(status,callback){
	//     fs.readFile(file, function(err, fileContent){
	//       if(err) {
	//           callback(err, null);
	//       } else {
	//           var reservation = []; 
	//           data = JSON.parse(fileContent);
	//           async.forEachOf(data, function(value, key, callback){
	//             async.waterfall([
	//                async.apply(getSailorData, value),
	//                saveSailorData
	//             ], function(err, data){
	//                 if(err != null){
	//                   console.log(err)
	//                   callback(err, null)
	//                 }
	//                 else{
	//                   callback(null, true)
	//                 }
	//             })

	//           });
	//           callback(null, true);
	//      } //else ends here

	//     });
	// }
	                
	// function getSailorData(value, callback){   
	//      var reservation = [];            
	//      var bucket = {
	//         SailorId : value.SailorId,
	//         SailorName : value.SailorName,
	//         Age : value.Age,
	//         Rating : value.Rating,
	//         Reservations : reservation
	//      }
	//      var sailor = new SailorSchema({
	//         SailorId : value.SailorId,
	//         SailorName : value.SailorName,
	//         Age : value.Age,
	//         Rating : value.Rating,
	//         Reservations : reservation  

	//      });
	        
	//      //Convert Date stored as string as Date
	        
	//      if(value.Reservations){
	//          value.Reservations.forEach(function(data){
	//            if(data.Day){
	//               data.Day = new Date(data.Day)
	//            }
	//          });
	//       }
	//       callback(null, value)
	// }

	    
	// function saveSailorData(bucket, callback){
	//     var sailor = new SailorSchema(bucket);
	//        sailor.save(bucket, function(err, dbData){  
	//           if(err){
	//             console.log(err);
	//             callback(err, null);
	//           }
	//           else{
	//             callback(null, true);              
	//           };
	//        });
	// }
