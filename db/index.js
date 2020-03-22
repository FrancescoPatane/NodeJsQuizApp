const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'test'
const collectionName = 'quiz'
const client = new MongoClient(url)


const findAllCateogories = function() {
  return MongoClient.connect(url)
  .then(function(dbClient) {
    const db = dbClient.db(dbName)
    return db.collection(collectionName).distinct('category')
    .then(function(result) {
      return result
    });
  }, function(err) {
    console.log(err)
  });
}

const findQuizByCategory = function(category) {
  return MongoClient.connect(url)
  .then(function(dbClient) {
    const db = dbClient.db(dbName)
    return db.collection(collectionName).findOne({category:category})
    .then(function(result) {
      return result
    })
  }, function(err) {
    console.log(err)
  })
}


module.exports = {
  findAllCateogories: findAllCateogories,
  findQuizByCategory:findQuizByCategory
};
