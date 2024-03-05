const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  //lockboard while cards are being checked
  if (lockBoard) return;
  //checks if the first card is clicked to avoid a double click and the card staying flipped as the data is from the same card
  if (this === firstCard) return;

  this.classList.toggle('flip')

  if(!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  } 
  //second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  //do cards match?

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  //if it's a match = true, disable cards, if false = unflip cards
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  //It's a match!
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  //Not a match!
  //Add timeout function to allow second card to flip.
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));