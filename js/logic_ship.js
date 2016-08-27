
(function() {

document.addEventListener('click', function(e) {
  var ship = e.target.closest('ship');
  if (ship == null) return;

  if (ship.querySelector('expand').contains(e.target)) {
    ship.classList.add('expanded');
  } else if (ship.querySelector('collapse').contains(e.target)) {
    ship.classList.remove('expanded');
  }
});

document.addEventListener('item-slot:swap', function(e) {
  var src = e.detail.src;
  var dst = e.detail.dst;
  
  if (!elements.ship.slots.contains(dst)) return;
  if (!elements.inventory.slots.contains(src)) return;

  var target = meta.items.all[dst.dataset.id];
  var candidate = meta.items.all[src.dataset.id];

  if (target.goal == candidate.name) {
    dst.dataset.id = src.dataset.id;
  }
  delete src.dataset.id;
});

})();

