
(function() {
  var goals = _.sampleSize(meta.items.goals, constants.goals.count);
  var slots = elements.ship.slots;

  for (var i = 0; i < goals.length; i++) {
    var slot = document.createElement('item-slot');
    slot.classList.add('goal');
    slot.dataset.id = goals[i].id;
    slots.appendChild(slot);
  }
})()

