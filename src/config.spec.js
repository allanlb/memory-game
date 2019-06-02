import appConfig from './config';

class $stateProviderMock {
  constructor(){
    this.states =[];
  }
  state(state){
    this.states.push(state);
  }
  get(){
    return this.states;
  }
}
class $locationProviderMock {
  html5Mode(){
    console.log('html5Mode');
  }
}
class $urlRouterProviderMock {
  otherwise(){
    console.log('otherwise');
  }
}
describe('config', () => {
  let config;

  beforeEach(() => {
    config = appConfig(new $stateProviderMock, new $locationProviderMock, new $urlRouterProviderMock);
  });

  it('should contain toggle sidebar', () => {
    expect(config).toExist;
  });
});
