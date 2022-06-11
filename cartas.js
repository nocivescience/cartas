const overlaiesEl=document.querySelectorAll('.overlay-text');
const gameContainerEl=document.querySelector('.game-container');
const cardContanerEl=document.querySelector('.card-container');
const cardsEl=Array.from(document.getElementsByClassName('card'));
class MixOrMatch{
    constructor(cards=null){
        this.cardsArray=cards;
    }
    shuffleCards(cardsArray){
        for(let i=cardsArray.length-1;i>0;i--){
            const randomIndex=Math.floor(Math.random()*(i+1));
            [cardsArray[i],cardsArray[randomIndex]]=[cardsArray[randomIndex],cardsArray[i]];
        }
        cardsArray=cardsArray.map((card,index)=>{
            card.style.order=index;
        })
    }
    
}
const game=new MixOrMatch();
game.shuffleCards(cardsEl);
game.opacityDown();