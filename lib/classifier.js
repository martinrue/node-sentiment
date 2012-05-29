var Document = require('./document');
var helpers = require('./helpers');
var _ = require('underscore');

var Classifier = function(positiveCorpus, negativeCorpus) {
  this.positiveCorpus = positiveCorpus;
  this.negativeCorpus = negativeCorpus;

  this.totalProbability = 0;
  this.inverseTotalProbability = 0;
  this.tolerance = 0.05;
};

Classifier.prototype.classify = function(text) {
  var self = this;
  var stopWords = helpers.stopWords();

  new Document(text).eachWord(function(word) {
    if (_.include(stopWords, word)) return;

    var positiveMatches = self.positiveCorpus.tokenCount(word);
    var negativeMatches = self.negativeCorpus.tokenCount(word);

    var probability = self.calculateProbability(positiveMatches, self.positiveCorpus.totalTokens, negativeMatches, self.negativeCorpus.totalTokens);
    self.recordProbability(probability);
  });  

  var finalProbability = this.combineProbabilities();

  return { 
    sentiment: this.computeSentiment(finalProbability), 
    probability: finalProbability 
  };
};

Classifier.prototype.calculateProbability = function(positiveMatches, positiveTotal, negativeMatches, negativeTotal) {
  var unknownWordStrength = 1.0;
  var unknownWordProbability = 0.5;

  var total = positiveMatches + negativeMatches;
  var positiveRatio = positiveMatches / parseFloat(positiveTotal);
  var negativeRatio = negativeMatches / parseFloat(negativeTotal);

  var probability = positiveRatio / (positiveRatio + negativeRatio);

  return ((unknownWordStrength * unknownWordProbability) + (total * probability)) / (unknownWordStrength + total);
};

Classifier.prototype.recordProbability = function(probability) {
  if (isNaN(probability)) return;

  this.totalProbability = (this.totalProbability === 0) ? probability : this.totalProbability * probability;
  this.inverseTotalProbability = (this.inverseTotalProbability === 0) ? (1 - probability) : this.inverseTotalProbability * (1 - probability);
};

Classifier.prototype.combineProbabilities = function() {
  if (this.totalProbability === 0) return 0.5;

  return this.totalProbability / (this.totalProbability + this.inverseTotalProbability);
};

Classifier.prototype.computeSentiment = function(probability) {
  if (probability <= (0.5 - this.tolerance)) return 'negative';
  if (probability >= (0.5 + this.tolerance)) return 'positive';
  return 'neutral';
};

module.exports = Classifier;