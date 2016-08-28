
utilities.encounter = (function() {

  var currentEncounter;

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
    return encounter;
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

  function newEncounter() {
    currentEncounter = applyEncounter(generate());
    return currentEncounter;
  }

  function getCurrentEncounter() {
    return currentEncounter;
  }

  return {
    applyEncounter,
    applyEnvironment,
    applyPerson,
    newEncounter,
    generate,
    getCurrentEncounter
  };
})();

document.addEventListener('click', function(e) {
  if (!e.target.matches('button[data-intent="leave"]')) return;
  var available = document.querySelector('available slots');
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
  encounter.setAttribute('class', 'person complete flavor');
  speech.innerHTML = text;
});

document.addEventListener('click', function(e) {
  if (!e.target.matches('button[data-intent="propose"]')) return;
  var encounter = document.querySelector('encounter');
  var speech = encounter.querySelector('speech');
  var offerSlots = document.querySelector('trade-area offer slots');
  var requestSlots = document.querySelector('trade-area request slots');
  var person = utilities.encounter.getCurrentEncounter().person;
  var appraise = utilities.person.appraise;

  var offer = utilities.inventory.getItemsInSlots(offerSlots);
  var request = utilities.inventory.getItemsInSlots(requestSlots);

  var success = appraise(person, offer, request);
  var greeting = success ? meta.text.accepted[person.accepted](person) :
      meta.text.rejected[person.rejected](person);

  var outro = success ? 'The creature seemed content.' : 'The creature did not seem happy with the offer.';

  encounter.setAttribute('class', 'person complete');
  speech.setAttribute('text', greeting);
  speech.innerHTML += `<strong>${outro}</strong>`;

  if (success) {
    request.forEach(utilities.inventory.putItemInInventory);
  } else {
    offer.forEach(utilities.inventory.putItemInInventory);
  }

  utilities.inventory.clearSlots(offerSlots);
  utilities.inventory.clearSlots(requestSlots);
});

utilities.encounter.newEncounter();

