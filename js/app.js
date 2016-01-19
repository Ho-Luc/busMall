'use strict'

var totalCounter = 0; //global counter
var productCollection = []; //array that stores all products
var products = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water-can', 'wine-glass'];
function RateTheseImages(name) { //constructor
  this.name = name;
  this.filepath = 'img/' + name + '.jpg';
  this.clicks = 0;
}
for (var i = 0; i < products.length; i++) { //loop makes objects & pushes to productCollection array
  productCollection.push(new RateTheseImages(products[i]));
}
var generateRandom = function() { //RNG
  return Math.floor(Math.random() * (products.length));
}
var first = document.getElementById('container1'); //dom IDs
var second = document.getElementById('container2');
var third = document.getElementById('container3');

var threeNumbers = [0, 0, 0];
var threeRandoms = function() { //makes 3 random # with no repeats
  var threeNumbers = [0, 0, 0];
  while (threeNumbers[0] === threeNumbers[1] || threeNumbers[1] === threeNumbers[2] || threeNumbers[0] === threeNumbers[2]) {
    threeNumbers[0] = generateRandom();
    threeNumbers[1] = generateRandom();
    threeNumbers[2] = generateRandom();
  }
  first.src = productCollection[threeNumbers[0]].filepath;
  second.src = productCollection[threeNumbers[1]].filepath;
  third.src = productCollection[threeNumbers[2]].filepath;
  console.log(threeNumbers);
}
threeRandoms();

first.addEventListener('click', handleClickFirst); //event listeners
second.addEventListener('click', handleClickSecond);
third.addEventListener('click', handleClickThird);

function handleClickFirst(event) {
  productCollection[threeNumbers[0]].clicks += 1;
  totalCounter += 1;
  threeRandoms();
}
function handleClickSecond(event) {
  productCollection[threeNumbers[1]].clicks += 1;
  totalCounter += 1;
  threeRandoms();
}
function handleClickThird(event) {
  productCollection[threeNumbers[2]].clicks += 1;
  totalCounter += 1;
  threeRandoms();
}
