
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


updateScoreElement();





document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

// Add an event listener for key presses
document.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});



// calculate result
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
      score.losses += 1;
    } else if (computerMove === 'paper') {
      result = 'You win.';
      score.wins += 1;
    } else {
      result = 'Tie.';
      score.ties += 1;
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
      score.wins += 1;
    } else if (computerMove === 'paper') {
      result = 'Tie.';
      score.ties += 1;
    } else {
      result = 'You lose.';
      score.losses += 1;
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
      score.ties += 1;
    } else if (computerMove === 'paper') {
      result = 'You lose.';
      score.losses += 1;
    } else {
      result = 'You win.';
      score.wins += 1;
    }
  }

  // update the score and store it using 
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  // show the new score and the updated images using "document.querySelector"  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `
    You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;
}


// Met à jour l'affichage du score dans la page
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


// Tire un coup aléatoire pour l'ordinateur
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}