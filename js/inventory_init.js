(function () {

  var items = meta.items.all;

  function getItem(name) {
    var found = false;
    items.some(function (item) {
      if (item.name === name) found = item;
      return found;
    });
    return found;
  }

  function putItemInSlot(slot, item) {
    slot.dataset.item = item.name;
    return item;
  }

  function getItemInSlot(slot) {
    return getItem(slot.dataset.item);
  }

  function getInventorySlots() {
    return document.querySelectorAll('inventory item-slot');
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
    return putItemInSlot(empty, item);
  }

  utilities.getItem = getItem;
  utilities.getInventory = getInventory;
  utilities.putItemInInventory = putItemInInventory;
})()
