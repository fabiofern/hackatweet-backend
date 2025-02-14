var express = require('express');
var router = express.Router();
const Tweet = require("../models/tweets");
const User = require("../models/users");
const { checkBody } = require('../modules/checkBody');
const Hashtag = require("../models/hashtags");

router.post('/newtweet/:token', async (req, res) => {
    if (!req.body.message) {
        return res.json({ result: false, error: 'Message field is missing' });
    }
    const validToken = User.findOne({ token: req.params.token });
    if (!validToken) {
        return res.json({ result: false, error: 'User not found' });
    }
    // console.log("ICIIIIIIII", validToken)

    const newTweet = new Tweet({
        username: validToken.username,
        message: req.body.message,
        date: new Date()
    });

    newTweet
        .save()
        .then(tweet => {
            // console.log("HEPAAAAAAA", tweet._id);
            const pattern = /#\S+/g;
            const hashtagList = tweet.message.match(pattern)
            if (hashtagList.length) {

                for (let i of hashtagList) {
                    // console.log("log de i ", i)
                    Hashtag.findOne({ name: i })
                        .then(dataHash => {
                            if (!dataHash) {
                                const newHash = new Hashtag({
                                    name: i,
                                    nombre: tweet._id.length,
                                    id: [tweet._id]
                                });
                                newHash.save()
                                res.json({ result: true, newTweet });
                            } else {
                                // Hashtag.updateOne(
                                //     { name: i },
                                //     { $push: { id: newTweet._id }, }
                                console.log("yeahhh", dataHash)

                                res.json({ result: true, newTweet });
                            }
                        })
                }
            }

        }

        );
})


router.get('/showtweets', async (req, res) => {
    const tweets = await Tweet.find()
    res.json(tweets);
})

module.exports = router;