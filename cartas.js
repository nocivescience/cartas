const overlaiesEl=document.querySelectorAll('.overlay-text');
const gameContainerEl=document.querySelector('.game-container');
const cardContanerEl=document.querySelector('.card-container');
const cardsEl=Array.from(document.getElementsByClassName('card'));
const timeRemainingEl=document.getElementById('time-remaining');
const bodyEl=document.querySelector('body');
const flipsEl=document.getElementById('flips');

class MixOrMatch{
    constructor(cards,TotalTime=100){
        this.cardsArray=cards;
        this.TotalTime=TotalTime;
        this.totalClicks=10;
        this.cardMatched=[];
        this.cardToCheck=null;
    }
    shuffleCards(){
        for(let i=this.cardsArray.length-1;i>0;i--){
            const randomIndex=Math.floor(Math.random()*(i+1));
            [this.cardsArray[i],this.cardsArray[randomIndex]]=[this.cardsArray[randomIndex],this.cardsArray[i]];
        }
        this.cardsArray=this.cardsArray.map((card,index)=>{
            card.style.order=index;
        })
    }
    startCountDown(){
        setInterval(()=>{
            this.TotalTime--;
            timeRemainingEl.textContent=this.TotalTime;
            if(this.TotalTime<0){
                timeRemainingEl.textContent='0';
            }
        },100);
    }
    flipCard(card){
        this.totalClicks--;
        flipsEl.textContent=this.totalClicks;
        self.checkForCardMath();
        if(this.totalClicks<=0){
            alert('You lost');
            this.totalClicks=0;
            flipsEl.textContent=this.totalClicks;
        }
    }
    checkForCardMath(){
        return console.log('this.cardToCheck');
    };
    getCardType(card){
        return card.getElementsByClassName('card-value')[0].id;
    };
}
function update(){
    const game=new MixOrMatch(cardsEl);
    game.shuffleCards();
    game.startCountDown();
    flipsEl.textContent=game.totalClicks;
    cardsEl.forEach(card=>{
        card.addEventListener('click',()=>{
            game.flipCard(card);
        })
    })
}
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',update)
}else{
    update()
};