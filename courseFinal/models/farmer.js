var mongoose = require("mongoose");

var farmerSchema = new mongoose.Schema({
    name: String,
    product: String, 
    amount: Number,
    cropDate: Date
});
farmerSchema.statics.listAllfarmers = function() {
    return this.find({});
};
farmerSchema.statics.queryfarmers = function() {
    return this.find({product:"peach"});
};
var farmerModel = mongoose.model('farmer', farmerSchema);

module.exports = farmerModel;


