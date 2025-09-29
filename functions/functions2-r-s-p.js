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



function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === 'scissors') {
    if(ComputerMove === 'rock') {
      result = 'You lose.';
      losses += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    }
    else if(ComputerMove === 'paper') {
      result = 'You win.';
      wins += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    }
    else{
      result = 'Try again.';
      ties += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    }
  }
  else if (playerMove === 'paper') {
    if(ComputerMove === 'rock') {
      result = 'You win.';
      wins += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    }
    else if(ComputerMove === 'paper') {
      result = 'Try again.';
      ties += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    }
    else{
      result = 'You lose.';
      losses += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    }
  }
  else{
    if(ComputerMove === 'rock') {
      result = 'Try again.';
      ties += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    } 
    else if(ComputerMove === 'paper') {
      result = 'You lose.';
      losses += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    }
    else{
      result = 'You win.';
      wins += 1;
      updateScoreElement();
      localStorage.setItem('score', JSON.stringify(score));
    }

  }
  


  // calculate result
  // update the score and store it using localStorage.setItem
  // show the new score and the updated images using "document.querySelector"

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

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