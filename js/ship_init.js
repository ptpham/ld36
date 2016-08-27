
(function() {
  var goals = _.sampleSize(meta.items.goals, constants.goals.count);
  var slots = elements.ship.slots;

  for (var i = 0; i < goals.length; i++) {
    var slot = document.createElement('item-slot');
    slot.dataset.name = goals[i].name;
    slot.dataset.hint = goals[i].goalHint;
    slots.appendChild(slot);
  }
})()

