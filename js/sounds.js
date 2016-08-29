
(function() {
  
var rejects = ['male_reject_0', 'female_reject_0'];
var accepts = ['male_accept_0', 'female_accept_0'];

function createAudio(name) {
  var result = new Audio();
  result.src = 'audio/' + name + '.mp3';
  return result;
}

sounds.accepts = _.map(accepts, createAudio);
sounds.rejects = _.map(rejects, createAudio);

})();

