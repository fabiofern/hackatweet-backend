const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    message: String,
    date: Date,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;