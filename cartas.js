class MixOrMatch{
    constructor(cartas,time){
        this.cartas = cartas;
        this.time = time;
        this.timeRemaing = time;
        this.timer=document.getElementById('time-remaining');
        this.ticker=document.getElementById('flips');
    }
    startGame(){
        this.totalClicks = 0;
        this.timeRemaing = this.time;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(()=>{
            this.shuffleCards(this.cartas)
            this.countDown=this.startCountdown();
            this.busy = false;
        });
    };
    startCountdown(){
        return setInterval(()=>{
            this.timeRemaing--;
            this.timer.innerHTML = this.timeRemaing;
            if(this.timeRemaing === 0){
                this.gameOver();
            }
        },1000);
    };
    gameOver(){
        clearInterval(this.countDown);
        document.getElementById('game_over_text').classList.add('visible');
    };
    shuffleCards(cardsArray){
        for(let i=cardsArray.length-1;i>0;i--){
            const randIndex = Math.floor(Math.random()*(i+1));
            [cardsArray[i],cardsArray[randIndex]] = [cardsArray[randIndex],cardsArray[i]];
        };
        cardsArray=cardsArray.map((card,index)=>{
            card.style.order = index;
        })
    };
    flipCard(carta){
        if(this.canFlipCard(carta)){
            this.totalClicks++;
            this.ticker.innerHTML = this.totalClicks;
            carta.classList.add('visible');
            if(this.cardToCheck){
                this.checkForCardMatch(carta);
            }else{
                this.cardToCheck = carta;
            }
        }
    };
    checkForCardMatch(carta){
        if(this.getCardType(carta) === this.getCardType(this.cardToCheck)){
            this.cardMatch(card,this.cardToCheck)
        }else{
            this.cardMisMatch(carta,this.cardToCheck);
        }
        this.cardToCheck = null;
    };
    cardMatch(card1,card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cartas.length){
            this.victory();
        }
    }
    cardMisMatch(card1,card2){
        this.busy = true;
        setTimeout(()=>{
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        },1000);
    };
    getCardType(carta){
        return carta.getElementsByClassName('card-value')[0].id;
    };
    canFlipCard(carta){
        return !this.busy && !this.matchedCards.includes(carta) && carta !== this.cardToCheck;
    };
}
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}
function ready(){
    const cartas = Array.from(document.getElementsByClassName('card'));
    const overLays = Array.from(document.getElementsByClassName('overlay-text'));
    const gamesEl=new MixOrMatch(cartas,1000);
    overLays.forEach(overLay=>{
        overLay.addEventListener('click',()=>{
            overLay.classList.remove('visible');
            gamesEl.startGame();
        });
    });
    cartas.forEach(carta=>{
        carta.addEventListener('click',()=>{
            gamesEl.flipCard(carta);
        });
    });
};