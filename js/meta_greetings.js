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
    (person) => `Our king requests a ${deepestDesire(person)}. If you refuse, beware the consequences!`,
    (person) => `${deepestDesire(person)}! Please, I really need ${deepestDesire(person)}!`,
    (person) => `${deepestDesire(person)}, oh ${deepestDesire(person)}. I have been searching for months!`
  ];

  var accepted = [
    // curmudgeon
    (person) => `Yes. Yes. Just take it away.`,
    (person) => `I suppose this is a bit better.`,
    (person) => `I could use more of those and less of ${deepestDislike(person)}! Give it here!`,
    // normal
    (person) => `Thank you stranger.`,
    (person) => `I believe this is a good trade. Thank you.`,
    (person) => `Oh, this is something I like!`,
    // fanatic
    (person) => `At least, my year-long quest is complete! Thank you stranger!`,
    (person) => `I guess that will do. Thank you.`,
    (person) => `My precious!`
  ];

  ver rejected = [
    // curmudgeon
    (person) => `What?! That is even more useless to me!`,
    (person) => `I suppose you managed to find something even worse. Congratulations.`,
    (person) => `That is not any better!`,
    // normal
    (person) => `Um...No thanks.`,
    (person) => `I do not want that.`,
    (person) => `What?! No way!`,
    // fanatic
    (person) => `This is not what I requested!`,
    (person) => `I need ${deepestDesire(person)}! Not that!`,
    (person) => `${deepestDesire(person)} continues to elude me!`
  ];

  return {
    greetings,
    accepted,
    rejected
  };
})()
