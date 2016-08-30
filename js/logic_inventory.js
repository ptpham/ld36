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
      options[item.name] = 3;
    });
    return options;
  }

  function generateItems(items, number) {
    var options = constructOptions(items);
    return generateItemsFromOptions(options, number);
  }

  function generateItemsFromOptions(options, number) {
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
    if (slot == null) return null;
    slot.dataset.id = item.id;
    return item;
  }

  function getItemInSlot(slot) {
    return getItemById(slot.dataset.id);
  }

  function getInventorySlots() {
    return document.querySelectorAll(`inventory item-slot`);
  }

  function getInventory() {
    var inventory = [];
    var slots = getInventorySlots();
    for (var slot of slots) {
      inventory.push(getItemInSlot(slot));
    }
    return inventory;
  }

  function isEmpty(slot) {
    return slot.dataset.id == null || slot.dataset.id == 'undefined';
  }

  function findEmptySlot(slots) {
    for (var slot of slots) {
      if (isEmpty(slot)) return slot;
    }
    return null;
  }

  function putItemInInventory(item) {
    if (typeof item == 'number') item = getItemById(item);
    if (item == null) return null;

    var slots = getInventorySlots();
    var empty = findEmptySlot(slots);
    return putItemInSlot(empty, item);
  }

  function clearSlots(slots) {
    _.each(slots.children, function(child) { delete child.dataset.id; });
  }

  function setItemsInSlots(slots, items) {
    clearSlots(slots);
    for (var i = 0; i < items.length && i < slots.children.length; i++) {
      slots.children[i].dataset.id = items[i].id;
    }
  }

  function getItemsInSlots(slots) {
    var items = [];
    for (var i = 0; i < slots.children.length; i++) {
      items.push(slots.children[i].dataset.id);
    }
    return _.compact(_.map(items, getItemById));
  }

  function swapSlots(dst, src) {
    if (dst == null || src == null) return false;
    if (isEmpty(dst) && isEmpty(src)) return false;
    var swap = src.dataset.id;
    src.dataset.id = dst.dataset.id;
    dst.dataset.id = swap;
    return true;
  }

  function contains(inventory, checklist) {
    var toId = (item) => item.id;
    var inventoryIds = inventory.map(toId);
    var checklistIds = checklist.map(toId);
    inventoryIds.forEach(function (id) {
      var index = _.indexOf(checklistIds, id);
      if (index > -1) {
        checklistIds.splice(index, 1);
      }
    });
    return !checklistIds.length;
  }

  return {
    getItem,
    getItemById,
    getInventory,
    putItemInInventory,
    generateItems,
    generateItemsFromOptions,
    setItemsInSlots,
    getItemsInSlots,
    findEmptySlot,
    swapSlots,
    clearSlots,
    contains
  };
})()
