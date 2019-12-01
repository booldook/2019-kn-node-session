var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var { User, salt } = require("../models");

/* GET users listing. */
router.get('/', (req, res, next) => {
  if(req.session.user) res.send(`회원입니다.<p><a href="/users/logout">로그아웃</a></p>`);
  else res.render('login');
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/users");
  });
});

router.post('/login', async (req, res, next) => {
  var result = await User.findOne({
    where: {
      userid: req.body.userid,
      userpw: crypto.createHash('sha512').update(req.body.userpw + salt).digest('base64'),
    }
  });
  if(result) {
    // 로그인에 성공했으면...
    req.session.user = {};
    req.session.user.id = result.id;
    req.session.user.userid = result.userid;
    req.session.user.username = result.username;
    res.redirect("/users");
  }
  else {
    res.send("로그인에 실패했습니다.");
  }
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
  if(result.id) res.redirect("/users");
  else res.send("가입에 실패하였습니다.");
})

module.exports = router;
