(function () {
  var closeDialog = utilities.dialog.close;
  var showDialog = utilities.dialog.show;

  document.addEventListener('game:victory', function() {
    document.querySelector('ending').style.removeProperty('display'); 
    closeDialog();
    showDialog("Congratulations! You're on your way home!", true);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.matches('button[data-intent="play"]')) return;
    window.location.reload();
  });
})()
