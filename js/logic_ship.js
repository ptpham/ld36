
(function() {

function detectVictory() {
  var slots = elements.ships.slots.children;
  for (var i = 0; i < slots.length; i++) {
    if (slots[i].dataset.id == null) return false;
  }
  return true;
}

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
  if (candidate == null || target.goal == null) return;

  if (target.goal == candidate.name) {
    dst.dataset.id = src.dataset.id;
  }
  delete src.dataset.id;

  if (detectVictory()) {
    this.dispatchEvent(new CustomEvent('game:victory', { bubbles: true }));
  }
});

})();

