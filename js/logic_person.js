utilities.person = (function () {

var wants = constructWants(meta.items.all);
var objgen = utilities.objgen;

function constructWants(items) {
  var wants = {};
  items.forEach(function (item) {
    wants[item.name] = { $integer: [-3, 4] };
  });
  return wants;
}

var generate = objgen.compile([{
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

function getDeepestDesire(person) {
  var highest = -4;
  var desired = '';
  _.forOwn(person.wants, function (value, item) {
    if (value > highest) {
      highest = value;
      desired = item;
    }
  });
  return desired;
}

function getDeepestDislike(person) {
  var lowest = 4;
  var disliked = '';
  _.forOwn(person.wants, function (value, item) {
    if (value < lowest) {
      lowest = value;
      disliked = item;
    }
  });
  return disliked;
}

return {
  generate,
  getDeepestDesire,
  getDeepestDislike
};

})()
