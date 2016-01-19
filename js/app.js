'use strict'

var bigCounter = 0;
var productCollection = [];
var products = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water-can', 'wine-glass'];
function RateTheseImages(name) {
  this.name = name;
  this.filepath = 'img/' + name + '.jpg';
  this.clicks = 0;
}
for (var i = 0; i < products.length; i++) { //makes objects
  productCollection.push(new RateTheseImages(products[i]));
}
var generateRandom = function() {
  return Math.floor(Math.random() * (products.length));
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
console.log(x)

var first = document.getElementById('container1'); //dom IDs
first.src = productCollection[x[0]].filepath;
var second = document.getElementById('container2');
second.src = productCollection[x[1]].filepath;
var third = document.getElementById('container3');
third.src = productCollection[x[2]].filepath;

first.addEventListener('click', handleClickFirst); //event listeners
second.addEventListener('click', handleClickSecond);
third.addEventListener('click', handleClickThird);

function handleClickFirst(event) {
  console.log(event);
  var first = document.getElementById('container1');
  productCollection[x[0]].clicks += 1;
  bigCounter += 1;
}
function handleClickSecond(event) {
  console.log(event);
  var second = document.getElementById('container1');
  productCollection[x[1]].clicks += 1;
  bigCounter += 1;
}
function handleClickThird(event) {
  console.log(event);
  var third = document.getElementById('container3');
  productCollection[x[2]].clicks += 1;
  bigCounter += 1;
}
