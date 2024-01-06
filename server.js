require('dotenv').config();

// init server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

console.log('private key - ', __dirname + process.env.PRIVATE_KEY);
// create a Nexmo client
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APP_ID,
  privateKey: __dirname + process.env.PRIVATE_KEY 
}, {debug: true});


app.post('/getJWT', function(req, res) {
  const jwt = nexmo.generateJwt({
    application_id: process.env.APP_ID,
    sub: req.body.name,
    exp: Math.round(new Date().getTime()/1000)+3600,
    acl: {
      "paths": {
        "/v1/users/**":{},
        "/v1/conversations/**":{},
        "/v1/sessions/**":{},
        "/v1/applications/**":{}
      }
    }
  });
  res.send({jwt: jwt});
});

app.post('/createUser', function(req, res) {
  nexmo.users.create({
    name: req.body.name,
    display_name: req.body.display_name || req.body.name
  },(err, response) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send({id: response.id});
    }
  });
});


app.listen(3001);

