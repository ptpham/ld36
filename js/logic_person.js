utilities.person = (function () {

var generateItemsFromOptions = utilities.inventory.generateItemsFromOptions;
var tradeable = meta.items.tradeable;
var resources = meta.items.resources;
var appealing = meta.items.appealing;
var crafted = meta.items.crafted;
var rare = meta.items.rare;

var objgen = utilities.objgen;

function shiftWants(wants, list, amount) {
  list.forEach(item => {
    wants[item.name].$integer[0] += amount;
    wants[item.name].$integer[1] += amount;
  });
  return wants;
}

function makeUniformWants(items, begin, end) {
  var wants = {};
  items.forEach(function (item) {
    wants[item.name] = { $integer: [begin, end] };
  });

  return wants;
}

function makeDefaultWants() {
  var result = makeUniformWants(tradeable, -3, 3);
  return result;
}

function makeEpicureanWants() {
  var result = makeDefaultWants();
  shiftWants(result, appealing, 3);
  return result;
}

function makeNobleWants() {
  var result = makeDefaultWants();
  shiftWants(result, rare, 3);
  return result;
}

function makeCommonWants() {
  var result = makeDefaultWants();
  shiftWants(result, crafted, 3);
  return result;
}

function makeScavengerWants() {
  var result = makeDefaultWants();
  shiftWants(result, resources, 3);
  return result;
}

var defaultWants = makeDefaultWants();

var generateObj = objgen.compile([{
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
  wants: defaultWants,
}, {
  // curmudgeons
  $conditions: { desire: {$lt: 0} },
  greeting: { $integer: [0, 3]},
  accepted: { $integer: [0, 3]},
  rejected: { $integer: [0, 3]},
}, {
  // normal
  $conditions: { desire: {$eq: 0} },
  greeting: { $integer: [3, 6]},
  accepted: { $integer: [3, 6]},
  rejected: { $integer: [3, 6]},
}, {
  // fanatic
  $conditions: { desire: {$gt: 0} },
  greeting: { $integer: [6, 9]},
  accepted: { $integer: [6, 9]},
  rejected: { $integer: [6, 9]}
}, {
  // scavenger
  $conditions: { costume: { $in: [3] } },
  wants: makeScavengerWants()
}, {
  // common
  $conditions: { costume: { $in: [1,5] } },
  wants: makeCommonWants()
}, {
  // epicurean
  $conditions: { costume: { $in: [0,4] } },
  wants: makeEpicureanWants()
}, {
  // noble
  $conditions: { costume: { $in: [2] } },
  wants: makeNobleWants() 
}]);

function makeDefaultInventoryOptions() {
  var result = _.chain(tradeable).map(item => [item.name, 5]).fromPairs().value();
  for (var item of rare) result[item.name] -= 2;
  return result;
}

function makeScavengerInventoryOptions() {
  var result = makeDefaultInventoryOptions();
  for (var item of resources) result[item.name] += 30;
  for (var item of appealing) result[item.name] += 10;
  return result;
}

function makeCommonInventoryOptions() {
  var result = makeDefaultInventoryOptions();
  for (var item of appealing) result[item.name] += 30;
  for (var item of crafted) result[item.name] += 10; 
  return result;
}

function makeEpicureanInventoryOptions() {
  var result = makeDefaultInventoryOptions();
  for (var item of crafted) result[item.name] += 30; 
  for (var item of rare) result[item.name] += 10;
  return result;
}

function makeNobleInventoryOptions() {
  var result = makeDefaultInventoryOptions();
  for (var item of rare) result[item.name] += 10;
  for (var item of crafted) result[item.name] += 30;
  return result;
}

var scavengerOptions = makeScavengerInventoryOptions();
var epicureanOptions = makeEpicureanInventoryOptions();
var commonOptions = makeCommonInventoryOptions();
var nobleOptions = makeNobleInventoryOptions();
var allInventoryOptions = [epicureanOptions, commonOptions, nobleOptions,
  scavengerOptions, epicureanOptions, commonOptions];

function generate() {
  var person = generateObj();
  person.inventory = generateItemsFromOptions(allInventoryOptions[person.costume], person.carry);
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
  var mapObj = (obj, item) => {
    obj[item.id] = item;
    return obj;
  };

  var determineValue = function (sum, item) {
    if (!item) return sum;
    var value = person.wants[item.name];
    if (item.id in appealingMap) value += 1;
    if (item.id in craftedMap) value += 8;
    if (item.id in rareMap) value += 24;
    return sum + value;
  };

  var appealingMap = _.reduce(appealing, mapObj, {});
  var craftedMap = _.reduce(crafted, mapObj, {});
  var rareMap = _.reduce(rare, mapObj, {});
  var numOffer = offerTo.length;
  var numRequest = requestFrom.length;

  var likeOffered = _.reduce(offerTo, determineValue, 0);
  var likeRequest = _.reduce(requestFrom, determineValue, 0);

  if (numOffer < 1) likeOffered -= 3;
  if (numOffer < numRequest) likeOffered -= numRequest - numOffer;
  return likeOffered > likeRequest;
}

return {
  generate,
  getDeepestDesire,
  getDeepestDislike,
  appraise
};

})()
