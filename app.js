const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes'))

app.use(express.static(path.join(__dirname, 'client')))





app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});