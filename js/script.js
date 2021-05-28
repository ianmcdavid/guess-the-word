//Shows letters already guessed
const guessedLetterField = document.querySelector(".guessed-letters");
//The button pressed to make guess
const guessButton = document.querySelector(".guess");
//The input box for guessing letter
const guessBox = document.querySelector("input");
//Field showing the word in stages of reveal
const wordInProgress = document.querySelector(".word-in-progress");
//Message recording number of guesses left
const remainingGuessesField = document.querySelector(".remaining");
//Number in the guesses left message
const numRemainingGuesses = document.querySelector("span");
//Field to display messages to player
const message = document.querySelector(".message");
//Button to restart the game
const playAgain = document.querySelector(".play-again");
//The word to be guessed
let word = "";
//Array containing letters previously guessed
const guessedLetters = [];
//Number of remaining guesses
let remainingGuesses = 8;
//Function to fetch word list
const getWord = async function () {
    const results = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await results.text();
    //console.log(data);
    const wordArray = data.split("\n");
    //console.log(wordArray);
    selectRandomWord(wordArray);
};
getWord();

const selectRandomWord = function (wordArray) {
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex];
    const theWord = randomWord.trim();
    //console.log(theWord);
    word = theWord;
    revealLetters(word);
};



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
        guessCounter(guess);
        revealLetters(guessedLetters);
        checkIfWinner();
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
    //console.log(revealedLetters);
    wordInProgress.innerText = revealedLetters.join("");
    //console.log(wordInProgress.innerText);
    
};  

const guessCounter = function (guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = "Hey, you guessed right!";
        
    } else {
        message.innerText = "Nope. Sorry, try again!";
        remainingGuesses -= 1;
    };
    if (remainingGuesses === 0) {
        message.innerText = `Bummer, you lost! The word was "${word}".`;
        remainingGuessesField.innerText = "";
        startOver();
    } else if (remainingGuesses === 1) {
        numRemainingGuesses.innerText = "1 guess";
    } else if (remainingGuesses > 1) {
        numRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    }

};

const checkIfWinner = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    } 
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesField.classList.add("hide");
    wordInProgress.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    remainingGuesses = 8;
    guessedLetters.length = 0;
    guessedLetterField.innerText = "";
    remainingGuessesField.classList.remove("hide");
    numRemainingGuesses.innerText = "8 guesses";
    guessButton.classList.remove("hide");
    wordInProgress.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});