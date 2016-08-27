utilities.environment = (function () {

  var inventoryLogic = utilities.inventory;
  var generateItems = inventoryLogic.generateItems;
  var objgen = utilities.objgen;
  var resources = constructResources(meta.items.resources);
  var available = constants.available;

  function constructResources(items) {
    var resources = {};
    items.forEach(function (item) {
      resources[item.name] = { $integer: [0, 2] };
    });
    return resources;
  }

  var generateObj = objgen.compile([{
    name: {
      $options: {
        'clearing': 20,
        'grove': 5,
        'cliffside': 15,
        'creek': 5,
        'rockpile': 5,
        'hillside': 10
      }
    },
    carry: { $integer: [1, Math.floor(available / 3)] },
    greeting: { $integer: [0, 6] },
    resources: resources
  }]);

  function generate() {
    var env = generateObj();
    var resources = getResourceItems(env);
    if (!resources.length) env.inventory = [];
    else env.inventory = generateItems(getResourceItems(env), env.carry);
    return env;
  }

  function getResourceItems(env) {
    var resources = _.pickBy(env.resources, (found) => found);
    var keys = _.keys(resources);
    return _.map(keys, inventoryLogic.getItem);
  }

  function randomResource(env) {
    var resources = _.pickBy(env.resources, (found) => found);
    var keys = _.keys(resources);
    if (!keys.length) return 'nothing';
    return _.sample(keys);
  }

  return {
    generate,
    randomResource
  };
})()
