utilities.dialog = (function () {
  var dialog = document.querySelector('dialog');
  var message = dialog.querySelector('message');
  var button = dialog.querySelector('button');

  function close() {
    dialog.classList.remove('show');
    message.innerHTML = '';
    button.removeAttribute('disabled');
  }

  function show(string, disableContinue) {
    message.innerHTML = string;
    dialog.classList.add('show');
    if (disableContinue) button.setAttribute('disabled', true);
  }

  return {
    close,
    show
  };
})()
