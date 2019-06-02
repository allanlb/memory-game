import gameCtrl from './game.ctrl';

class gameService {
  constructor(){
    this.ranking = [];
  }
  getRanking(){
    return [{player: 'Allan', rounds: 3}];
  }

  addToRanking(rankingElement){
    this.ranking.push(rankingElement);
  }

  getCards(){
    const listCards = [];
    
    let name = 'burjkhalifa.jpeg';
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = 'coliseu.jpeg';
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
    
    return listCards;
  }
}

class location {
  path(){
    return;
  }
}

class timeout {
  cancel(timeout){
    return;
  }
}
class stateParams {}

describe('game', () => {
  describe('gameCtrl', () => {
    let ctrl;

    beforeEach(() => {
      ctrl = new gameCtrl(new gameService, new location, 
        new gameService, new timeout, new stateParams);
    });

    it('should contain onChooseCard method', () => {
      expect(ctrl.onChooseCard).toExist;
    });

    it('should contain isInvalidCard method', () => {
      expect(ctrl.isInvalidCard).toExist;
    });

    it('should contain hasTwoCardsChoosen method', () => {
      expect(ctrl.hasTwoCardsChoosen).toExist;
    });

    it('should contain manageUI method', () => {
      expect(ctrl.manageUI).toExist;
    });

    it('should contain addPlayerToRanking method', () => {
      expect(ctrl.addPlayerToRanking).toExist;
    });

    it('should contain endGame method', () => {
      expect(ctrl.endGame).toExist;
    });

    it('should contain isAMatch method', () => {
      expect(ctrl.isAMatch).toExist;
    });

    it('should contain initializeGameData method', () => {
      expect(ctrl.initializeGameData).toExist;
    });
  
    it('should start variables onInit', () => {
      ctrl.$onInit();
      
      expect(ctrl.firstCard).toBeNull();
      expect(ctrl.secondCard).toBeNull();
      expect(ctrl.rounds).toBe(0);
      expect(angular.equals(ctrl.matches, [])).toBe(true);
    });

    it('should start variables onDestroy', () => {
      ctrl.firstCard = {name: 'teste', hash: 'hash'};
      ctrl.secondCard = {name: 'teste1', hash: 'hash1'};
      ctrl.rounds = 10;
      ctrl.matches = [ctrl.firstCard];

      ctrl.$onDestroy();
      
      expect(ctrl.firstCard).toBeNull();
      expect(ctrl.secondCard).toBeNull();
      expect(ctrl.rounds).toBe(0);
      expect(angular.equals(ctrl.matches, [])).toBe(true);
    });

    it('should make sure is a valid card', () => {
      let firstCard = {name: 'Card1', hash:'abcd'};
      let secondCard = {name: 'Card2', hash:'efgh'};
      let matches = [];
      
      const isInvalidCard = ctrl.isInvalidCard(matches, 
      firstCard, secondCard);
      
      expect(isInvalidCard).toBeFalsy();
    });

    it('should make sure is a invalid card', () => {
      let firstCard = {name: 'Card1', hash:'abcd'};
      let secondCard = {name: 'Card1', hash:'efgh'};
      let matches = [];
      
      const isInvalidCard = ctrl.isInvalidCard(matches, 
      firstCard, secondCard);
      
      expect(isInvalidCard).toBeTruthy();
    });

    it('should to happen a match', () => {
      let firstCard = {name: 'Card1', hash:'abcd'};
      let secondCard = {name: 'Card1', hash:'abcd'};
      
      ctrl.$onInit();
      const isAMatch = ctrl.isAMatch(firstCard, secondCard);
      
      expect(isAMatch).toBeTruthy();
    });

    it('should not to happen a match', () => {
      let firstCard = {name: 'Card1', hash:'abcd'};
      let secondCard = {name: 'Card2', hash:'efg'};
      
      ctrl.$onInit();
      const isAMatch = ctrl.isAMatch(firstCard, secondCard);
      
      expect(isAMatch).toBeFalsy();
    });

    it('should has two cards choosen', () => {
      let firstCard = {name: 'Card1', hash:'abcd'};
      let secondCard = {name: 'Card2', hash:'efg'};
     
      ctrl.$onInit();
      const twoCardsChoosen = ctrl.hasTwoCardsChoosen(firstCard, secondCard);
     
      expect(twoCardsChoosen).toBeTruthy();
    });

    it('should not has two cards choosen', () => {
      let firstCard = {name: 'Card1', hash:'abcd'};
      let secondCard = null;
      
      ctrl.$onInit();
      const twoCardsChoosen = ctrl.hasTwoCardsChoosen(firstCard, secondCard);
      
      expect(twoCardsChoosen).toBeFalsy();
    });

    it('should finish the game', () => {
      const gameData = {player: 'Allan', rounds: 3};
      ctrl.player = gameData.player;
      ctrl.rounds = gameData.rounds;
      
      const resultGame = ctrl.endGame();
      
      expect(gameData.player).toBe(resultGame.player);
      expect(ctrl.winMessage).toBe('Parabéns! Você completou o jogo em ');
    });

    it('should reset values on destroy component', () => {
      ctrl.firstCard = {name: 'teste', hash: 'hash'};
      ctrl.secondCard = {name: 'teste1', hash: 'hash1'};
      ctrl.rounds = 10;
      ctrl.matches = [ctrl.firstCard];

      ctrl.initializeGameData();
      
      expect(ctrl.firstCard).toBeNull();
      expect(ctrl.secondCard).toBeNull();
      expect(ctrl.rounds).toBe(0);
      expect(angular.equals(ctrl.matches, [])).toBe(true);
    });

    it('should choosing two cards', () => {
      const card = {name: 'teste', hash: 'hash'};
      const secondCard = {name: 'teste1', hash: 'hash1'};
      const thirdCard = {name: 'teste2', hash: 'hash2'};
      const fourthCard = {name: 'teste3', hash: 'hash2'};

      ctrl.$onInit();
      ctrl.onChooseCard(card);
      ctrl.onChooseCard(secondCard);
      ctrl.onChooseCard(card);
      
    });

    it('should choosing the same card', () => {
      const card = {name: 'teste', hash: 'hash'};
      const secondCard = {name: 'teste1', hash: 'hash1'};
      const thirdCard = {name: 'teste2', hash: 'hash2'};
      const fourthCard = {name: 'teste3', hash: 'hash2'};

      ctrl.matches = [card, secondCard];
     
      ctrl.onChooseCard(card);
      ctrl.onChooseCard(card);
      
      ctrl.matches = [card, secondCard];
      ctrl.cards = [card, secondCard, thirdCard, fourthCard];
      
      ctrl.onChooseCard(thirdCard);
      ctrl.onChooseCard(fourthCard);
      
    });

    it('should choosing cards get the game finished', () => {
      const card = {name: 'teste', hash: 'hash'};
      const secondCard = {name: 'teste1', hash: 'hash1'};
      const thirdCard = {name: 'teste2', hash: 'hash2'};
      const fourthCard = {name: 'teste3', hash: 'hash2'};

      ctrl.matches = [card, secondCard];
      ctrl.cards = [card, secondCard, thirdCard, fourthCard];
      
      ctrl.onChooseCard(thirdCard);
      ctrl.onChooseCard(fourthCard);
      
    });

    it('should call unFlipCards method', () => {
      const spy = spyOn(ctrl, 'unFlipCards').and.callThrough();
      ctrl.manageUI(false);

      expect(ctrl.unFlipCards).toHaveBeenCalled();
    });

    it('should call keepCardsVisible method', () => {
      const spy = spyOn(ctrl, 'keepCardsVisible').and.callThrough();
      ctrl.manageUI(true);
      
      expect(ctrl.keepCardsVisible).toHaveBeenCalled();
    });

    it('should increment rounds', () => {
      ctrl.$onInit();
      expect(ctrl.rounds).toBe(0);
      ctrl.incrementRounds();

      expect(ctrl.rounds).toBe(1);
    });

    it('should erase cards', () => {
      ctrl.firstCard = {name: 'teste', hash: 'hash'};
      ctrl.secondCard = {name: 'teste1', hash: 'hash1'};

      ctrl.eraseCards();

      expect(ctrl.firstCard).toBeNull();
      expect(ctrl.secondCard).toBeNull();
    });
  });
});
