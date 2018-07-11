// First tutorial in pluralsight
// A simple Blackjack game 


//Card variables
let suits = ['Hearts', 'Spade', 'Diamond', 'Club'];
let values = ['King', 'Queen', 'Jack', 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];


let textarea = document.getElementById('text-area')
let newGameButton = document.getElementById('new-game');
let hit = document.getElementById('hitbut');
let stay = document.getElementById('staybut');

//Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    playerCards = [],
    dealerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hit.style.display = 'none';
stay.style.display = 'none';
showStatus()


// New Button 
newGameButton.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck()
    shuffleDeck(deck);
    playerCards = [getNextCard(), getNextCard()];
    dealerCards = [getNextCard(), getNextCard()];

    newGameButton.style.display = 'none'
    hit.style.display = 'inline';
    stay.style.display = 'inline'
    showStatus()
})


// Hit button
hit.addEventListener('click', function () {
    playerCards.push(getNextCard());
    checkForEndGame();
    showStatus()
})

// Stay button
stay.addEventListener('click', function () {
    gameOver = true;
    checkForEndGame();
    showStatus();
})


function checkForEndGame() {
    updateScore()
    // For dealer to pick up cards
    if (gameOver) {
        while (dealerScore < playerScore && dealerScore <= 21 && playerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScore();
        }
    }
// To check who won the game 
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
}

function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}

function getCardValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        card = cardArray[i];
        score += getCardValue(card);
        if (card.value == 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score
}


function updateScore() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);

}

function shuffleDeck(deck) {
    for (i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp
    }
}

function getNextCard() {
    return deck.shift();
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

function showStatus() {
    if (!gameStarted) {
        textarea.innerHTML = 'Welcome to Blackjack';
        return
    }

    let dealerCardString = ''
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = ''
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScore()

    textarea.innerText =
        'Dealer has :\n' +
        dealerCardString +
        '(score:' + dealerScore + ')\n\n' +

        'Player has :\n' +
        playerCardString +
        '(score:' + playerScore + ')\n\n'

    if (gameOver) {
        if (playerWon) {
            textarea.innerText += "YOU WIN!";
        } else {
            textarea.innerText = +"DEALER WINS";
        }
        newGameButton.style.display = 'inline';
        hit.style.display = 'none';
        stay.style.display = 'none';
    }


}