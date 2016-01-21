'use strict'

var totalCounter = 0; //global counter
var productCollection = []; //array that stores all products
var products = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water-can', 'wine-glass'];
function RateTheseImages(name) { //constructor
  this.name = name;
  this.filepath = 'img/' + name + '.jpg';
  this.clicks = 0;
  this.viewed = 0;
  this.percentage = 0;
}
for (var i = 0; i < products.length; i++) { //loop makes objects & pushes to productCollection array
  productCollection.push(new RateTheseImages(products[i]));
}
function generateRandom() { //RNG
  return Math.floor(Math.random() * (products.length));
}
var generatePercentage = function() {
  for (var i = 0; i < products.length; i++) {
    productCollection[i].percentage = ((productCollection[i].clicks / productCollection[i].viewed) * 100);
    }
}
var first = document.getElementById('container1'); //dom IDs
var second = document.getElementById('container2');
var third = document.getElementById('container3');
var hidden = document.getElementById('button'); //hidden

var threeNumbersGlobal = [];
var usedNumbers = [];
function threeRandoms() { //makes 3 random # with no repeatss
  if (totalCounter === 0) {
    threeNumbers = [0, 1, 2];
  } //Super redundant, but for the user stories, each image NEEDS to display at least once!
  if (totalCounter === 1) {
    threeNumbers = [3, 4, 5];
  }
  if (totalCounter === 2) {
    threeNumbers = [6, 7, 8];
  }
  if (totalCounter === 3) {
    threeNumbers = [9, 10, 11];
  }
  if (totalCounter === 4) {
    threeNumbers = [12, 13, 1];
  }
  if (totalCounter >= 5) {
    var threeNumbers = [0, 0, 0];
    while (threeNumbers[0] === threeNumbers[1] || threeNumbers[1] === threeNumbers[2] || threeNumbers[0] === threeNumbers[2]) {
    threeNumbers[0] = generateRandom();
    threeNumbers[1] = generateRandom();
    threeNumbers[2] = generateRandom();
    }
  }
  first.src = productCollection[threeNumbers[0]].filepath; //filepath for index
  second.src = productCollection[threeNumbers[1]].filepath;
  third.src = productCollection[threeNumbers[2]].filepath;
  productCollection[threeNumbers[0]].viewed += 1;
  productCollection[threeNumbers[1]].viewed += 1;
  productCollection[threeNumbers[2]].viewed += 1;
  threeNumbersGlobal = threeNumbers;
}
threeRandoms();

function fifteenClicks() {
  if (totalCounter < 15) {
    threeRandoms();
  } else {
    generatePercentage();
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
function handleFindResults(event) { //makes chart
  var chartTitle = document.getElementById('chartTitle');//hidden chart title
  var percentTitle = document.getElementById('percentTitle');
  console.log('Yes the test subject clicked the results button.');
  percentTitle.removeAttribute('hidden');
  chartTitle.removeAttribute('hidden');
  var clicks = document.getElementById('clicks').getContext('2d');
  var percent = document.getElementById('percent').getContext('2d');
  var data = { //generates chart after 15 votes
    labels: products,
    datasets: [
      {
        fillColor: '#e59999',
        strokeColor: '#e59999',
        data: productClicks
      },
      {
        fillColor: '#d21339',
        strokeColor: '#d21339',
        data: productViews
      }
    ]
  };
  var pdata = { //generates chart after 15 votes
    labels: products,
    datasets: [
      {
        fillColor: '#e59999',
        strokeColor: '#e59999',
        data: productPercent
      }
    ]
  };
  new Chart(clicks).Bar(data);
  new Chart(percent).Bar(pdata);
}

var productClicks = []; //stores ALL product, click totals
var productViews = [];
var productPercent = [];
function totalClicks() { //calculates click totals
  for (var i = 0; i < products.length; i++) {
    productClicks.push(productCollection[i].clicks);
    productViews.push(productCollection[i].viewed);
    productPercent.push(productCollection[i].percentage);
  }
}
