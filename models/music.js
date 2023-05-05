const mongoose = require('mongoose');

const MusicSchema = mongoose.Schema({
    musicName: {
        type: String,
        unique: true
    },
    musicMoods: {
        type: String
    }
});

module.exports = mongoose.model('Music', MusicSchema);