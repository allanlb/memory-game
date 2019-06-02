import rankingCtrl from './ranking.ctrl';

class gameService {

  constructor(){
    this.ranking = [];
  }
  getRanking(){
    return [{player: 'Allan', rounds: 4}, {player: 'Maria', rounds: 3}];
  }

}
describe('ranking', () => {

  describe('aboutCtrl', () => {
    let ctrl;

    beforeEach(() => {
     
      ctrl = new rankingCtrl(new gameService);
    });

    it('should contain onInit method', () => {
      expect(ctrl.$onInit).toExist;
    });
    
    it('should  sort the ranking list', () => {
      ctrl.$onInit();
      expect(ctrl.data).toBeDefined();
      expect(ctrl.data[0].player).toBe('Maria');
    });
  });
});
