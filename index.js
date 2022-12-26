const computerChoices = ["rock", "paper", "scissors"];
const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');
const result = document.querySelector('.result');
const score = document.querySelector('.score');

// Define player and computer (COM) scores
let playerScore = 0;
let computerScore = 0;

/**
 * This function generates a choice of rock, paper, scissors for the computer (COM).
 * @returns the choice of the computer
 */
let getComputerChoice = () => {
    return computerChoices[Math.round(Math.random() * 2)];
}

/**
 * This function plays a round of rock, paper, scissors against the COM and returns
 * the result of the game as a string.
 * 
 * The result is then rendered on the main page.
 * 
 * @param {String} playerSelection the player's choice obtained from the prompt
 * @param {String} computerChoice the previously generated computer choice.
 * 
 */
let playRound = (playerSelection, computerChoice) => {
    // Sanitize user choice before comparing it with the computer's choice
    switch(playerSelection.toLowerCase())
    {
        case 'rock':
            if (computerChoice === 'rock'){
                result.textContent = "It's a tie! Rock - Rock";
            }
            else if (computerChoice === 'paper'){
                computerScore++;
                result.textContent = "You lose! Paper beats Rock!";
            }
            else if (computerChoice === 'scissors'){
                playerScore++;
                result.textContent = "You win! Rock beats Scissors!";
            }
            break;
        case 'paper':
            if (computerChoice === 'rock'){
                playerScore++;
                result.textContent = 'You win! Paper beats Rock!';
            }
            else if (computerChoice === 'paper'){
                result.textContent = "It's a tie! Paper - Paper!";
            }
            else if (computerChoice === 'scissors'){
                computerScore++;
                result.textContent = 'You lose! Scissors beats Paper!';
            }
            break;
        case 'scissors':
            if (computerChoice === 'rock'){
                computerScore++;
                result.textContent = 'You lose! Rock beats Scissors!';
            }
            else if (computerChoice === 'paper'){
                playerScore++;
                result.textContent = 'You win! Scissors beats Paper';
            }
            else if (computerChoice === 'scissors'){
                result.textContent = "It's a tie! Scissors - Scissors!"
            }
            break;
        default:
            result.textContent = 'Invalid player choice. Enter rock, paper, or scissors.';
    }
}

// Add event listeners to the three buttons. Pressing each button will play
// the game once and update the score based on the results.
rockButton.addEventListener('click', (evt) => {
    playRound(evt.target.value, getComputerChoice());
});

paperButton.addEventListener('click', (evt) => {
    playRound(evt.target.value, getComputerChoice());
});

scissorsButton.addEventListener('click', (evt) => {
    playRound(evt.target.value, getComputerChoice());
});



