class AudioControles{
    constructor(){
        this.backgroundMusic = new Audio("asserts/halloween.mp3");
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5;
    }
}
class MixOrMatch{
    constructor(totalTime,card){
        this.totalTime = totalTime;
        this.cardsArray = card;
        this.timer = document.querySelector("#time-remaining");
        this.ticker=document.querySelector("#flips");
        this.audio=new AudioControles();   
    }
    startGame(){
        this.totalClick = 0;
        this.cardToCheck = null;
        this.matchedCard = [];
        this.busy = true;
        setTimeout(() => {
            this.audio.backgroundMusic.play();
            alert("Bienvenido a la Batalla de las Cartas");
        },1000);
    }
}
function update(){
    let overlay = Array.from(document.querySelectorAll(".overlay-text"));
    let cards=Array.from(document.querySelectorAll(".card"));
    let game=new MixOrMatch(20,cards);
    game.startGame();
}
update();