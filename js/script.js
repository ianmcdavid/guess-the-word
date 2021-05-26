const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessBox = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numRemainingGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";

const revealCorrect = function (word) {
    let wordArray = word.split("");
    let placeHolder = wordArray.map(function (letter) {
        return "&#9679;";
    })
    const showCircles = placeHolder.join(" ");
    wordInProgress.innerHTML = showCircles;
};

revealCorrect(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = guessBox.value;
    console.log(guess);
});