
(function() {

document.addEventListener('click', function(e) {
  var ship = e.target.closest('ship');
  if (ship == null) return;

  if (ship.querySelector('expand').contains(e.target)) {
    ship.classList.add('expanded');
  } else if (ship.querySelector('collapse').contains(e.target)) {
    ship.classList.remove('expanded');
  }
});

})();

