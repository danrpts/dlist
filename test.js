var List = require('./');
var cats = new List('LuLu', 'Wilfred', 'Einstein');
var people = new List(['danny', 'jas']);
console.log(cats.toString());
console.log(people.toString());
people.insert('hi');
people.move(1);
people.insert('earth');
console.log(people.toString());
people.remove();
console.log(people.toString());
people.clear();
console.log(people.toArray());