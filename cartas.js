class MixOrMatch{
    constructor(totalTime, cards) {
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
    }
    startGame() {
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.busy = false;
        }, 500)
    };
    flipCard(card) {
        if (this.canFlipCard(card)) {
            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            }else{
                this.cardToCheck = card;
            }
        }
    };
    checkForCardMatch(card){
        if(this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.checkForCardMatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    };
    checkForCardMatch(card1,card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('active');
        card2.classList.add('active');
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    };
    cardType(card) {
        return card.getElementsByClassName('card-value')[0].id;
    };
}
function ready(){
    let cards=Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(60,cards);
    document.getElementById('laCosaNostra').addEventListener('click',()=>{
        game.startGame();
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        })
    });
}
ready();