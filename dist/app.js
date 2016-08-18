(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
//this tells the file what files you will need to pull in
var carInventory = require('./load'),
    styles = require('./styles'); //npm looks in node modules first but you want it to look in the current directory first.

function populatePage (inventory) {
  return new Promise(function(resolve){
  var purchased;
    // Loop over the inventory and populate the page
  var container = document.getElementById("carLot");
  var result = "";
  inventory.forEach(function(car, i){
    if (i%3 === 0){
      result += `<div class="row row-eq-height">`;
    }
    if (car.purchased === false) {
        purchased = `<span class="forSale"> For Sale! </span>`;
    } else {
        purchased = `<span class="sold"> SOLD </span>`;
    }
    result += `<div class="col-sm-4"> <div class="carCard" style= 'border: 3px solid ${car.color}'> <h2 class="carInfo card-title"> ${car.make} ${car.model} </h2><p class="description card-text" id="car-${i}"> ${car.description} </p>
      <p class="carYear card-text"> ${car.year} </p>
      <p class="carsColor card-text"> Color: ${car.color} </p>
      <p class="carPrice card-text"> Price: $${car.price} </p>
      ${purchased}</div></div>`;
    if((i+1)%3===0){
        result+=`</div>`;
    }
  });
  container.innerHTML = result;
  resolve(inventory);
  });
}
  //Grab all cards and put an event listener on each one. When one is clicked the input text is cleared and focused on. The border change function is also called.
function activateEvents (inventory){
    //Add event listeners to cards
    var targetIndex;
    var targetDescription;
    var card;
    var cards = document.querySelectorAll(".carCard");
    cards.forEach((card)=>{
      card.addEventListener("click", (e)=>{
        //This is the description div of the card clicked on
        targetDescription = e.currentTarget.children[1];
        targetIndex = targetDescription.id.split("-")[1];
        // console.log("id", targetDescription.id)
        var input = document.getElementById("inputText");
        input.removeAttribute("disabled");
        //places description of the car in the input for editing
        input.value= "";
        //Adds the description text to the input
        input.value = targetDescription.innerText;
        //Focuses on the end of the description rather than the beginning
        input.focus();
        input.setSelectionRange(input.value.length,input.value.length);
        //calls the functions that will change the border of the clicked div and add text to the appropriate description
        styles.colorReset(cards);
        styles.styleCard(card);
        });
      });
    //Add event listeners to button and text input
    var button = document.querySelector(".submit");
    var input = document.getElementById("inputText");
    input.addEventListener('keyup', (e)=>{
      targetDescription.innerText = input.value;
    });
    input.addEventListener("keypress", (e)=>{
    var key = e.which || e.keyCode;
    if (key === 13) {
        addText(targetDescription, card);
      }
    });
    button.addEventListener("click", (e)=>{
        addText(targetDescription, card);
    });
}

function addText (targetDescription, card){
      var input = document.getElementById("inputText");
        targetDescription.innerHTML = input.value;
        input.value= "";
        input.blur();
        input.setAttribute("disabled", true);
        styles.colorReset(card);
}
  // Now that the DOM is loaded, establish all the event listeners needed
   // CarLot.activateEvents(populatePage);
carInventory.loadInventory() //use the variable name we created above and call the method we want
//.then will not do anything until the previous action was completed.
.then(function(dataFromPromise){
  //
  return populatePage(dataFromPromise);
})
.then(function(inventory){
  activateEvents(inventory);
});



},{"./load":2,"./styles":3}],2:[function(require,module,exports){
"use strict";
var inventory = [];

var getInventory = function () {
    return inventory;
};
var loadInventory = function () {
  //Promise constructor, creating a new instance of a Promise
  return new Promise (function (resolve, reject){
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.open('GET', 'inventory.json');
  inventoryLoader.send();
  inventoryLoader.addEventListener("load", function () {
     inventory = JSON.parse(this.responseText).cars;
     resolve(inventory) ;//No longer responsible for calling populatePage. Instead, we are returning a promise with the data wrapped up in it. Now loadInventory can make data available to many different functions. Resolve's partner in crime is .then. Resolve will run once the promise is returned to the callsite.
  });
});
};

//Object literal shorthand. Allows you to create an object without creating key/value pairs. It will assign a key that is the same as the value
module.exports = {getInventory, loadInventory};
//the line above "exposes" the following functions to the public interface


},{}],3:[function(require,module,exports){
"use strict";

var colorReset = function(cards){
  cards.forEach((card)=>{
    card.style.borderWidth ="3px";
    card.style.backgroundColor ="white";
  });
};

var styleCard= function(card){
  console.log(card);
  card.style.borderWidth = "10px";
  card.style.backgroundColor = "#fff8dc";
};

module.exports = {colorReset, styleCard};
},{}]},{},[1]);
