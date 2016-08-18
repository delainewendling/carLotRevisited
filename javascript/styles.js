var CarLot = (function createCar(populate) {


populate.colorReset = function(cards){
  // var cards = document.querySelectorAll(".carCard");
  cards.forEach((card)=>{
    card.style.borderWidth ="3px"
    card.style.backgroundColor ="white"
  })
}

populate.styleCard= function(card){
  console.log(card)
  // card.classList.add("styleCard")
  card.style.borderWidth = "10px"
  card.style.backgroundColor = "#fff8dc"
}

populate.mirrorText = function(){
  
}
return populate
}) (CarLot || {})