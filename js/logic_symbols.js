utilities.symbols = (function () {
  // For more random sequences, consider shuffling
  var symbols = ['h', 'j', 'q', 'w', 'z', 'x'];
  var index = 6;
  var map = {};

  function getSymbol(word) {
    if (!map[word]) {
      map[word] = createUniqueSymbol();
    }
    return map[word];
  }

  function getWord(symbol) {
    var keys = Object.keys(map);
    var word = '';
    keys.some(function (key) {
      if (map[key] === symbol) {
        word = key;
        return true;
      }
      return false;
    });
    return word;
  }

  function createUniqueSymbol() {
    var symbol = '';
    var uniqueIndex = index++;
    var mod;
    do {
      mod = uniqueIndex % symbols.length;
      symbol += symbols[mod];
      uniqueIndex = (uniqueIndex - mod) / symbols.length;
    } while (uniqueIndex);
    return symbol;
  }

  function garble(phrase) {
    var garbled = phrase.toLowerCase();
    var clean = garbled.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
    var words = clean.split(' ');

    words.forEach(function (word) {
      var regex = new RegExp(word, 'g');
      var symbol = getSymbol(word);
      garbled = garbled.replace(regex, symbol);
    });

    return garbled;
  }

  return {
    getSymbol,
    getWord,
    garble
  };
})()
