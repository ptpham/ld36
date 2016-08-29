
utilities.encounter = (function() {

  var currentEncounter;

  function generate() {
    var personProbaility =  0.5;
    if (Math.random() < personProbaility) {
      return { type: 'person', person: utilities.person.generate() };
    }
    return { type: 'environment', environment: utilities.environment.generate() };
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

    elements.encounter.img.src = 'img/' + environment.name + '.png';
  }

  function applyPerson(person, encounter) {
    encounter = encounter || document.querySelector('encounter');
    encounter.setAttribute('class', 'person');

    var greeting = meta.text.greetings[person.greeting](person);
    var garbled = utilities.symbols.garble(greeting);

    encounter.querySelector('speech').dataset.text = garbled;

    var slots = encounter.querySelector('available.person slots');
    utilities.inventory.setItemsInSlots(slots, person.inventory);
    elements.encounter.img.src = 'img/' + person.env + '.png';
    elements.encounter.person.setAttribute('data-desire', person.desire);
    elements.encounter.costume.setAttribute('data-costume', person.costume);
  }

  function newEncounter() {
    currentEncounter = applyEncounter(generate());
    return currentEncounter;
  }

  function getCurrentEncounter() {
    return currentEncounter;
  }

function transferOfferBackToInventory() {
  utilities.inventory.getItemsInSlots(elements.offer.slots).forEach(item => 
    utilities.inventory.putItemInInventory(item));
}

var intentMap = {
  leave: () => {
    var available = document.querySelector('available slots');
    var offerSlots = document.querySelector('trade-area offer slots');
    var requestSlots = document.querySelector('trade-area request slots');
    transferOfferBackToInventory();

    utilities.inventory.clearSlots(offerSlots);
    utilities.inventory.clearSlots(requestSlots);
    utilities.inventory.clearSlots(available);
    utilities.encounter.newEncounter();
  },

  learn: () => {
    var learned = utilities.dictionary.learnRandomWord();
    var encounter = document.querySelector('encounter');
    var speech = encounter.querySelector('speech');

    transferOfferBackToInventory();
    utilities.inventory.clearSlots(elements.offer.slots);

    var text = 
`You knew the space probe would come in handy some day.

You approach the subject, probe in hand. Eventually, you manage to probe out a single word after some amount of concentration.

<span class="garbled">${utilities.symbols.getSymbol(learned.actual)}</span>?

...<strong class="special">${learned.actual}</strong>!

Too bad the subject ran off!`;
    encounter.setAttribute('class', 'person complete flavor');
    speech.innerHTML = text;
  },

  propose: () => {
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
    var garbled = utilities.symbols.garble(greeting);

    var outro = success ? 'The creature seemed content.' : 'The creature did not seem happy with the offer.';

    encounter.setAttribute('class', 'person complete');
    speech.setAttribute('data-text', garbled);
    setTimeout(() => {
      speech.innerHTML += `\n\n<strong>${outro}</strong>`;
    }, 1);

    if (success) {
      request.forEach(utilities.inventory.putItemInInventory);
    } else {
      transferOfferBackToInventory();
    }
    utilities.inventory.clearSlots(elements.offer.slots);
  },

  take_all: () => {
    var encounter = document.querySelector('encounter.environment');
    if (encounter == null) return;
    var slots = encounter.querySelector('available.environment slots');
    for (var i = 0; i < slots.children.length; i++) {
      var slot = slots.children[i];

      if (slot.dataset.id == null) continue;
      var item = utilities.inventory.putItemInInventory(+slot.dataset.id);
      if (item != null) delete slot.dataset.id;
    }
  }
};

document.addEventListener('keypress', function(e) {
  var encounter = document.querySelector('encounter');
  var current = utilities.encounter.getCurrentEncounter();

  var button = encounter.querySelector('interact.' + current.type + ' button[data-key="' + e.keyCode + '"]');
  if (!button) return;

  var intent = button.dataset.intent;
  if (!intentMap[intent]) return;
  intentMap[intent]();
});

document.addEventListener('click', function(e) {
  if (!e.target.matches('button[data-intent]')) return;
  var intent = e.target.dataset.intent;
  if (!intentMap[intent]) return;
  intentMap[intent]();
});

newEncounter();

  return {
    applyEncounter,
    applyEnvironment,
    applyPerson,
    newEncounter,
    generate,
    getCurrentEncounter
  };
})();
