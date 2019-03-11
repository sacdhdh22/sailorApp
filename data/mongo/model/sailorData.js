var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sailorSchema = new Schema({
  SailorId :  { type :  Number,  index: true},
  SailorName : String,
  Age : Number,
  Rating : Number
});


sailorSchema.statics.findSailorId = function(name,callback) {
   this.findOne({SailorId : name}, function(err, data){
       if(err) {
        callback(err, false);
       }
       else
       {
        callback(null, data);
       }  
   });
};


sailorSchema.statics.findSailorName = function(name,callback) {
   this.findOne({SailorName : name}, function(err, data){
       if(err) {
        callback(err, false);
       }
       else
       {
        callback(null, data);
       }  
   });
};

sailorSchema.statics.getAllSailor = function(callback) {
   this.distinct("SailorName", function(err, data){
       if(err) {
        callback(err, false);
       }
       else
       {
        callback(null, data);
       }  
   });
};

var Sailor = mongoose.model('sailorSchema', sailorSchema);

module.exports = Sailor;
