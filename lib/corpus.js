var Document = require('./document');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var Corpus = function() {
  this.tokens = {};
  this.totalTokens = 0;
};

Corpus.prototype.add = function(document) {
  var self = this;

  document.eachWord(function(word) {
    self.tokens[word] = (self.tokens[word] || 0) + 1;
  });
};

Corpus.prototype.loadFromDirectory = function(directory) {
  var self = this;

  _.each(fs.readdirSync(directory), function(file) {
    var fileData = fs.readFileSync(path.join(directory, file), 'utf-8');
    _.each(fileData.split('\n'), function(line) {
      self.add(new Document(line));
    });
  });

  this.totalTokens = countTotalEntries(this.tokens);
};

Corpus.prototype.tokenCount = function(word) {
  return this.tokens[word] || 0;
};

var countTotalEntries = function(tokens) {
  var total = 0;

  _.each(Object.keys(tokens), function(word) {
    total += tokens[word];
  });

  return total;
};

module.exports = Corpus;