'use strict'

var productCollection = [];
var products = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb-1', 'water-can', 'wine-glass'];
function RateTheseImages(name, src) {
  this.name = name;
  this.filepath = 'img/' + src + '.jpg';
  this.clicks = 0;
}
for (var i = 0; i < products.length; i++) { //makes objects
  productCollection.push(new RateTheseImages(products[i], products[i]));
}
var generateRandom = function() {
  return Math.floor(Math.random() * (15));
}
var threeRandoms = function() {
  var threeNumbers = [0, 0, 0];
  while (threeNumbers[0] === threeNumbers[1] || threeNumbers[1] === threeNumbers[2] || threeNumbers[0] === threeNumbers[2]) {
    threeNumbers[0] = generateRandom();
    threeNumbers[1] = generateRandom();
    threeNumbers[2] = generateRandom();
  }
  return threeNumbers;
}
var x = threeRandoms();
console.log(x);
console.log(productCollection[x[0]].filepath);
console.log(productCollection[x[1]].filepath);
console.log(productCollection[x[2]].filepath);


var first = document.getElementById('container1'); //dom IDs
var second = document.getElementById('container2');
var third = document.getElementById('container3');

first.addEventListener('click', handleClickFirst); //event listeners
second.addEventListener('click', handleClickSecond);
third.addEventListener('click', handleClickThird);

var firstClicks = 0;
var secondClicks = 0;
var thirdClicks = 0;

function handleClickFirst() {
  firstClicks += 1;
  productCollection[x[0]]
}
function handleClickSecond() {
  secondClicks += 1;
  productCollection[x[1]];
}
function handleClickThird() {
  thirdClicks += 1;
  productCollection[x[2]]
}
