var Corpus = require('./lib/corpus');
var Document = require('./lib/document');
var SentimentClassifier = require('./lib/classifier');

var Classifier = function(positivePath, negativePath) {
  var positiveCorpus = new Corpus();
  var negativeCorpus = new Corpus();

  if (!positivePath) positivePath = __dirname + '/data/positive';
  if (!negativePath) negativePath = __dirname + '/data/negative';

  positiveCorpus.loadFromDirectory(positivePath);
  negativeCorpus.loadFromDirectory(negativePath);

  return {
    classify: function(text) {
      return new SentimentClassifier(positiveCorpus, negativeCorpus).classify(text);
    }
  };
};

module.exports = Classifier;
