var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');
var client  = require('./tweet.js');

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
  res.render('index');
})

var _requestSecret;
// handle getting request tokens
app.get('/request-token', function(req, res) {
  client.twitter.getRequestToken(function(err, requestToken, requestSecret) {
    if (err) {
      res.status(500).send(err);
    } else {
      _requestSecret = requestSecret;
      // redirect to login page
      res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
    }
  })
})

app.get('/access-token', function(req, res) {
  var requestToken = req.query.oauth_token,
  verifier = req.query.oauth_verifier;
  client.twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret, results) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      // use the access token and the access secret to pass into the update
    }
  });
});

exports.app = app
