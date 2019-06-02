import question from "../../assets/images/question-mark.png";
import burjkhalifa from "../../assets/images/burjkhalifa.jpeg";
import coliseu from "../../assets/images/coliseu.jpeg";
import egito from "../../assets/images/egito.png";
import eiffel from "../../assets/images/eiffel.jpg";
import estatualiberdade from "../../assets/images/estatualiberdade.jpg";
import machupicchu from "../../assets/images/machupicchu.jpg";
import saofrancisco from "../../assets/images/saofrancisco.jpg";
import tajmahal from "../../assets/images/tajmahal.jpg";
import timessquare from "../../assets/images/timessquare.jpg";
import wall from "../../assets/images/wall.jpeg";

class gameService {
  constructor(){
    this.ranking = [];
  }

  getImageName(url){
    if(!url)
      return;
    
    return url.split('images/')[1];
  }

  getCards(){
    const listCards = [];
    
    let name = this.getImageName(burjkhalifa);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(coliseu);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(egito);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(eiffel);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(estatualiberdade);
    listCards.push({
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(machupicchu);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(saofrancisco);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(tajmahal);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(timessquare);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
  
    name = this.getImageName(wall);
    listCards.push({
      name,
      url: name,
      hash: window.btoa(name)
    });
    
    const newList = JSON.parse(JSON.stringify(listCards));
    newList.forEach((card)=>{card.name = card.name + '-pair'});
    const allCards = listCards.concat(newList);
    
    return allCards.sort(() => {return .5 - Math.random()});
  }

  getRanking(){
    return this.ranking;
  }

  addToRanking(rankingElement){
    this.ranking.push(rankingElement);
  }
}

export default gameService;


