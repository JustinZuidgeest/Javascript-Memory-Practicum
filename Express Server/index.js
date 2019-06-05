const express = require('express');
const fs = require('fs'); 
const _ = require("lodash");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');

const users = [
  { id: 1, name: 'test@test.nl', password: 'testtest' },
  { id: 2, name: 'henk@detank.nl', password: 'henkdetank'}
];

const privateKey = fs.readFileSync('./private.pem', 'utf8');
const publicKey = fs.readFileSync('./public.pem', 'utf8');

const checkIfAuthenticated = expressJwt({
  secret: publicKey
});

const signOptions = {
  expiresIn: "1h",
  algorithm: 'ES256'
};

// Express

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//parse usual forms
app.use(bodyParser.urlencoded({
  extended: true
}));

//parse json for APIs
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  console.log("request for /api")
  res.json( {message: 'hallo allemaal...'} )
});

app.post('/api/login', function (req, res) {
  console.log("request for /api/login");
  if (req.body.name && req.body.password) {
    var name = req.body.name;
  }

  var user = users[_.findIndex(users, { name: name })];

  if (!user) {
    res.status(401).json({ message: 'no such user found' });
  }

  if (user.password === req.body.password) {
    let payload = { name, id: user.id };
    let token = jwt.sign(payload, privateKey, signOptions);
    res.json({
      message: 'ok',
      token: token,
      expiresIn: jwt.decode(token).exp
    });
  } else {
    res.status(401).json({ message: 'password did not match' });
  }
});

app.route('/api/auth')
  .get(checkIfAuthenticated, function (req, res) {
    console.log("request for /api/auth")
    res.json({ message: "Token is valid" });
  })

app.route('/api/secret')
  .get(checkIfAuthenticated, function (req, res) {
    console.log("request for /api/secret")
    res.json({ message: "Success! You can not see this without a token" });
  })

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Express starting listening on port "+PORT)
  console.log("Express running")
});
