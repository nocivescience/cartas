class MixOrMatch{
    constructor(totalTime,cards){
        this.totalTime=totalTime;
        this.cards=cards;
        this.busy=true;
        this.timer=document.getElementById('time-remaining');
        this.ticker=document.getElementById('flips')
        this.matched=false;
        this.totalFlips=0;
        this.matchedCards=[];
        this.cardToCheck=null;
    }
    hideCards(){
        this.cards.forEach((card)=>{
            card.classList.remove('visible');
            card.classList.remove('matched');
        })
    }
    checkCardMatch(card){
        console.log(this.getCardType(card))
    }
    getCardType(card){
        return card.getElementsByClassName('card-value')[0].id;
    }
    runningGame(){
        this.startCountDown()
    }
    startCountDown(){
        return setInterval(()=>{
            console.log(this.totalTime--)
            this.timer.innerText=this.totalTime;
        },1000)
    }
    flipCard(card){
        if(this.canFlipCard(card)){
            card.classList.add('visible')
            this.totalFlips++
            this.ticker.textContent=this.totalFlips;
        }
    };
    canFlipCard(card){
        return this.busy
    }
}
function ready(){
    const cards=Array.from(document.getElementsByClassName('card'))
    const overlays=Array.from(document.getElementsByClassName('overlay-text'))
    const games=new MixOrMatch(100,cards)
    overlays.forEach((overlay)=>{
        overlay.addEventListener('click',()=>{
            overlay.classList.remove('visible');
            games.runningGame();
        })
    })
    cards.forEach(card=>{
        card.addEventListener('click',()=>{
            games.flipCard(card)
            games.checkCardMatch(card)
        })
    })
}
ready();