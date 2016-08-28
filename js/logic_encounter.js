
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

    var greeting = meta.text.scavenge[environment.greeting](environment);

    encounter.querySelector('speech').dataset.text = greeting;
    
    var slots = encounter.querySelector('available.environment slots');
    utilities.inventory.setItemsInSlots(slots, environment.inventory);
  }

  function applyPerson(person, encounter) {
    encounter = encounter || document.querySelector('encounter');
    encounter.setAttribute('class', 'person');

    var greeting = meta.text.greetings[person.greeting](person);
    var garbled = utilities.symbols.garble(greeting);

    encounter.querySelector('speech').dataset.text = garbled;

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

document.addEventListener('click', function(e) {
  if (!e.target.matches('button[data-intent="learn"]')) return;
  var learned = utilities.dictionary.learnRandomWord();
  var encounter = document.querySelector('encounter');
  var speech = encounter.querySelector('speech');

  var text = `
    You knew the space probe would come in handy some day.

    You approach the subject, probe in hand. Eventually, you
    manage to probe out a single word after some amount of concentration.

    <span class="garbled">${utilities.symbols.getSymbol(learned.actual)}</span>?

    ...<strong>${learned.actual}</strong>!

    Too bad the subject ran off!
  `;
  encounter.setAttribute('class', 'person complete');
  speech.innerHTML = text;
});

utilities.encounter.newEncounter();

