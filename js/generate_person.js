
generatePerson = objgen.compile([{
  name: { $options: { 'bob': 10, 'alice': 20 } },
  age: { $integer: [5, 60] },
}, {
  $conditions: { age: { $gt: 18 } },
  greeting: { $options: { "I'm an adult!": 1 } }
}]);

