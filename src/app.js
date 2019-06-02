import "style-loader!css-loader!sass-loader!../node_modules/angular-material/angular-material.scss";
import config from './config';
import loginCtrl from './components/login/login.ctrl';
import gameCtrl from './components/game/game.ctrl';
import rankingCtrl from './components/ranking/ranking.ctrl';
import cardCtrl from './components/card/card.ctrl';
import gameService from './shared/game/game.service';

angular.module('login', [
  'ui.router',
  'ngMaterial'
]).component('login', {
  template: require('./components/login/login.html'),
  controller: loginCtrl
});

angular.module('memoryGame', [
  'ui.router',
  'ngMaterial',
  'login'
])
.config(config)
.service('gameService', gameService)
.component('game', {
  template: require('./components/game/game.html'),
  controller: gameCtrl
})
.component('card', {
  template: require('./components/card/card.html'),
  controller: cardCtrl,
  bindings: {
    element: '<',
    onChooseCard: '&'
  }
})
.component('ranking', {
  template: require('./components/ranking/ranking.html'),
  controller: rankingCtrl,
  bindings: {
    data: '<'
  }
});

