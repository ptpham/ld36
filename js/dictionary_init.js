(function () {

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
    var word = utilities.getWord(symbol);
    encountered[symbol].actual = word;
    return encountered[symbol];
  }

  utilities.encounterWord = encounterWord;
  utilities.guessWord = guessWord;
  utilities.revealWord = revealWord;
})()
