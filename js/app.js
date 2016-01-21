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

//create save files
var productClicks = []; //stores ALL product, click totals
var productViews = [];
var chartData = localStorage.getItem('clicksPersist');
var chartData2 = localStorage.getItem('viewsPersist');
if (chartData) {
  productClicks = JSON.parse(chartData);
  productViews = JSON.parse(chartData2);
} else {
  console.log('storage empty, initalizing');
  localStorage.setItem('clicksPersist', JSON.stringify(productClicks));
  localStorage.setItem('viewsPersist', JSON.stringify(productViews));
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
var deleted = document.getElementById('delete');
deleted.addEventListener('click', handleDeleteData);

function handleDeleteData(event) {
  console.log('clearing local storage');
  localStorage.clear();
}
function handleClickFirst(event) {
  productCollection[threeNumbersGlobal[0]].clicks += 1;
  totalCounter += 1;
  // localStorage.setItem('clicksPersist', JSON.stringify(data));
  // localStorage.setItem('viewsPersist', JSON.stringify(pdata));
  // clicks.update();
  // percent.update();
  fifteenClicks();
}
function handleClickSecond(event) {
  productCollection[threeNumbersGlobal[1]].clicks += 1;
  totalCounter += 1;
  // localStorage.setItem('clicksPersist', JSON.stringify(data));
  // localStorage.setItem('viewsPersist', JSON.stringify(pdata));
  // clicks.update();
  // percent.update();
  fifteenClicks();
}
function handleClickThird(event) {
  productCollection[threeNumbersGlobal[2]].clicks += 1;
  totalCounter += 1;
  // localStorage.setItem('clicksPersist', JSON.stringify(data));
  // localStorage.setItem('viewsPersist', JSON.stringify(pdata));
  // clicks.update();
  // percent.update();
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
  // var pdata = { //generates chart after 15 votes
  //   labels: products,
  //   datasets: [
  //     {
  //       fillColor: '#e59999',
  //       strokeColor: '#e59999',
  //       // data: productPercent
  //     }
  //   ]
  // };
  new Chart(clicks).Bar(data);
  // new Chart(percent).Bar(pdata);
}


// var productPercent = [];
function totalClicks() { //calculates click totals
    if (productClicks.length < 1 || productViews.length < 1) {
      for (var i = 0; i < products.length; i++) {
        productClicks.push(productCollection[i].clicks);
        productViews.push(productCollection[i].viewed);
        localStorage.setItem('clicksPersist', JSON.stringify(productClicks));
        localStorage.setItem('viewsPersist', JSON.stringify(productViews));

        // productPercent.push(productCollection[i].percentage);
      }
    } else {
      for (var i = 0; i < products.length; i++) {
        productClicks[i] += productCollection[i].clicks
        productViews[i] += productCollection[i].viewed
        localStorage.setItem('clicksPersist', JSON.stringify(productClicks));
        localStorage.setItem('viewsPersist', JSON.stringify(productViews));
      }
    }
  }

//persist dat in html5local storage
