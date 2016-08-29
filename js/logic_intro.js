(function () {
  var intro = document.querySelector('intro');
  var ship = document.querySelector('ship');

  var messages = [
    "After a sick space parkour trick, you lost control of your ship.",
    "It's plummeting toward a blue-ish brown planet.",
    ["Let's check on your ship (Space)", allowShipToggle],
    "It appears to be quite damaged. You'll need to find the parts to fix it.",
    "You can try scavenging, but there isn't much around. Maybe the locals will help you get what you need.",
    "Drag items to move them. In most cases, clicking moves the item automatically."
  ];

  var messageIndex = 0;
  var timeout;
  var closeDialog = utilities.dialog.close;
  var showDialog = utilities.dialog.show;

  function fadeImage() {
    intro.classList.remove('start');
  }

  function hideIntro() {
    document.body.classList.remove('intro');
    ship.classList.remove('expanded');
    closeDialog();
    if (timeout) clearTimeout(timeout);
  }

  function allowShipToggle() {
    intro.style.zIndex = 8;
    fadeImage();
    var onToggleShip = function () {
      closeDialog();
      showNext();
      document.removeEventListener('ship:toggle', onToggleShip);
    };

    showNext();
    document.addEventListener('ship:toggle', onToggleShip);
  }

  intro.classList.add('start');

  function showNext() {
    if (timeout) return timeout;
    if (messageIndex >= messages.length) {
      return hideIntro();
    }
    timeout = setTimeout(() => {
      var text = messages[messageIndex++];
      if (text instanceof Array) {
        showDialog(text[0], true);
        text[1]();
      }
      else showDialog(text);
      timeout = null;
    }, 1000);
  }

  showNext();

  function skipIntro(e) {
    if (e.keyCode == 27) {
      hideIntro();
      document.removeEventListener('keydown', skipIntro);
    }
  }

  document.addEventListener('keydown', skipIntro);

  document.addEventListener('click', function(e) {
    if (!e.target.matches('button[data-intent="skip"]')) return;
    hideIntro();
  });

  document.addEventListener('click', function(e) {
    if (!e.target.matches('button[data-intent="dialog"]')) return;
    closeDialog();
    showNext();
  });

})()
