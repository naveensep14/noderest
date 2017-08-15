var express = require('express'),
fs = require('fs');
var https = require('https');
var http = require('http');

var app = express();

var options = {
  key: fs.readFileSync('ca.key'),
  cert: fs.readFileSync('ca.crt')
};


app.configure(function(){
  app.use(express.bodyParser());
});

require('./models/musician');
require('./routes')(app);

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(3001);
console.log('Listening on port 3001...');