var mongoose = require("mongoose");
var fruitSchema = new mongoose.Schema({
    product: String,
    price: Number, 
    amount: Number,
    date: Date,
	producedby: {
        type: mongoose.Types.ObjectId,
        ref: "farmer"
    }
});
fruitSchema.statics.listAllfruits = function() {
    return this.find({});
};

var fruitModel = mongoose.model('fruit', fruitSchema);

module.exports = fruitModel;


