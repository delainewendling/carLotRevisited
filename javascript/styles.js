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