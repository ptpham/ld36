(function () {

  var dictionary = constants.dictionary;
  var encounterWord = utilities.encounterWord;

  var render = new MutationObserver(function(records) {
    for (var record of records) {
      var target = record.target;
      if (record.attributeName == 'data-text') {
        // We expect that the text here is untranslated.
        var text = target.dataset.text;
        var clean = text.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
        var words = clean.split(' ');

        words.forEach(function (word) {
          var regex = new RegExp(word, 'g');
          var encounter = encounterWord(word);
          if (encounter.actual) {
            text = text.replace(regex, '<strong class="actual">' + encounter.actual + '</strong>');
          } else if (encounter.guess) {
            text = text.replace(regex, '<strong class="guess">' + encounter.guess + '</strong>');
          }
        });
        target.innerHTML = text;
      }
    }
  });

  render.observe(document.querySelector('speech'), { attributes: true });
})()
