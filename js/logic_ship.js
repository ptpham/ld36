
(function() {

function detectVictory() {
  var slots = elements.ship.slots.children;
  for (var slot of slots) {
    if (utilities.inventory.getItemById(+slot.dataset.id).goal) {
      return false;
    }
  }
  return true;
}

document.addEventListener('click', function(e) {
  var ship = e.target.closest('ship');
  if (ship == null) return;

  if (ship.querySelector('.expander').contains(e.target)) {
    document.dispatchEvent(new CustomEvent('ship:toggle'));
  } else if (ship.querySelector('.collapser').contains(e.target)) {
    document.dispatchEvent(new CustomEvent('ship:toggle'));
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

document.addEventListener('ship:toggle', function (e) {
  var ship = document.querySelector('ship');
  ship.classList.toggle('expanded');
});

document.addEventListener('keypress', function(e) {
  if (e.keyCode == 32) {
    document.dispatchEvent(new CustomEvent('ship:toggle'));
  }
});

})();

