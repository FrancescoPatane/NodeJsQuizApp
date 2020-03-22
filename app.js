const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes'))

app.use(express.static(path.join(__dirname, 'client')))

app.get('/', function (req, res) {
  res.send(__dirname);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
