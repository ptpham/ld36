
meta.items = (function() {

var all = [
  {name: 'stone'},
  {name: 'wood'},
  {name: 'water'},
  {name: 'fruit'},
  {name: 'cake'},
  {name: 'flint', info: 'Sparky spark.'},
  {name: 'gold', info: 'Shiny and heavy.' },
  {name: 'Miniature Neutron Turbolizer',
    info: "It's losts its spark. You'll need something to reignite it.",
    goal: 'flint' },
  {name: 'Aqueous Electro Fluxinator', info: "It's fried! Needs something conductive and water resistant.", goal: 'gold' },
  {name: 'salt'},
];

function findByName(name) {
  for (var i = 0; i < all.length; i++) {
    if (all[i].name == name) return all[i];
  }
}

for (var i = 0; i < all.length; i++) all[i].id = i;

return {
  all,
  goals: all.filter(x => x.goal),
  tradeable: _.reject(all, x => x.goal),
  resources: ['stone', 'wood', 'water', 'fruit'].map(findByName),
  appealing: ['fruit', 'cake', 'gold', 'salt'].map(findByName),
  rare: ['flint', 'gold', 'salt'].map(findByName)
};

})();

