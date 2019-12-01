var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/join', function(req, res, next) {
  res.render('join');
});

module.exports = router;
