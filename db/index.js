const config = require('./../config');
const MongoClient = require('mongodb').MongoClient



const findAllCateogories = function() {
  return MongoClient.connect(config.db_uri)
  .then(function(dbClient) {
    const db = dbClient.db(config.db_name)
    return db.collection(config.collection_name).distinct('category')
    .then(function(result) {
      return result
    });
  }, function(err) {
    console.log(err)
  });
}

const findQuizByCategory = function(category) {
  return MongoClient.connect(config.db_uri)
  .then(function(dbClient) {
    const db = dbClient.db(config.db_name)
    return db.collection(config.collection_name).findOne({category:category})
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
