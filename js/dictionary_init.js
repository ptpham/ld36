(function () {

  var encountered = constants.dictionary;

  function encounterWord(symbol) {
    if (encountered[symbol]) encountered[symbol].count++;
    else {
      encountered[symbol] = {
        count: 1,
        guess: '',
        actual: ''
      };
    }
    return encountered[symbol];
  }

  function guessWord(symbol, guess) {
    encountered[symbol].guess = guess;
  }

  function revealWord(symbol) {
    var symbols = constants.symbols;
    var keys = Object.keys(symbols);
    var word = keys.filter(function (key) {
      return symbols[key] === symbol;
    });
    return word[0];
  }

  utilities.encounterWord = encounterWord;
  utilities.guessWord = guessWord;
  utilities.revealWord = revealWord;
})()
