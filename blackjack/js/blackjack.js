const deck = [2, 3, 4, 5, 6, 7, 8, 9, 'J', 'Q', 'K', 'A'];
const dealer = document.querySelector('.dealer');
const player = document.querySelector('.player');
const playerCard1 = document.querySelectorAll('.player-card')[0];
const playerCard2 = document.querySelectorAll('.player-card')[1];
const dealerCard1 = document.querySelectorAll('.dealer-card')[0];
const dealerCard2 = document.querySelectorAll('.dealer-card')[1];
let newCard;
const startBtn = document.querySelector('.start');
const standBtn = document.querySelector('.stand');
const hitBtn = document.querySelector('.hit');
const scores = document.querySelector('.scores')
const winner = document.querySelector('.winner')
let playerScore = 0;
let dealerScore = 0;

const assignRandomValue = (card) => {
    card.textContent = deck[Math.floor(Math.random() * deck.length)];
};

const askNewCard = (person) => {
    newCard = document.createElement('div');
    newCard.classList.add('card');
    assignRandomValue(newCard);
    checkCardValue(newCard.textContent)
    person.append(newCard);
};

const checkCardValue = (card) => {
    if (card.textContent == 'A') {
        return 11;
    }
    else if (Number.isNaN(parseInt(card.textContent)) === true) {
        return 10;
    } else {
        return parseInt(card.textContent);
    }
};

const calcInitialScore = () => {
    playerScore += checkCardValue(playerCard1) + checkCardValue(playerCard2)
    dealerScore += checkCardValue(dealerCard1)
};

const checkWinner = () => {
    if (playerScore > dealerScore) {
        if (playerScore > 21) {
            winner.textContent = `You lose. Refresh the page for a new game.`;
        } else {
            winner.textContent = `You win!! Refresh the page for a new game.`;
        }
    } else if (dealerScore > playerScore) {
        if (dealerScore > 21) {
            winner.textContent = `You win!! Refresh the page for a new game.`;
        } else {
            winner.textContent = `You lose. Refresh the page for a new game.`;
        }
    } else if (playerScore === dealerScore) {
        winner.textContent = `It's a tie.  Refresh the page for a new game.`;
    }
};

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    standBtn.disabled = false;
    hitBtn.disabled = false;
    assignRandomValue(playerCard1);
    assignRandomValue(playerCard2);
    assignRandomValue(dealerCard1);
    calcInitialScore();
});

hitBtn.addEventListener('click', () => {
    askNewCard(player);
    playerScore += checkCardValue(newCard);
});

standBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    standBtn.disabled = true;
    hitBtn.disabled = true;
    assignRandomValue(dealerCard2);
    dealerScore += checkCardValue(dealerCard2);
    while (dealerScore < 17) {
        askNewCard(dealer);
        dealerScore += checkCardValue(newCard);
    }
    checkWinner();
});





