// First tutorial in pluralsight
// A simple Blackjack game 

let suit = ['Hearts', 'Spade', 'Diamond', 'Club'];
let value = ['King', 'Queen', 'Jack', 'Ace', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];



function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suit.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < value.length; valueIdx++) {
            deck.push(value[valueIdx] + " of " + suit[suitIdx]);
        }
    }
    return deck;
}

let deck = createDeck()

function getNextCard() {
    return deck.shift();
}

for (let i = 0; i < deck.length; i++) {
    console.log(deck[i]);
}

console.log("Welcome to Blackjack!");
console.log("You are dealt: ");
console.log(" " + getNextCard());
console.log(" " + getNextCard());