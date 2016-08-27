
(function () {

for (var slot of document.querySelectorAll('item-slot')) {
  slot.setAttribute('draggable', true);
}

var dragged = null;
document.addEventListener('dragstart', function(e) {
  var slot = e.target.closest('item-slot');
  if (slot == null) return;

  e.dataTransfer.setData('text/plain', slot.dataset.item);
  dragged = slot;
});

document.addEventListener("dragover", function(e) {
  e.preventDefault();
});

document.addEventListener('drop', function(e) {
  var slot = e.target.closest('item-slot');
  if (slot == null || dragged == null) return;
  document.dispatchEvent(new CustomEvent('item-slot:swap',
    { detail: { src: dragged, dst: slot }, bubbles: true }));
  dragged = null;
});

})()

