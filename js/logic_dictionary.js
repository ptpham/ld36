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

  function getLearnedWord(encounter) {
    return encounter.actual;
  }

  function learnRandomWord() {
    var learnedWords = _.chain(encountered)
      .map(getLearnedWord)
      .compact().value();
    var getSymbol = utilities.symbols.getSymbol;
    var getRandomWords = utilities.symbols.getRandomWords;
    var getRandomItemWords = utilities.symbols.getRandomItemWords;
    var randomWords = _.concat(getRandomWords(2), getRandomItemWords(2));
    var words = _.difference(randomWords, learnedWords);
    if (words.length < 1) return false;

    var word = _.sample(words);
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
