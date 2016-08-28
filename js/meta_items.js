
meta.items = (function() {

var all = [
  {name: 'stone', info: "You could have sworn it wasn't this flat when you picked it up ..." },
  {name: 'wood', info: "Doesn't measure up to the wood back home."},
  {name: 'water', info: "Full of electrolytes!"},
  {name: 'fruit', info: "The fragrant smell somehow reminds you of home."},
  {name: 'cake', info: "The natives seem to enjoy fluffy, sweet deserts."},
  {name: 'flint', info: "Sparky spark."},
  {name: 'gold', info: "Shiny and heavy." },
  {name: 'salt', info: "Na ... I'd rather look at the clouds."},
  {name: 'hammer', info: "Quite heftly. It's probably made of lead."},
  {name: 'goat', info: "Strange creature seen with the other creatures. Sounds like the other creatures, too."},
  {name: 'pickle', info: "Smells sour. Appears to be edible."},
  {name: 'pot', info: "Some kind of container. Seems brittle."},
  {name: 'flute', info: "It's made of bone. How macabre."},
  {name: 'fabric', info: "Decently thick."},
  {name: 'basket', info: "Maybe you could take home a souvenir."},
  {name: 'feather', info: "It's pretty."},
  {name: 'pillow', info: "You prefer to sleep suspended in anti-gravity."},
  {name: 'Miniature Neutron Turbolizer',
    info: "It's losts its spark. You'll need something to reignite it.",
    goal: 'flint' },
  {name: 'Aqueous Electro Fluxinator',
    info: "It's fried! Needs something conductive and water resistant.",
    goal: 'gold' },
  {name: 'Old-fashioned Nuclear Hydrolics',
    info: "The barrier is cracked. You'll need something to prevent the radiation from spreading.",
    goal: 'hammer'},
  {name: 'Liquid State Energizmatron',
    info: "Most of the acid has leaked out. You'll need to replace it.",
    goal: 'pickle'},
  {name: 'Baronomic-economic-socionomic Sensor',
    info: "The creature at the core of this sensor has escaped. Anything with a brain could replace it.",
    goal: 'goat'},
  {name: 'Hyper-space Rain Cover',
    info: "It's a bit torn up. Just needs some patching.",
    goal: 'fabric'},
  {name: 'Minkowski Space Pump',
    info: "The pump scoop is broken. You'll need to find a new one.",
    goal: 'pot'},
  {name: 'Asteroid Impact Dampener',
    info: "Anything that can absorb a bit of pressure might do.",
    goal: 'pillow'}
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
  appealing: [
    'fruit', 'cake', 'gold','salt', 'goat',
    'basket', 'flute', 'fabric', 'pot', 'pickle',
    'feather', 'pillow'].map(findByName),
  rare: ['flint', 'gold', 'salt', 'goat', 'flute', 'pillow'].map(findByName)
};

})();

