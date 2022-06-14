class MixOrMatch{
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
    }
    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.busy = false;        
            this.shuffleCards(this.cardsArray);
        }, 1000);
    }
    shuffleCards(cardsArray) {
        for(let i=0; i<this.cardsArray.length-1; i--) {
            let randomIndex=Math.floor(Math.random()*(i+1));
            [cardsArray[i], cardsArray[randomIndex]] = [cardsArray[randomIndex], cardsArray[i]];
        };
        cardsArray=cardsArray.map((card,index) => {
            card.style.order = index;
        })
    };
    flipCard(card) {
        this.checkForCardMatch(card);
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    };
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        if(this.matchedCards.length===this.cardsArray.length){
            console.log('victory');
        }
    };
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            this.busy = false;
            console.log(card1, card2);
        });
    };
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].id;
    };
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    };
}
function update(){
    const cards=Array.from(document.querySelectorAll('.card'));
    const gamesEl= new MixOrMatch(10, cards);
    cards.forEach(card => {
        card.addEventListener('click', event => {
            gamesEl.flipCard(card);
        });
    });
}
update();