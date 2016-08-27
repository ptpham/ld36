
utilities.encounter = (function() {
  
  function applyEnvironment(environment, encounter) {
    encounter = encounter || document.querySelector('encounter');
    encounter.setAttribute('class', 'environment'); 
  }

  function applyPerson(person, encounter) {
    encounter = encounter || document.querySelector('encounter');
    encounter.setAttribute('class', 'person'); 
  }

  return {
    applyEnvironment,
    applyPerson
  };
})();

