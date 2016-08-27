
(function() {

var swappablePairs = [
  [elements.inventory.slots, elements.offer.slots],
  [elements.encounter.slots, elements.request.slots]
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

  var swap = src.dataset.item;
  src.dataset.item = dst.dataset.item;
  dst.dataset.item = swap;
});

})();

