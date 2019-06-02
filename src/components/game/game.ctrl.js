var $ = require('jQuery');
import {UNABLE_TO_FIND_GAME_CARDS_ERROR_MESSAGE, 
  GAME_WIN_MESSAGE} from '../../shared/game/constants';
import './game.scss';
class gameCtrl {
  constructor(gameService, $location, $timeout, $stateParams) {
    this.gameService = gameService;
    this.location = $location;
    this.stateParams = $stateParams;
    this.timeout = $timeout;
    this.player = this.stateParams.username;
    this.getCards();
  }

  $onInit(){
    if(!this.player){
      this.location.path( '/login');
    }
    this.initializeGameData();
  }

  $onDestroy(){
    this.initializeGameData();
  }

  getCards(){
    try{
      this.cards = this.gameService.getCards();
    }catch(error){
      this.noCardsLoadedError = UNABLE_TO_FIND_GAME_CARDS_ERROR_MESSAGE;
    }
  }

  initializeGameData(){
    this.eraseCards();

    this.rounds = 0;
    this.matches = [];
  }
  
  onChooseCard(newCard){
    const invalidCardChoosen = this.isInvalidCard(this.matches, this.firstCard, newCard);

    if(invalidCardChoosen){
      return;
    }

    if(!this.firstCard){
      this.firstCard = newCard;
    }else{
      this.secondCard = newCard;
    }

    const matched = this.isAMatch(this.firstCard, this.secondCard);
    const twoCardChoosen = this.hasTwoCardsChoosen(this.firstCard, this.secondCard);

    if(twoCardChoosen){
      this.eraseCards();
      this.incrementRounds();
      this.manageUI(matched);
    }

    const quantityCards = this.cards.length / 2;
    
    if(this.matches.length === quantityCards){
      const gameResult = this.endGame();
      this.addPlayerToRanking(gameResult);
    }
  }

  eraseCards(){
    this.firstCard = null;
    this.secondCard = null;
  }

  incrementRounds(){
    this.rounds++;
  }
  hasTwoCardsChoosen(firstCard, secondCard){
    return (firstCard && secondCard);
  }
  
  isInvalidCard(matches, firstCard, newCard){
    const pairAlreadyFinded = matches.filter((card)=>{return card.hash === newCard.hash});
    const cardAlreadyChoosed = firstCard && (firstCard.name === newCard.name);
    
    if( pairAlreadyFinded.length || cardAlreadyChoosed){
      return true;
    }
    return false;
  }

  isAMatch(firstCard, secondCard){
    if((firstCard && secondCard) && (firstCard.hash === secondCard.hash)){
      this.matches.push(firstCard);
      return true;
    }
    return false;
  }

  manageUI(matched){
      if(!matched){
       this.unFlipCards();
      }else{
        this.keepCardsVisible();
      }
  }

  unFlipCards(){
    setTimeout(function(){
      $('.card').not('.matched').removeClass('flipped');
    }, 1500);
  }

  keepCardsVisible(){
    setTimeout(function(){
      $('.flipped').addClass('matched');
    }, 100);
  }

  scrollToTop(){
    const htmlPage = $("html");
    htmlPage.animate({scrollTop:0}, 500, 'swing');
  }
  endGame(){
    const rankingElement = {};
    rankingElement.player = this.player;
    rankingElement.rounds = this.rounds;
      
    this.winMessage = GAME_WIN_MESSAGE;

    this.scrollToTop();
    return rankingElement;
  }

  addPlayerToRanking(player){
    this.gameService.addToRanking(player);
  }
}

gameCtrl.$inject = ['gameService', '$location', '$timeout', '$stateParams'];
export default gameCtrl;