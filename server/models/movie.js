'use strict';

var Mongo  = require('mongodb');

function Movie(){
}

Object.defineProperty(Movie, 'collection', {
  get: function(){return global.mongodb.collection('movies');}
});

Movie.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Movie.collection.findOne({_id:_id}, cb);
};

Movie.all = function(cb){
  Movie.collection.find().toArray(cb);
};

Movie.create = function(movie, cb){
  Movie.collection.save(movie, cb);
};

Movie.remove = function(id, cb){
  id = Mongo.ObjectID(id);
  Movie.collection.remove({_id:id}, cb);
};

module.exports = Movie;

