
objgen = (function() {

function evalComparison(obj, key, value) {
  if (key == '$gt') return obj > value;
  if (key == '$gte') return obj >= value;
  if (key == '$lt') return obj < value;
  if (key == '$lte') return obj <= value;
  if (key == '$eq') return obj == value;
  if (key == '$substr') return obj.indexOf(value) != -1;
  return false;
}

function evalConditions(obj, conditions) {
  if (conditions == null) return true;
  if (obj == null) return false;
  
  for (var key in conditions) {
    if (key[0] != '$') {
      if (!evalConditions(obj[key], conditions[key])) return false;
    } else if (!evalComparison(obj, key, conditions[key])) {
      return false;
    }
  }
  return true;
}

function sampleOptions(options) {
  var total = 0, value = null;

  for (var key in options) {
    var weight = options[key];
    var threshold = weight / (total + weight);
    if (Math.random() < threshold) value = key;
    total += weight;
  }

  return value;
}

function sampleFloat(range) {
  return (range[1] - range[0])*Math.random() + range[0];
}

function sampleInteger(range) {
  return Math.floor(sampleFloat(range));
}

function compile(schema) {
  if (schema instanceof Array) {
    var parts = schema.map(compile);
    return function(obj) {
      for (var i = 0; i < parts.length; i++) {
        obj = parts[i](obj);
      }
      return obj;
    }
  }

  var children = {};
  for (var key in schema) {
    if (key[0] == '$') continue;
    children[key] = compile(schema[key]);
  }

  return function(obj) {
    if ('$options' in schema) return sampleOptions(schema['$options']);
    if ('$integer' in schema) return sampleInteger(schema['$integer']);
    if ('$float' in schema) return sampleFloat(schema['$float']);
    obj = obj || {};

    if (!evalConditions(obj, schema['$conditions'])) return obj;
    for (var key in children) obj[key] = children[key](obj);
    return obj;
  }
}

return { compile };

})();

