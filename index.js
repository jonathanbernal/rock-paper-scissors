// Player buttons
const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');
// This reference is used to add the audio effect to all 3 buttons at once.
const playerButtons = document.querySelectorAll('.player-button');

// Scoreboard and results
const playerScoreText = document.querySelector('.player-score');
const computerScoreText = document.querySelector('.computer-score');
const result = document.querySelector('.result');

// dialog element selectors
const dialogPrompt = document.querySelector('.dialog-prompt');
const dialogTitle = document.querySelector('.dialog-title');
const yesButton = document.querySelector('button[value="yes"]');
const noButton = document.querySelector('button[value="no"]');

// audio elements
const selectSound = document.querySelector('audio[data-key="select"]');
const rockSound = document.querySelector('audio[data-key="rock"]');
const paperSound = document.querySelector('audio[data-key="paper"]');
const scissorsSound = document.querySelector('audio[data-key="scissors"]');
const winSound = document.querySelector('audio[data-key="win"]');
const loseSound = document.querySelector('audio[data-key="lose"]');


// Define player and computer (COM) scores
const computerChoices = ["rock", "paper", "scissors"];
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
 * This function renders the argument text on the result HTML element.
 * This function is used to decouple the functionality of playRound(),
 * thus eliminating the text rendering side effect.
 * 
 * @param {String} text the string to render on the result HTML element
 */
let renderOnResultElement = (text) => {
    result.textContent = text;
}

/**
 * This function plays a round of rock, paper, scissors against the COM and returns
 * the result of the game as a string.
 * 
 * @param {String} playerSelection the player's choice obtained from the prompt
 * @param {String} computerChoice the previously generated computer choice.
 * @returns {String} the result of the match
 * 
 */
let playRound = (playerSelection, computerChoice) => {
    // Sanitize user choice before comparing it with the computer's choice
    switch( playerSelection.toLowerCase() )
    {
        case 'rock':
            if (computerChoice === 'rock'){
                return "It's a tie! Rock - Rock";
            }
            else if (computerChoice === 'paper'){
                computerScore++;
                updateScores();
                return "You lose! Paper beats Rock!";
            }
            else if (computerChoice === 'scissors'){
                playerScore++;
                updateScores();
                return "You win! Rock beats Scissors!";
            }
            break;
        case 'paper':
            if (computerChoice === 'rock'){
                playerScore++;
                updateScores();
                return 'You win! Paper beats Rock!';
            }
            else if (computerChoice === 'paper'){
                return "It's a tie! Paper - Paper!";
            }
            else if (computerChoice === 'scissors'){
                computerScore++;
                updateScores();
                return 'You lose! Scissors beats Paper!';
            }
            break;
        case 'scissors':
            if (computerChoice === 'rock'){
                computerScore++;
                updateScores();
                return 'You lose! Rock beats Scissors!';
            }
            else if (computerChoice === 'paper'){
                playerScore++;
                updateScores();
                return 'You win! Scissors beats Paper';
            }
            else if (computerChoice === 'scissors'){
                return "It's a tie! Scissors - Scissors!"
            }
            break;
        default:
            return 'Invalid player choice. Enter rock, paper, or scissors.';
    }
}

/**
 * This function renders and updates the scores. Call it when a change in the
 * score values has occurred.
 */
let updateScores = () => {
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
}

/**
 * This function determines the winner of the game once a total of 5 games are won
 * by either the player or the computer. It then prompts the player to replay the game
 */
let announceWinner = () => {
    if ( playerScore === 5 ){
        renderOnResultElement('Congrats! You win!');
        askForReplay();
    }  
    else if ( computerScore === 5 ){
        renderOnResultElement('Sorry, you lose! Computer wins!');
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

    if ( didPlayerWin() ){
        winSound.play();
        dialogTitle.textContent = 'You win!';
    }
    else if ( didComputerWin() ){
        loseSound.play();
        dialogTitle.textContent = 'You lose!';
    }

    let playerChoice = dialogPrompt.showModal();
    addBlur(document.body);
}

/**
 * This function adds a blur effect to the target element.
 * 
 * @param {HTMLElement} element the element to add the blur effect to
 */
let addBlur = (element) => {
    element.classList.add('blur');
}

/**
 * This function removes the blur effect to the target element.
 * 
 * @param {HTMLElement} element the element to remove the blur effect from
 */
let removeBlur = (element) => {
    element.classList.remove('blur');
}

rockButton.addEventListener('mouseover', () => {
    // We need to reset the current time because a player may hover over all the player
    // buttons in rapid succession and the sound for one button might not finish playing
    // before the player hovers over another button.
    selectSound.currentTime = 0;
    selectSound.play();
});

paperButton.addEventListener('mouseover', () => {
    selectSound.currentTime = 0;
    selectSound.play();
});

scissorsButton.addEventListener('mouseover', () => {
    selectSound.currentTime = 0;
    selectSound.play();
});

// Add event listeners to the three buttons. Pressing each button will play
// the game once and update the score based on the results.
rockButton.addEventListener('click', (evt) => {
    rockSound.currentTime = 0;
    rockSound.play();
    // Update the score on event clicks, so that the player can see the final
    // result until they click on a button again.
    updateScores();

    // Play a round, store the result, and render it on the result HTML element
    let roundResult = playRound(evt.target.value, getComputerChoice());
    renderOnResultElement(roundResult);

    announceWinner();
});

paperButton.addEventListener('click', (evt) => {
    paperSound.currentTime = 0;
    paperSound.play();
    updateScores();
    let roundResult = playRound(evt.target.value, getComputerChoice());
    renderOnResultElement(roundResult);
    announceWinner();
});

scissorsButton.addEventListener('click', (evt) => {
    scissorsSound.currentTime = 0;
    scissorsSound.play();
    updateScores();
    let roundResult = playRound(evt.target.value, getComputerChoice());
    renderOnResultElement(roundResult);
    announceWinner();
});

// Here we need a reference to the dialog itself, hence
// why we use function() as opposed to a lambda.
dialogPrompt.addEventListener('keydown', function(evt){
    if (evt.keyCode === 27) { // triggered when the player presses ESC
        removeBlur(document.body);
        this.close();
    }
});

yesButton.addEventListener('click', () => {
    location.reload(); // reload the window
});

noButton.addEventListener('click', () => {
    removeBlur(document.body);
    dialogPrompt.close();
});