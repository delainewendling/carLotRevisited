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


