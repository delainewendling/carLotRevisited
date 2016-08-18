var CarLot = (function () {
  var inventory;

  return {
    getInventory: function () {
      return inventory;
    },
    loadInventory: function () {
      //Promise constructor, creating a new instance of a Promise
      return new Promise (function (resolve, reject){
      var inventoryLoader = new XMLHttpRequest();
      inventoryLoader.open('GET', 'inventory.json')
      inventoryLoader.send();
      inventoryLoader.addEventListener("load", function () {
         inventory = JSON.parse(this.responseText).cars
         resolve(inventory) //No longer responsible for calling populatePage. Instead, we are returning a promise with the data wrapped up in it. Now loadInventory can make data available to many different functions. Resolve's partner in crime is .then. Resolve will run once the promise is returned to the callsite.
      });
    });
    }
  };

})(CarLot || {});