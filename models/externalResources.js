const mongoose = require('mongoose');

const ResourceSchema = mongoose.Schema({
    name: {type: String},

    area: {type: String},

    author: {type: String},

    style: {type: String},

    year: {type: Number},

    link: {type: String},

    img_href: {type: String}
});

module.exports = mongoose.model('ExternalResources', ResourceSchema);