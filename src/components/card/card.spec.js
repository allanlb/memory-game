import cardCtrl from './card.ctrl';

describe('card', () => {
  describe('cardCtrl', () => {
    let ctrl;

    beforeEach(() => {
      ctrl = new cardCtrl();
    });

    it('should contain a chooseCard method', () => {
      expect(ctrl.chooseCard).toExist;
    });
  });
});
