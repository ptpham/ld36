
utilities.encounter = (function() {

  function generate() {
    var personProbaility =  0.5;
    if (Math.random() < personProbaility) {
      return { person: utilities.person.generate() };
    }
    return { environment: utilities.environment.generate() };
  }

  function applyEncounter(encounter) {
    if (encounter.person != null) {
      applyPerson(encounter.person);
    } else if (encounter.environment != null) {
      applyEnvironment(encounter.environment);
    }
  }

  function applyEnvironment(environment, encounter) {
    encounter = encounter || document.querySelector('encounter');
    encounter.setAttribute('class', 'environment'); 
    
    var slots = encounter.querySelector('available.environment slots');
    utilities.inventory.setItemsInSlots(slots, environment.inventory);
  }

  function applyPerson(person, encounter) {
    encounter = encounter || document.querySelector('encounter');
    encounter.setAttribute('class', 'person'); 

    var slots = encounter.querySelector('available.person slots');
    utilities.inventory.setItemsInSlots(slots, person.inventory);
  }

  function newEncounter() { applyEncounter(generate()); }

  return {
    applyEncounter,
    applyEnvironment,
    applyPerson,
    newEncounter,
    generate,
  };
})();

document.addEventListener('click', function(e) {
  if (!e.target.matches('button[data-intent="leave"]')) return;
  utilities.encounter.newEncounter();
});

utilities.encounter.newEncounter();

