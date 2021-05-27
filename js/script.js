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
    const wordArray = [];
    for (const letter of word) {
        wordArray.push("⚫️");
    }
        wordInProgress.innerText = wordArray.join("");
};
revealCorrect(word);

//Function handling the Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = guessBox.value;
    //console.log(guess);
    message.innerText = "";
    const validInput = inputValidator(guess);
    
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
        //console.log(guessedLetters);
        updatedGuessed(guess);
        revealLetters(guessedLetters);
    }
    
};

//Function to add previously guessed letters to display
const updatedGuessed = function () {
    guessedLetterField.innerHTML = "";
    for (const letter of guessedLetters) {
        const addLetter = document.createElement("li");
        addLetter.innerText = letter;
        guessedLetterField.append(addLetter);
    }
};

const revealLetters = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealedLetters = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealedLetters.push(letter.toUpperCase())
        } else {
            revealedLetters.push("⚫️");
        }
    }
    console.log(revealedLetters);
    wordInProgress.innerText = revealedLetters.join("");
    console.log(wordInProgress.innerText);
    checkIfWinner();
};  

const checkIfWinner = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }

    
};
