
(function () {

function template() {
  return '<hover-text><name></name><info></info></hover-text><image></image>';
}

var render = new MutationObserver(function(records) {
  for (var record of records) {
    var target = record.target;
    if (record.attributeName == 'data-item') {
      target.querySelector('name').innerHTML = target.dataset.item;
      target.querySelector('info').innerHTML = target.dataset.info || '';
    }
  }
});

for (var slot of document.querySelectorAll('item-slot')) {
  slot.innerHTML = template();
  render.observe(slot, { attributes: true });
}

var i = 0;
for (var slot of document.querySelectorAll('item-slot')) {
  slot.dataset.slot = i++;
  slot.dataset.item = '';
}

})()

