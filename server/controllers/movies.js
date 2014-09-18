'use strict';

var Movie = require('../models/movie');

exports.index = function(req, res){
  Movie.all(function(err, movies){
    res.send({movies:movies});
  });
};

exports.create = function(req, res){
  Movie.create(req.body, function(err, m){
    res.send({movie:m});
  });
};

exports.remove = function(req, res){
  // console.log(req.params.id);
  Movie.remove(req.params.id, function(err, something){
    res.send({err:err});
  });
};
