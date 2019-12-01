var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var { User, salt } = require("../models");

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/join', (req, res, next) => {
  res.render('join');
});

router.post('/join', async (req, res, next) => {
  var result = await User.create({
    userid: req.body.userid,
    userpw: crypto.createHash('sha512').update(req.body.userpw + salt).digest('base64'),
    username: req.body.username,
  });
  res.json(result);
})

module.exports = router;
