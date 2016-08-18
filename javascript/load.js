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

