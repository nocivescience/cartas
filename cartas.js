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

            this.countdown = this.startCountdown();
            this.busy = false;
     
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    };
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            document.getElementById(
                'game-over-text'
            ).classList.add('visible');
        },1000);
    };
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    };
}
// if(document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', ready);
// }else {
//     ready();
// };
function ready() {
    const overlays=document.querySelectorAll('.overlay-text');
    const gamesEl=new MixOrMatch(30,overlays);
    overlays.forEach(overlay=>{
        overlay.addEventListener('click',function(){
            overlay.classList.remove('visible');
            gamesEl.startGame();
        })
    });
}
ready();