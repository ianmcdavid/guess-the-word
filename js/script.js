//Shows letters already guessed
const guessedLetterField = document.querySelector(".guessed-letters");
//The button pressed to make guess
const guessButton = document.querySelector(".guess");
//The input box for guessing letter
const guessBox = document.querySelector("input");
//Field showing the word in stages of reveal
const wordInProgress = document.querySelector(".word-in-progress");
//Message recording number of guesses left
const remainingGuesses = document.querySelector(".remaining");
//Number in the guesses left message
const numRemainingGuesses = document.querySelector("span");
//Field to display messages to player
const message = document.querySelector(".message");
//Button to restart the game
const playAgain = document.querySelector(".play-again");
//The word to be guessed
const word = "magnolia";
//Array containing letters previously guessed
const guessedLetters = [];

//Function managing the Word In Progress field
const revealCorrect = function (word) {
    let wordArray = word.split("");
    let placeHolder = wordArray.map(function (letter) {
        return "&#9679;";
    })
    const showCircles = placeHolder.join(" ");
    wordInProgress.innerHTML = showCircles;
};
revealCorrect(word);

//Function handling the Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    let guess = guessBox.value;
    //console.log(guess);
    message.innerText = "";
    let validInput = inputValidator(guess);
    
    //console.log(validInput);
    if (validInput) {
        makeGuess(guess);
    }
    guessBox.value = "";
});

//Function to ensure player inputs correctly
const inputValidator = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
       message.innerText = "You have to guess something, silly.";
    } else if (input.length > 1) {
        message.innerText = "One letter at a time, please.";
    } else if (input.match(acceptedLetter) === null) {
        message.innerText = "You spell words with letters...";
    } else {
        return input;
    }
};

//Function to display previously guessed letters
const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Whoops, can't you see you've guessed that already?";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
    
};
