const router = require('express').Router()
const database = require('./../db')
const path = require('path')




router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'))
});

router.get('/quiz/categories', (req, res) => {
  database.findAllCateogories().then(function(result){
    res.status(200).send({
        success: true,
        message: 'Categories retrieved successfully',
        payload: result
        })
    })
});

router.get('/quiz/category/:category', (req, res) => {
  database.findQuizByCategory(req.params.category).then(function(result){
    res.status(200).send({
        success: 'true',
        message: 'Quiz retrieved for category ' + req.params.category,
        payload: result
        })
    })
});



module.exports = router;
