utilities.inventory = (function () {

  var items = meta.items.all;
  var rares = meta.items.rare;
  var objgen = utilities.objgen;

  function constructOptions(items) {
    var options = {};
    items.forEach(function (item) {
      options[item.name] = 10;
    });
    rares.forEach(function (item) {
      if (!options[item.name]) return;
      options[item.name] = 1;
    });
    return options;
  }

  function generateItems(items, number) {
    var options = constructOptions(items);
    var generate = objgen.compile([{
      item: { $options: options }
    }]);
    var generated = [];
    var item;
    for (var i = 0; i < number; i++) {
      item = getItem(generate().item);
      generated.push(item);
    }
    return generated;
  }

  function getItem(name) {
    var found = false;
    items.some(function (item) {
      if (item.name === name) found = item;
      return found;
    });
    return found;
  }

  function getItemById(id) {
    return meta.items.all[id];
  }

  function putItemInSlot(slot, item) {
    slot.dataset.id = item.id;
    return item;
  }

  function getItemInSlot(slot) {
    return getItemById(slot.dataset.id);
  }

  function getInventorySlots(className) {
    className = className || 'own';
    return document.querySelectorAll(`inventory.${className} item-slot`);
  }

  function getInventory() {
    var inventory = [];
    var slots = getInventorySlots();
    for (var slot of slots) {
      inventory.push(getItemInSlot(slot));
    }
    return inventory;
  }

  function putItemInInventory(item) {
    var slots = getInventorySlots();
    var empty;
    for (var slot of slots) {
      if (!slot.dataset.item) {
        empty = slot;
        break;
      }
    }

    empty.dataset.id = item.id;
    return putItemInSlot(empty, item);
  }

  return {
    getItem,
    getInventory,
    putItemInInventory,
    generateItems
  };
})()
