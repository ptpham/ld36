
(function () {

function template() {
  return '<hover-text><name></name><info></info></hover-text>';
}

function redrawSlot(slot) {
  var item = meta.items.all[+slot.dataset.id];
  var name = '', info = '';

  if (item != null) {
    name = item.name;
    info = item.info;
    slot.classList.toggle('goal', item.goal ? true : false);
    slot.style.backgroundPosition = '0px -' + ((2 + item.id) * 64) + 'px';
  }

  slot.querySelector('name').innerHTML = name;
  slot.querySelector('info').innerHTML = info;
}

var render = new MutationObserver(function(records) {
  for (var record of records) {
    var target = record.target;
    if (record.attributeName == 'data-id') redrawSlot(target);
  }
});

for (var slot of document.querySelectorAll('item-slot')) {
  slot.innerHTML = template();
  render.observe(slot, { attributes: true });
  redrawSlot(slot);
}

})()

