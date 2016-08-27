
(function () {

function template() {
  return '<hover-text><name></name><info></info></hover-text><image></image>';
}

var render = new MutationObserver(function(records) {
  for (var record of records) {
    var target = record.target;
    if (record.attributeName == 'data-item') {
      var item = meta.items.all[target.dataset.id];
      var name = '', info = '';

      if (item != null) {
        name = item.name;
        info = item.info;
      }

      target.querySelector('name').innerHTML = name;
      target.querySelector('info').innerHTML = info;
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

