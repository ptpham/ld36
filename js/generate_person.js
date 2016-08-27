
generatePerson = objgen.compile({
  name: { $options: { 'bob': 10, 'alice': 20 } },
  age: { $integer: [5, 70] },
});

