
(function () {

for (var slot of document.querySelectorAll('item-slot')) {
  slot.setAttribute('draggable', true);
}

var dragged = null;
document.addEventListener('dragstart', function(e) {
  if (!e.target.matches('item-slot')) return;
  e.dataTransfer.setData('text/plain', e.target.dataset.item);
  dragged = e.target;
});

document.addEventListener("dragover", function(e) {
  e.preventDefault();
});

document.addEventListener('drop', function(e) {
  if (!e.target.matches('item-slot') || dragged == null) return;
  document.dispatchEvent(new CustomEvent('item-slot:swap',
    { detail: { src: dragged, dst: e.target }, bubbles: true }));
});

})()

