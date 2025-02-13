var express = require('express');
var router = express.Router();
const Tweet = require("../models/tweets");
const User = require("../models/users");
const { checkBody } = require('../modules/checkBody');


router.post('/newtweet/:token', async (req, res) => {
    if (!req.body.message) {
        return res.json({ result: false, error: 'Message field is missing' });
    }
    const validToken = User.findOne({ token: req.params.token });
    if (!validToken) {
        return res.json({ result: false, error: 'User not found' });
    }
    console.log("ICIIIIIIII", validToken)
    const newTweet = new Tweet({
        username: validToken.username,
        message: req.body.message,
        date: new Date()
    });
    newTweet.save();
    res.json({ result: true, newTweet });
});

module.exports = router;


router.get('/showtweets', async (req, res) => {
    const tweets = await Tweet.find()
    res.json(tweets);
});
