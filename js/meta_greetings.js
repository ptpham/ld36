meta.greetings = (function () {

  var deepestDislike = utilities.person.getDeepestDislike;
  var deepestDesire = utilities.person.getDeepestDesire;

  var greetings = [
    // curmudgeon
    (person) => `Ugh. I hate ${deepestDislike(person)}! They are good for nothing!`,
    (person) => `The only thing worse than ${deepestDesire(person)} is ${deepestDislike(person)}!`,
    (person) => `${deepestDislike(person)}, ${deepestDislike(person)}, ${deepestDislike(person)}! It is all I get nowadays!`,
    // normal
    (person) => `Stranger, could you spare a ${deepestDesire(person)}.`,
    (person) => `Would you like to share my ${deepestDislike(person)}?`,
    (person) => `If only I had a ${deepestDesire(person)}. Then I could get rid of my ${deepestDislike(person)}!`,
    // fanatic
    (person) => `The king requests a ${deepestDesire(person)}. If you refuse, beware the consequences!`,
    (person) => `${deepestDesire(person)}! Please, I really need ${deepestDesire(person)}!`,
    (person) => `${deepestDesire(person)}, oh ${deepestDesire(person)}. I have been searching for months!`
  ];

  return greetings;
})()
