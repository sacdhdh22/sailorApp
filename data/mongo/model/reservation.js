var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sailor = require(global.__base + 'data/mongo/model/sailorData.js');
var Boat = require(global.__base + 'data/mongo/model/boat.js');

var ReservationSchema = new Schema({
    BoatId : { type: Schema.Types.ObjectId, ref: 'boat' },
    SailorId : { type: Schema.Types.ObjectId, ref: 'sailorSchema' }, 
    Day : String,
    Date : Date
});

ReservationSchema.statics.findAllReservation = function(id,callback) {
   this.find({SailorId : id}).populate('SailorId').populate('BoatId').sort({Date: -1}).exec(function(err, data){
       if(err) {
        callback(err, false);
       }
       else
       {
       	console.log(data)
        callback(null, data);
       }  
   });
};


ReservationSchema.statics.findAllBoatReservation = function(id,callback) {
   this.find({BoatId : id}).populate('SailorId').populate('BoatId').sort({Date: -1}).exec(function(err, data){
       if(err) {
        callback(err, false);
       }
       else
       {
        console.log(data)
        callback(null, data);
       }  
   });
};


var ReservationSchema = mongoose.model('reservation', ReservationSchema);

module.exports = ReservationSchema;
