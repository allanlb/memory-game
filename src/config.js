function config ($stateProvider, $locationProvider,$urlRouterProvider) {
  
  const appState = {
    name:'app',
    url: "/",
    redirectTo: 'login'
  };
  
  const loginState = {
    name: 'login',
    url: '/login',
    views: {
      content: 'login',
    }
  };

  const gameState = {
    name: 'game',
    url: '/game/:username',
    views: {
      content: 'game',
    }
  };

  const rankingState = {
    name: 'ranking',
    url: '/ranking',
    views: {
      content: 'ranking',
    }
  };

  $stateProvider.state(appState);
  $stateProvider.state(loginState);
  $stateProvider.state(gameState);
  $stateProvider.state(rankingState);
  
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/login");
}
config.$inject =['$stateProvider', '$locationProvider','$urlRouterProvider'];
export default config;
