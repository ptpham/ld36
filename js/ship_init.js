
(function() {

  function findCandidatePositions(imageData, size) {
    var height = imageData.height;
    var width = imageData.width;

    var countX = Math.floor(width / size);
    var countY = Math.floor(height / size);

    var result = [];
    var threshold = size*size / 2;
    for (var i = 0; i < countX; i++) {
      for (var j = 0; j < countY; j++) {
        var current = 0;
        for (var m = 0; m < size; m++) {
          for (var n = 0; n < size; n++) {
            var alpha = imageData.data[4*(size*i + m + width*(size*j + n)) + 3];
            if (alpha > 128) current++;
          }
        }

        if (current > threshold) {
          result.push([100*size*i/width, 100*size*j/height]);
        }
      }
    }

    if (result.length == 0) {
      for (var i = 0; i < countX; i++) {
        for (var j = 0; j < countY; j++) {
          result.push([100*size*i/width, 100*size*j/height]);
        }
      }
    }

    return result;
  }

  function getImageData(img) {  
    var canvas = document.createElement('canvas');
    var height = canvas.height = img.height;
    var width = canvas.width = img.width;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    try {
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch(e) {
      return { width, height, data: [] };
    }
  }

  function loadImage(url, callback) {
    var img = new Image();
    return new Promise(function(resolve, reject) {
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (e) => reject(e));
      img.src = url;
      return img;
    });
  }

  var goals = _.sampleSize(meta.items.goals, constants.goals.count);
  var slots = elements.ship.slots;
  for (var i = 0; i < goals.length; i++) {
    var slot = document.createElement('item-slot');
    slot.classList.add('goal');
    slots.appendChild(slot);
    slot.dataset.id = goals[i].id;
  }

  // Position the ship item-slots after the image loads
  loadImage('img/ship0.png').then(function(img) {
    var positions = findCandidatePositions(getImageData(img), 64/2.5);
    var selected = _.sampleSize(positions, goals.length);
    var slots = elements.ship.slots.children;

    for (var i = 0; i < slots.length && i < selected.length; i++) {
      var slot = slots[i];
      slot.style.top = selected[i][1] + '%';
      slot.style.left = selected[i][0] + '%';
    }
  });

})()

