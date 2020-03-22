var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));


app.get('/', function (req, res) {
  res.send('Start quiz!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
