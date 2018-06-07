
// Word Lists
var easyList =['ITALY', 'IRELAND','UNITED KINGDOM', 'SPAIN', 'PORTUGAL', 'GERMANY', 'AUSTRIA', 'BELGIUM', 'CZECH REPUBLIC', 'FRANCE'];

var wins = 0;                   // total number of wins
var losses = 0;                 // total number of losses
var displayWord;            //what word is displayed on the page
var guessedLetter =[];       //letters guessed already
var toGuess = [];       // how much of the word the user has guessed
var guessLeft = 12;         // how many guesses have left
var modeLeft = 12;          // keeps track of starting guesses Left
var word;           // word from wordList that needs to be guessed 
var wordList = easyList;    // wordList either easy, medium, or hard
var currentList;            //keeps track of List selected
var key;                    //keeps track of key pressed
var noKey;
var proceed;
var gameEnd;
             



//Chooses the easy, medium, or hard difficulty word lists
function easyBtn(){
    wordList = easyList;
    currentList = easyList;
    guessLeft = 12;
    modeLeft = guessLeft;
    startGame();

}

function medBtn() {
    // wordList = medList;
    // currentList = medList;
    guessLeft = 10;
    modeLeft = guessLeft;
    startGame();
}

function hardBtn() {
    // wordList = hardList;
    // currentList = hardList;
    guessLeft = 8;
    modeLeft = guessLeft;
    startGame();
}

// Starts the game by choosing a new word from list, 
// sets the guessedLetter array as empty,
// creates a toGuess array that has as many "_" as there are characters in the word 
function startGame() {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetter =[];
    toGuess = [];


    displayWord = document.querySelector('.displayWord');

    // creates a toGuess array that has as many "_" as there are characters in the word 
    for (var i = 0; i <word.length; i++){

        if(word[i] == " "){
            toGuess.push(" ");
        

        }else{
            toGuess.push("_");
 
        }
        
    }

    displayWord.innerHTML = toGuess.join("");

    document.querySelector('.guessLeft').innerText = guessLeft;
    document.querySelector('.guessedLetter').innerText = guessedLetter;
    document.querySelector('.result').innerHTML ="";

    document.onkeyup = keyLetter;
}

// function that determines whether the user can keep playing, user has one, or user has lost
function keyLetter(event){
    gameEnd = false;

    if (gameEnd == false){
        // user can continue playing if guessLeft (the amount of guesses left is > 0 and if there are no "_" (characters) left to solve in word)
        if (guessLeft > 0 && toGuess.indexOf('_') > -1){
            if(event.which >= 65 && event.which <= 90){
                key = event.key.toUpperCase();
                guessCorrect();
            }  
        }
        else {
            // user has guessed all characters so user has Won!
            if(toGuess.indexOf('_') == -1){
                document.querySelector('.result').innerHTML = "<p style='letter-spacing: 0px; font-size: 2vw; color: green;'>You Win!, click a level or press a key to play again<p>";
                wins++;
                document.querySelector('.wins').innerHTML = wins;
                gameEnd = true;
                guessLeft = modeLeft;
                document.onkeyup = startGame;
                

            }
            // user has not guessed all characters and has no guesses left so user has Lost!
            else{
                document.querySelector('.result').innerHTML = "<p style='letter-spacing: 0px; font-size: 2vw; color: green;'>You Lose!, click a level or press a key to play again<p>";
                losses++;
                document.querySelector('.losses').innerHTML = losses;
                gameEnd = true;
                guessLeft = modeLeft;
                document.onkeyup = startGame;
            }

        }
    }


}

// function that determines if the user's guess is a correct letter in the word
function guessCorrect(){
    noKey = true;
    proceed = true;

    // if the user hits a key that they already picked it does not change the guessedLetter array or the amount of guesses left (guessLeft)
    for (var x = 0; x < guessedLetter.length; x++){
        if (guessedLetter[x] == key || toGuess[x] == key ){
            proceed = false;
        }
    }

        if(proceed == true){
            // updates the toGuess array if the key pressed by the user is the same as a letter in the array
            for (var i = 0; i < word.length; i++){
                if (word[i] == key){
                    toGuess[i] = word[i];
                    displayWord.innerHTML = toGuess.join("");
                    noKey = false;
                    if(toGuess.indexOf('_') == -1){
                        break;
                    }
                }
            }
            
            // updates the guessedLetter array if the key pressed is not in the guessedLetter array already and is not a character of the word
            if(noKey == true){

                guessedLetter.push(key);
                document.querySelector('.guessedLetter').innerText = guessedLetter;
                guessLeft--;
                document.querySelector('.guessLeft').innerText = guessLeft;

            }
        }

    document.onkeyup = keyLetter;


}




