
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

document.addEventListener('click', function(e) {
  var slot = e.target.closest('item-slot');
  if (slot == null) return;

  var slots = slot.parentElement; 
  var candidates = swappable.get(slots);
  if (!candidates || candidates.size != 1) return;
  
  var target = Array.from(candidates)[0];
  var empty = utilities.inventory.findEmptySlot(target.children);
  utilities.inventory.swapSlots(empty, slot);
});

})();

