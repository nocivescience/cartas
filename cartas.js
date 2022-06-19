class MixOrMatch{
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
    }
    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards(this.cardsArray);
            this.busy = false;
        }, 500)
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    shuffleCards(cardsArray) {
        for(let i = cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let itemAtIndex = cardsArray[randomIndex];
            cardsArray[randomIndex] = cardsArray[i];
            cardsArray[i] = itemAtIndex;
        }
    };
    flipCard(card) {
        card.classList.add('visible');
        this.totalClicks++;
        this.ticker.innerText = this.totalClicks;
        if(this.cardToCheck) {
            this.checkForCardMatch(card);
        } else {
            this.cardToCheck = card;
        };
    }
    checkForCardMatch(card) {
        if(this.getTypeCard(card) === this.getTypeCard(this.cardToCheck)) {
            alert('match');
        }else{
            alert('no match');
        }
        this.cardToCheck = null;
    };
    cardMatch(card1,card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length) {
            alert('You found them all!');
        }
    }
    getTypeCard(card) {
        return card.getElementsByClassName('card-value')[0].id;
    };
}
function ready(){
    const cards= Array.from(document.querySelectorAll('.card'));
    const overlays = Array.from(document.querySelectorAll('.overlay-text'));
    const game = new MixOrMatch(60, cards);
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
};
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}