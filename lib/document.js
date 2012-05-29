var helpers = require('./helpers');
var _ = require('underscore');

var Document = function(content) {
  var words = helpers.getWords(content);

  this.eachWord = function(callback) {
    _.map(words, callback);
  };
};

module.exports = Document;