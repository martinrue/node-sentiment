var _ = require('underscore');

var helpers = {
  stopWords: function() {
    return 'a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,really,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,totally,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your'.split(',');
  },
  getWords: function(input) {
    var filtered = input.toString().replace(/[^0-9a-zA-Z ]/g, '');
  
    var words = _.map(filtered.split(' '), function(word) {
      return word.trim().toLowerCase();
    });

    return _.filter(words, function(word) {
      return word.length > 0;
    });
  }
};

module.exports = helpers;