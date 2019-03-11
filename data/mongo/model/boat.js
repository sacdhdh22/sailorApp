var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boatSchema = new Schema({
    BoatId :  { type :  Number,  index: true},
    BoatName : String,
    Colour : String,
});

boatSchema.statics.findBoatId = function(name,callback) {
   this.findOne({BoatId : name}, function(err, data){
   	   if(err) {
   		  callback(err, false);
   	   }
   	   else
   	   {
   		  callback(null, data);
   	   }  
   });
};


boatSchema.statics.findBoatName = function(name,callback) {
   this.findOne({BoatName : name}, function(err, data){
       if(err) {
        callback(err, false);
       }
       else
       {
        callback(null, data);
       }  
   });
};
boatSchema.statics.getAllBoats = function(callback) {
   this.distinct("BoatName", function(err, data){
       if(err) {
        callback(err, false);
       }
       else
       {
        callback(null, data);
       }  
   });
};


var BoatSchema = mongoose.model('boat', boatSchema);

module.exports = BoatSchema;
