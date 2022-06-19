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
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0) {
                this.gameOver();
            }
        },1000);
    };
    shuffleCards(cardsArray) {
        for(let i = cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[randomIndex]] = [cardsArray[randomIndex], cardsArray[i]];
        }
        cardsArray=cardsArray.map((card, index) => {
            card.style.order = index;
        });
    };
    flipCard(card) {
        if(this.carFlipCard(card)) {
            card.classList.add('visible');
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            };
        };
    }
    carFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && !card.classList.contains('visible');
    };
    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-message').classList.add('visible');
    };
    checkForCardMatch(card) {
        if(this.getTypeCard(card) === this.getTypeCard(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        }else{
            this.cardMismatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    };
    victory(){
        clearInterval(this.countdown);
    }
    cardMatch(card1,card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length) {
            this.victory();
        }
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    };
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible'); //this busy es para que no se pueda hacer click en las cartas de nuevo
            card2.classList.remove('visible');
            this.busy = false;
        });
    };
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