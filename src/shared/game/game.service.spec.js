import gameService from './game.service';

describe('game.service', () => {
  describe('gameCtrl', () => {
    let gameSvc;

    beforeEach(() => {
      gameSvc = new gameService;
    });

    it('should return the ranking list', () => {
      spyOn(gameSvc, 'getRanking').and.callThrough();
      const rankingList = gameSvc.getRanking();
      
      expect(angular.equals(rankingList, [])).toBe(true);
      expect(gameSvc.getRanking).toHaveBeenCalled();
    });

    it('should return the cards', () => {
      
      spyOn(gameSvc, 'getCards').and.callThrough();
      const resultCards = Promise.resolve(gameSvc.getCards());
      
      resultCards
      .then((result) => {
        console.log('result', result);
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(gameSvc.getCards).toHaveBeenCalled();
      });
    });

    it('should add a new element to ranking', () => {
      const ranking = [{player: 'Allan', rounds: 3}];
      spyOn(gameSvc, 'addToRanking').and.callThrough();
      gameSvc.addToRanking(ranking);
      
      expect(gameSvc.ranking.length).toBeGreaterThan(0);
      expect(gameSvc.addToRanking).toHaveBeenCalled();
    });

    it('should get image name from image url', () => {
      const url = 'http://localhost:8080/assets/images/wall.jpeg';
      spyOn(gameSvc, 'getImageName').and.callThrough();;
      const imageName = gameSvc.getImageName(url);
      
      expect(imageName).toBe('wall.jpeg');
      expect(gameSvc.getImageName).toHaveBeenCalled();
    });
  });
});