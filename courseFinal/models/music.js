var mongoose = require("mongoose");

var musicSchema = new mongoose.Schema({
    name: String,
    author: String,
    style: String, 
    ctArea: String,
    year: Number,
    imageFile: String
});
musicSchema.statics.listAllMusics = function() {
    return this.find({});
};
musicSchema.statics.queryMusics = function() {
    return this.find({ctArea:"China"});
};
var musicModel = mongoose.model('music', musicSchema);

module.exports = musicModel;


