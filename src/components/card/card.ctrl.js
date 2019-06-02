import './card.scss';
var $ = require('jQuery');

class cardCtrl {
  constructor() {}
  $onInit() {}

  chooseCard(event, element){
    const flippedCards = $(document).find('.flipped').not('.matched');
      
    if(flippedCards.length >= 2){
      $(document).find('.flipped').not('.matched').removeClass('flipped');
      console.log('blocked!'); 
      return;
    }
    const cardParent = $(event.target).closest('.flip');
    cardParent.find('.card').addClass('flipped');
    this.onChooseCard(element);
  }
}

export default cardCtrl;
