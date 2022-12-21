const computerChoices = ["rock", "paper", "scissors"];
const GAME_ROUNDS = 5; // Defines the number of attempts the user will play against the COM

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
 * @param {String} playerSelection the player's choice obtained from the prompt
 * @param {String} computerChoice the previously generated computer choice.
 * @returns the result of the match
 */
let playRound = (playerSelection, computerChoice) => {
    // Sanitize user choice before comparing it with the computer's choice
    switch(playerSelection.toLowerCase())
    {
        case 'rock':
            if (computerChoice === 'rock')
                return "It's a tie! Rock - Rock";
            else if (computerChoice === 'paper')
                return "You lose! Paper beats Rock!";
            else if (computerChoice === 'scissors')
                return "You win! Rock beats Scissors!";
            break;
        case 'paper':
            if (computerChoice === 'rock')
                return 'You win! Paper beats Rock!';
            else if (computerChoice === 'paper')
                return "It's a tie! Paper - Paper!";
            else if (computerChoice === 'scissors')
                return 'You lose! Scissors beats Paper!';
            break;
        case 'scissors':
            if (computerChoice === 'rock')
                return 'You lose! Rock beats Scissors!'
            else if (computerChoice === 'paper')
                return 'You win! Scissors beats Paper'
            else if (computerChoice === 'scissors')
                return "It's a tie! Scissors - Scissors!"
            break;
        default:
            return 'Invalid player choice. Enter rock, paper, or scissors.';
    }
}

let game = () => {
    let playerSelection;

    for(let i = 0; i < GAME_ROUNDS; i++){
        playerSelection = prompt("Enter your choice: "); // This prompt is called again on each round
        console.log( playRound(playerSelection, getComputerChoice()) );
    }
}

// Initialize the game
game();



