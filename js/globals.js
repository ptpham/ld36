
var elements = {
  offer: { slots: document.querySelector('offer slots') },
  request: { slots: document.querySelector('request slots') },
  inventory: { slots: document.querySelector('inventory slots') },
  environment: { slots: document.querySelector('available.environment slots') },
  person: { slots: document.querySelector('available.person slots') },
  encounter: {
    img: document.querySelector('encounter block img'),
    person: document.querySelector('encounter block person'),
    costume: document.querySelector('encounter block costume'),
  },
  ship: {
    slots: document.querySelector('ship slots'),
    img: document.querySelector('ship img')
  }
};

var constants = {
  goals: { count: 3 },
  inventory: { size: 12 },
  environment: { size: 12 },
  person: { size: 12 },
  request: { size: 3 },
  offer: { size: 3 }
};

var meta = { };
var utilities = { };
var sounds = { };
