const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
    name: String,
    nombre: Number,
    id: []

});

const Hashtag = mongoose.model('hashtags', hashtagSchema);

module.exports = Hashtag;