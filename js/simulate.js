utilities.simulate = (function () {
  function trades(count, offer, request) {
    var getItem = utilities.inventory.getItem;
    var contains = utilities.inventory.contains;
    var appraise = utilities.person.appraise;
    var generate = utilities.person.generate;
    var offerItems = offer.map(getItem);
    var requestItems = request.map(getItem);
    var success = 0;
    var canTrade = 0;
    var tradesMade = 0;
    var people = [];
    var person;
    var result;
    var tick = count;

    while(tick > 0) {
      person = generate();
      result = appraise(person, offerItems, requestItems);
      if (result) success++;
      if (contains(person.inventory, requestItems)) canTrade++;
      if (result && contains(person.inventory, requestItems)) tradesMade++;
      people.push(person);
      tick--;
    }

    console.log(`
Acceptance Rate: ${success/count} (${success})
Available Rate: ${canTrade/count} (${canTrade})
Trade Rate: ${tradesMade/canTrade} (${tradesMade}/${canTrade})
Successful Trades: ${tradesMade/count}`);
    return people;
  }

  return {
    trades
  };
})()
