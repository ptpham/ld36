utilities.dictionary = (function () {

  var encountered = {};

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
    return encountered[symbol];
  }

  function revealWord(symbol) {
    var getWord = utilities.symbols.getWord;
    var word = getWord(symbol);
    encountered[symbol].actual = word;
    return encountered[symbol];
  }

  function learnRandomWord() {
    var getSymbol = utilities.symbols.getSymbol;
    var getRandomWord = utilities.symbols.getRandomWord;
    var word = getRandomWord();
    var symbol = getSymbol(word);

    var encounter = encounterWord(symbol);
    encounter.actual = word;
    return encounter;
  }

  return {
    encounterWord,
    guessWord,
    revealWord,
    learnRandomWord
  };
})()
