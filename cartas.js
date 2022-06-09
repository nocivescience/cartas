class AudioControles{
    constructor(){
        this.backgroundMusic = new Audio("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/flip.wav");
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
    shuffleCards(cardsArray){
        for(let i = card.length - 1; i > 0; i--){
            let randomIndex = Math.floor(Math.random() * (i + 1));
            [card[i], card[randomIndex]] = [card[randomIndex], card[i]];
        }
        cardsArray = cardsArray.map((card,index)=>{
            card.style.order = index;
        })
    };
    getCardType(card){
        return card.getElementsByClassName('card-value')[0].id;
    };
    
}
function update(){
    let overlay = Array.from(document.querySelectorAll(".overlay-text"));
    let cards=Array.from(document.querySelectorAll(".card"));
    let game=new MixOrMatch(20,cards);
    game.startGame();
}
if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",update);
}else{
    update();
}