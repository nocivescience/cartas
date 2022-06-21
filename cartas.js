class MixOrMatch{
    constructor(totalTime,cards){
        this.totalTime=totalTime;
        this.cards=cards;
        this.busy=true;
    }
    startCountDown(){
        return setInterval(()=>{
            
        })
    }
}
function ready(){
    const cards=Array.from(document.getElementsByClassName('.card'))
    const overlays=Array.from(document.getElementsByClassName('.overlay-text'))
    const games=new MixOrMatch(100,cards)
    games.startGame()
}
ready();