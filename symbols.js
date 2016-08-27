
var symbols = ["0", "1", "2", "3"]; // For more random sequences, consider shuffling
var index = 1;
var map = {};

function getSymbol(word) {
  if (!map[word]) {
    map[word] = createUniqueSymbol();
  }
  return map[word];
}

function createUniqueSymbol() {
  var symbol = "";
  var uniqueIndex = index;
  var mod;
  while (uniqueIndex > 0) {
    mod = uniqueIndex % symbols.length;
    symbol += symbols[mod];
    uniqueIndex = (uniqueIndex - mod) / symbols.length;
  }
  index++;
  return symbol;
}

module.exports = getSymbol;
