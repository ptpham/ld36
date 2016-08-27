
(function () {

var render = new MutationObserver(function(records) {
  for (var record of records) {
    var target = record.target;
    if (record.attributeName == 'data-item') {
      target.innerHTML = target.dataset.item;
    }
  }
});

for (var slot of document.querySelectorAll('item-slot')) {
  render.observe(slot, { attributes: true });
}

var i = 0;
for (var slot of document.querySelectorAll('item-slot')) {
  slot.dataset.slot = i++;
  slot.dataset.item = '';
}

})()

