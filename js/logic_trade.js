
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
  var swap = src.dataset.id;

  src.dataset.id = dst.dataset.id;
  if (dst.dataset.id == null) delete src.dataset.id;

  dst.dataset.id = swap;
  if (swap == null) delete dst.dataset.id;
});

})();

