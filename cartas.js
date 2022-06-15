class MixOrMatch{
    constructor(cards) {
        this.cards=cards;
        this.cardsArray=[];
        this.busy=false;
        this.emptyCards=null;
    }
    PairOfCardsFailed(card1, card2) {
        this.cardsArray.push(card1);
        this.cardsArray.push(card2);
        card1.classList.add('hidden');
    }
    showingCards(card){
        
    }
    checkCardType(card){
        return card.querySelectorAll('.card-value')[0].id;
    };
}
function ready() {
    const cards = Array.from(document.querySelectorAll('.card'));
    const mixOrMatch = new MixOrMatch(cards);
    cards.forEach(card => {
        card.addEventListener('click', () => {
            mixOrMatch.showingCards(card);
        });
    });
};
ready();