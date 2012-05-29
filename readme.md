# node-sentiment

A simple naive Bayes classifier for textual sentiment analysis in [node.js](http://nodejs.org).

## Usage

``` js
var SentimentClassifier = require('node-sentiment');
var classifier = new SentimentClassifier;

classifier.classify('it is very sunny today');
// { sentiment: 'positive', probability: 0.8101596181696481 }
```

## Sentiment Data

node-sentiment contains a default set of positive and negative data enough to seed the algorithm and produce decent results. The constructor function can optionally be passed custom paths to directories containing files with your own data. See [main.js](https://github.com/martinrue/node-sentiment/) if you need more details.