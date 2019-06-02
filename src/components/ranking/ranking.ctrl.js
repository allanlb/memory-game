import './ranking.scss';

class rankingCtrl {

  constructor(gameService) {
    this.gameService = gameService;
  }

  $onInit(){
    this.data = this.gameService.getRanking();
    this.data.sort((a, b)=>(a.rounds > b.rounds) ? 1 : -1); 
  }
}

rankingCtrl.$inject = ['gameService'];
export default rankingCtrl;
