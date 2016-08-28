
meta.items = (function() {

var all = [
  {name: 'stone', info: "You could have sworn it wasn't this flat when you picked it up ..." },
  {name: 'wood', info: "Doesn't measure up to the wood back home."},
  {name: 'water', info: "Full of electrolytes!"},
  {name: 'fruit', info: "The fragrant smell somehow reminds you of home."},
  {name: 'cake', info: "The natives seem to enjoy fluffy, sweet deserts."},
  {name: 'flint', info: "Sparky spark."},
  {name: 'gold', info: "Shiny and heavy." },
  {name: 'salt', info: "Na ... I'd rather look at the CLouds."},
  {name: 'Miniature Neutron Turbolizer',
    info: "It's losts its spark. You'll need something to reignite it.",
    goal: 'flint' },
  {name: 'Aqueous Electro Fluxinator', info: "It's fried! Needs something conductive and water resistant.", goal: 'gold' },
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

