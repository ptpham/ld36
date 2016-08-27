
meta.items = (function() {

var all = [
  {name: 'stone'},
  {name: 'wood'},
  {name: 'water'},
  {name: 'fruit'},
  {name: 'cake'},
  {name: 'flint', goalHint: 'The Miniature Neutron Turbolizer has lost its spark. We will need something to reignite it.'},
  {name: 'gold', goalHint: 'This Aqueous Electro Fluxinator is fried. Needs something conductive and water resistant.' }
];

function findByName(name) {
  for (var i = 0; i < all.length; i++) {
    if (all[i].name == name) return all[i];
  }
}

return {
  all,
  goals: ['flint', 'gold'].map(findByName),
  resources: ['stone', 'wood', 'water', 'fruit'].map(findByName),
  appealing: ['fruit', 'cake', 'gold'].map(findByName)
};

})();

