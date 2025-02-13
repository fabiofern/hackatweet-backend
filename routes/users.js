var express = require('express');
var router = express.Router();
const User = require("../models/users")
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const { checkBody } = require('../modules/checkBody');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {

      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
        isConnected: true
      })

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      })
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});


router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    console.log('manque un truc')
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username })
    .then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        console.log("You're IN BABY")
        res.json({ result: true, token: data.token });

      } else {
        console.log("NAHHHHHHHHH")
        res.json({ result: false, error: 'User not found' });
      }
    });
});











module.exports = router;

