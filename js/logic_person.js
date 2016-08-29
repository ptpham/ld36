utilities.person = (function () {

var generateItems = utilities.inventory.generateItems;
var tradeable = meta.items.tradeable;
var wants = constructWants(tradeable, meta.items.appealing);
var objgen = utilities.objgen;

function constructWants(items, appealing) {
  var wants = {};
  items.forEach(function (item) {
    wants[item.name] = { $integer: [-3, 4] };
  });
  appealing.forEach(function (item) {
    wants[item.name].$integer[0] += 1;
  });
  return wants;
}

var generateObj = objgen.compile([{
  name: { $options: { 'bob': 10, 'alice': 20 } },
  age: { $integer: [5, 60] },
  desire: { $integer: [-1, 2] },
  carry: { $integer: [2, 6] },
  env: {
    $options: {
      'clearing': 5,
      'grove': 5,
      'cliffside': 5,
      'creek': 5,
      'rockpile': 5,
      'hillside': 5
    }
  },
  costume: { $integer: [0, 6] },
  wants: wants
}, {
  // curmudgeons
  $conditions: { desire: {$lt: 0} },
  greeting: { $integer: [0, 3]},
  accepted: { $integer: [0, 3]},
  rejected: { $integer: [0, 3]}
}, {
  // normal
  $conditions: { desire: {$eq: 0} },
  greeting: { $integer: [3, 6]},
  accepted: { $integer: [3, 6]},
  rejected: { $integer: [3, 6]}
}, {
  // fanatic
  $conditions: { desire: {$gt: 0} },
  greeting: { $integer: [6, 9]},
  accepted: { $integer: [6, 9]},
  rejected: { $integer: [6, 9]}
}]);

function generate() {
  var person = generateObj();
  person.inventory = generateItems(tradeable, person.carry);
  return person;
}

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

function appraise(person, offerTo, requestFrom) {
  var numOffer = offerTo.length;
  var numRequest = requestFrom.length;

  var likeOffered = _.reduce(offerTo, function (sum, item) {
    if (!item) return sum;
    return sum + person.wants[item.name] + person.desire;
  }, 0);

  var likeRequest = _.reduce(requestFrom, function (sum, item) {
    if (!item) return sum;
    return sum + person.wants[item.name] + person.desire;
  }, 0);

  if (numOffer < 1) likeOffered -= 3;
  if (numOffer < numRequest) likeOffered -= (numRequest - numOffer) * 1;
  return likeOffered > likeRequest;
}

return {
  generate,
  getDeepestDesire,
  getDeepestDislike,
  appraise
};

})()
