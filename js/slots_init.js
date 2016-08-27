
(function () {

function makeSlots(target, count) {
  for (var i = 0; i < count; i++) {
    target.appendChild(document.createElement('item-slot'));
  }
}

makeSlots(elements.inventory.slots, constants.inventory.size);
makeSlots(elements.request.slots, constants.request.size);
makeSlots(elements.offer.slots, constants.offer.size);

})()

