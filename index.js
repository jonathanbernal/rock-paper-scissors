const computerChoices = ["rock", "paper", "scissors"];
const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');
const result = document.querySelector('.result');
const playerScoreText = document.querySelector('.player-score');
const computerScoreText = document.querySelector('.computer-score');

// dialog element selectors
const dialogPrompt = document.querySelector('.dialog-prompt');
const dialogTitle = document.querySelector('.dialog-title');
const yesButton = document.querySelector('button[value="yes"]');
const noButton = document.querySelector('button[value="no"]');

// Define player and computer (COM) scores
let playerScore = 0;
let computerScore = 0;

/**
 * This function generates a choice of rock, paper, scissors for the computer (COM).
 * @returns the choice of the computer
 */
let getComputerChoice = () => {
    return computerChoices[Math.round( Math.random() * 2 )];
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
    switch( playerSelection.toLowerCase() )
    {
        case 'rock':
            if (computerChoice === 'rock'){
                result.textContent = "It's a tie! Rock - Rock";
            }
            else if (computerChoice === 'paper'){
                computerScore++;
                updateScore();
                result.textContent = "You lose! Paper beats Rock!";
            }
            else if (computerChoice === 'scissors'){
                playerScore++;
                updateScore();
                result.textContent = "You win! Rock beats Scissors!";
            }
            break;
        case 'paper':
            if (computerChoice === 'rock'){
                playerScore++;
                updateScore();
                result.textContent = 'You win! Paper beats Rock!';
            }
            else if (computerChoice === 'paper'){
                result.textContent = "It's a tie! Paper - Paper!";
            }
            else if (computerChoice === 'scissors'){
                computerScore++;
                updateScore();
                result.textContent = 'You lose! Scissors beats Paper!';
            }
            break;
        case 'scissors':
            if (computerChoice === 'rock'){
                computerScore++;
                updateScore();
                result.textContent = 'You lose! Rock beats Scissors!';
            }
            else if (computerChoice === 'paper'){
                playerScore++;
                updateScore();
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

/**
 * This function renders and updates the scores. Call it when a change in the
 * score values has occurred.
 */
let updateScore = () => {
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
}

/**
 * This function determines the winner of the game once a total of 5 games are won
 * by either the player or the computer.
 */
let announceWinner = () => {
    if ( playerScore === 5 ){
        result.textContent = 'Congrats! You win!';
        askForReplay();
    }  
    else if ( computerScore === 5 ){
        result.textContent = 'Sorry, you lose! Computer wins!';
        askForReplay();
    }
    // Check for scores and make sure there is a winner
    resetScores();
}

/**
 *  This function checks whether the player won the game
 * @returns whether or not the player won the game
 */
let didPlayerWin = () => playerScore === 5;

/**
 * This function checks whether the player won the game
 * @returns whether or not the computer won the game
 */
let didComputerWin = () => computerScore === 5;

/**
 * This function resets the scores back to 0 when either player wins 5 rounds;
 */
let resetScores = () => {
    // perform a sanity check in order to prevent possible abuse by
    // resetting the scores in places where they should not be reset;
    if( didPlayerWin() || didComputerWin() ){
        playerScore = 0;
        computerScore = 0;
    }
}

/**
 * This function asks whether the player wants to play again or not.
 * It checks the both the player's and COM's score before making a
 * decision.
 */
let askForReplay = () => {

    if ( didPlayerWin() )
        dialogTitle.textContent = 'You win!';
    else if ( didComputerWin() )
        dialogTitle.textContent = 'You lose!';

    let playerChoice = dialogPrompt.showModal();
}

// Add event listeners to the three buttons. Pressing each button will play
// the game once and update the score based on the results.
rockButton.addEventListener('click', (evt) => {
    // Update the score on event clicks, so that the player can see the final
    // result until they click on a button again.
    updateScore();
    playRound(evt.target.value, getComputerChoice());
    announceWinner();
});

paperButton.addEventListener('click', (evt) => {
    updateScore();
    playRound(evt.target.value, getComputerChoice());
    announceWinner();
});

scissorsButton.addEventListener('click', (evt) => {
    updateScore();
    playRound(evt.target.value, getComputerChoice());
    announceWinner();
});

// Here we need a reference to the dialog itself, hence
// why we use function() as opposed to a lambda.
dialogPrompt.addEventListener('keydown', function(evt){
    if (evt.keyCode === 27) { // triggered when the player presses ESC
        console.log('closing dialog');
        this.close();
    }
});

yesButton.addEventListener('click', () => {
    location.reload(); // reload the window
});

noButton.addEventListener('click', () => dialogPrompt.close());



