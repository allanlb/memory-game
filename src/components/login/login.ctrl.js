import {EMPTY_USERNAME_ERROR_LOGIN_MESSAGE, 
        USERNAME_ALREADY_EXISTS_ERROR_LOGIN_MESSAGE} from '../../shared/game/constants';
import './login.scss';

class loginCtrl {
  constructor(gameService, $location) {
    this.gameService = gameService;
    this.location = $location;
    this.ranking = this.getRanking();
    this.error = {message: null};
  }
  
  $onInit(){}
  
  doLogin(username){
    this.error.message = null;
    const isInvalidLogin = this.isInvalidLogin(username);
    if(isInvalidLogin){
      return;
    }
    this.location.path( '/game/' + username );
  }

  isInvalidLogin(username){
    const playerFinded = this.ranking.filter((rankingElement)=>{
      return rankingElement.player === username
    });
    
    if(!username){
      this.error.message = EMPTY_USERNAME_ERROR_LOGIN_MESSAGE;
    }else if(playerFinded.length){
      this.error.message = USERNAME_ALREADY_EXISTS_ERROR_LOGIN_MESSAGE; 
    }
    return this.error.message;
  }

  getRanking(){
    return this.gameService.getRanking();
  }
}

loginCtrl.$inject = ['gameService', '$location'];
export default loginCtrl;
