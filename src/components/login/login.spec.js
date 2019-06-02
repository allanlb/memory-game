import loginCtrl from './login.ctrl';

class gameService {
  getRanking(){
    return [{player: 'Allan', rounds: 3}];
  }
}

class location {
  path(){
    return;
  }
}

describe('login', () => {

  describe('loginCtrl', () => {
    let ctrl;

    beforeEach(() => {
      ctrl = new loginCtrl(new gameService, new location);
    });

    it('should contain doLogin method', () => {
      expect(ctrl.doLogin).toExist;
    });

    it('should contain isValidLogin method', () => {
      expect(ctrl.isValidLogin).toExist;
    });

    it('should contain getRanking method', () => {
      expect(ctrl.getRanking).toExist;
    });

    it('should get the ranking list', () => {
      const rankingObject = [{player: 'Allan', rounds: 3}];
      ctrl.getRanking();
      
      expect(angular.equals(ctrl.ranking, rankingObject)).toBe(true);
    });

    it('should get the ranking list', () => {
      const rankingObject = [{player: 'Allan', rounds: 3}];
      ctrl.getRanking();
      
      expect(angular.equals(ctrl.ranking, rankingObject)).toBe(true);
    });

    it('should show error with empty username', () => {
      ctrl.getRanking();
    
      ctrl.isInvalidLogin('');
      
      expect(ctrl.error.message).toBeDefined();
    });

    it('should show error with an existent username', () => {
      ctrl.getRanking();
      
      ctrl.isInvalidLogin('Allan');
      
      expect(ctrl.error.message).toBe('Este usuário já existe. Por favor, escolha outro.');

    });

    it('should do login', () => {
      ctrl.getRanking();
      
      ctrl.doLogin('Maria');
      expect(ctrl.error.message).toBeNull();
    });
  });
});
