utilities.environment = (function () {

  var objgen = utilities.objgen;
  var resources = constructResources(meta.items.resources);

  function constructResources(items) {
    var resources = {};
    items.forEach(function (item) {
      resources[item.name] = { $integer: [0, 2] };
    });
    return resources;
  }

  var generate = objgen.compile([{
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
    resources: resources
  }]);

  return {
    generate
  };
})()
