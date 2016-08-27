
(function () {

var wants = constructWants(constants.items);

generatePerson = objgen.compile([{
  name: { $options: { 'bob': 10, 'alice': 20 } },
  age: { $integer: [5, 60] },
  desire: { $integer: [-1, 2]},
  wants: wants
}, {
  $conditions: { desire: {$lt: 0} },
  greeting: { $integer: [0, 3]} // curmudgeons
}, {
  $conditions: { desire: {$eq: 0} },
  greeting: { $integer: [3, 6]} // normal
}, {
  $conditions: { desire: {$gt: 0} },
  greeting: { $integer: [6, 9]} // fanatic
}]);

function constructWants(items) {
  var wants = {};
  items.forEach(function (item) {
    wants[item.name] = { $integer: [-3, 4] };
  });
  return wants;
}

})()
