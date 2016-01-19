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
var hidden = document.getElementById('button'); //hidden

var threeNumbersGlobal = [];
var threeRandoms = function() { //makes 3 random # with no repeats
  var threeNumbers = [0, 0, 0];
  while (threeNumbers[0] === threeNumbers[1] || threeNumbers[1] === threeNumbers[2] || threeNumbers[0] === threeNumbers[2]) {
    threeNumbers[0] = generateRandom();
    threeNumbers[1] = generateRandom();
    threeNumbers[2] = generateRandom();
  }
  //displays picture filepath in index.html
  first.src = productCollection[threeNumbers[0]].filepath;
  second.src = productCollection[threeNumbers[1]].filepath;
  third.src = productCollection[threeNumbers[2]].filepath;
  threeNumbersGlobal = threeNumbers;
}
threeRandoms();

var fifteenClicks = function () {
  if (totalCounter < 5) {
    threeRandoms();
  } else {
    totalClicks();
    hidden.removeAttribute('hidden');
    first.setAttribute('hidden', true);//makes images hidden
    second.setAttribute('hidden', true);
    third.setAttribute('hidden', true);
  }
}

first.addEventListener('click', handleClickFirst); //event listeners
second.addEventListener('click', handleClickSecond);
third.addEventListener('click', handleClickThird);
hidden.addEventListener('click', handleFindResults);

function handleFindResults(event) { //makes chart
  var clicks = document.getElementById('clicks').getContext('2d');
  var data = { //generates chart after 15 votes
    labels: products,
    datasets: [
      {
        fillColor: '#0000e6',
        strokeColor: '#9999ff',
        data: productClicks
      },
    ]
  };
  new Chart(clicks).Bar(data);
}
function handleClickFirst(event) {
  productCollection[threeNumbersGlobal[0]].clicks += 1;
  totalCounter += 1;
  fifteenClicks();
}
function handleClickSecond(event) {
  productCollection[threeNumbersGlobal[1]].clicks += 1;
  totalCounter += 1;
  fifteenClicks();
}
function handleClickThird(event) {
  productCollection[threeNumbersGlobal[2]].clicks += 1;
  totalCounter += 1;
  fifteenClicks();
}

var productClicks = []; //stores ALL product, click totals
var totalClicks = function() { //calculates click totals
  for (var i = 0; i < products.length; i++) {
    productClicks.push(productCollection[i].clicks);
  }
}
