
(function() {

var swappablePairs = [
  [elements.inventory.slots, elements.offer.slots],
  [elements.environment.slots, elements.inventory.slots],
  [elements.person.slots, elements.request.slots],
];

var swappable = new Map();

function addSwappableEntry(first, second) {
  if (!swappable.has(first)) swappable.set(first, new Set());
  swappable.get(first).add(second);
}

swappablePairs.forEach(pair => {
  addSwappableEntry(pair[0], pair[1]);
  addSwappableEntry(pair[1], pair[0]);
});

document.addEventListener('item-slot:swap', function(e) {
  var src = e.detail.src;
  var dst = e.detail.dst;
  var srcParent = src.parentElement;
  var dstParent = dst.parentElement;

  if (srcParent != dstParent &&
    !swappable.get(srcParent).has(dstParent)) return;
  
  utilities.inventory.swapSlots(dst, src);
});

// In general, if there is only one place for an item to go move it there on a click.
document.addEventListener('click', function(e) {
  var slot = e.target.closest('item-slot');
  if (slot == null) return;

  var slots = slot.parentElement; 
  var candidates = swappable.get(slots);
  if (!candidates || candidates.size != 1) return;
  
  var target = Array.from(candidates)[0];
  var empty = utilities.inventory.findEmptySlot(target.querySelectorAll('item-slot'));
  utilities.inventory.swapSlots(empty, slot);
});

// Special case for inventory transfer into offer slots and environment slots.
document.addEventListener('click', function(e) {
  var slot = e.target.closest('item-slot');
  if (slot == null) return;

  if (document.querySelector('ship').classList.contains('expanded')) return;
  if (!elements.inventory.slots.contains(slot)) return;
  
  var encounter = document.querySelector('encounter');
  if (encounter.classList.contains('complete')) return;
  if (encounter.classList.contains('person')) {
    var target = elements.offer.slots;
  } else {
    var target = elements.environment.slots;
  }
  var empty = utilities.inventory.findEmptySlot(target.querySelectorAll('item-slot'));
  utilities.inventory.swapSlots(empty, slot);
});

})();

