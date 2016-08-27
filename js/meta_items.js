
meta.items = (function() {

var all = [
  {name: 'stone'},
  {name: 'wood'},
  {name: 'water'},
  {name: 'fruit'},
  {name: 'cake'},
  {name: 'flint'},
  {name: 'gold', goalHint: 'This Aqueous Electro Fluxinator is fried. Needs something conductive and water resistant.' }
];

function findByName(name) {
  for (var i = 0; i < all.length; i++) {
    if (all[i].name == name) return all[i];
  }
}

return {
  all,
  goals: ['gold'].map(findByName)
};

})();

