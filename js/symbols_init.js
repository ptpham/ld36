(function () {
  // For more random sequences, consider shuffling
  var symbols = ['a', 'b', 'c', 'd', 'e', 'f'];

  var index = 0;
  var map = constants.symbols;

  function getSymbol(word) {
    if (!map[word]) {
      map[word] = createUniqueSymbol();
    }
    return map[word];
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

  utilities.getSymbol = getSymbol;

})()
