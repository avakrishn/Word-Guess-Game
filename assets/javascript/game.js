
// Word Lists (default = easyList)
var easyList =['ITALY', 'IRELAND','UNITED KINGDOM', 'SPAIN', 'PORTUGAL', 'GERMANY', 'AUSTRIA', 'BELGIUM', 'CZECH REPUBLIC', 'FRANCE'];

//Global variables
var wins = 0;                   // total number of wins (initially set to 0)
var losses = 0;                 // total number of losses (initially set to 0)
var displayWord;                // selects the HTML element associated with '.displayWord' CSS selector
var guessedLetter =[];          // array containing the incorrect letters already guessed by user
var wordProgress = [];          // array containing "_" for the letters left to be guessed by user and the correctly guessed letters by user
var guessLeft = 12;             // how many guesses the user has left (default = 12)
var modeGuessLeft = 12;         // keeps track of starting number of guesses depending on level of difficulty selected by user (default = 12 corresponding with easyList)
var word;                       // word from wordList that needs to be guessed 
var wordList = easyList;        // wordList either easy, medium, or hard
// var currentList;             // keeps track of List selected
var key;                        // keeps track of key pressed
var noKey;                      // if noKey = true then the incorrect letter was not previously guessed by user, 
var proceed;
var gameEnd;
             



//Chooses the easy, medium, or hard difficulty word lists
function easyBtn(){
    wordList = easyList;
    // currentList = easyList;
    guessLeft = 12;
    modeGuessLeft = guessLeft;
    startGame();

}

function medBtn() {
    // wordList = medList;
    // currentList = medList;
    guessLeft = 10;
    modeGuessLeft = guessLeft;
    startGame();
}

function hardBtn() {
    // wordList = hardList;
    // currentList = hardList;
    guessLeft = 8;
    modeGuessLeft = guessLeft;
    startGame();
}

// Starts the game by choosing a new word from list, 
// sets the guessedLetter array (incorrect letter guesses by user) as empty,
// creates an wordProgress array that has as many "_" as there are characters in the word 
function startGame() {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetter =[];
    wordProgress = [];


    displayWord = document.querySelector('.displayWord');

    // creates a wordProgress array that has as many "_" as there are characters in the word 
    for (var i = 0; i <word.length; i++){

        if(word[i] == " "){
            wordProgress.push(" ");

        }else{
            wordProgress.push("_");

        }        
    }

    displayWord.innerHTML = wordProgress.join("");

    document.querySelector('.guessLeft').innerText = guessLeft;
    document.querySelector('.guessedLetter').innerText = guessedLetter;
    document.querySelector('.result').innerHTML ="";

    document.onkeyup = keyPress;
}

// function that determines whether the user can keep playing, user has one, or user has lost
function keyPress(event){
    gameEnd = false;

    if (gameEnd == false){
        // user can continue playing if guessLeft (the amount of guesses left is > 0 and if there are no "_" (characters) left to solve in word)
        if (guessLeft > 0 && wordProgress.indexOf('_') > -1){
            if(event.which >= 65 && event.which <= 90){
                key = event.key.toUpperCase();
                guessCorrect();
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
        if (guessedLetter[x] == key || wordProgress[x] == key ){
            proceed = false;
        }
    }

    if(proceed == true){
        // updates the wordProgress array if the key pressed by the user is the same as a letter in the array
        for (var i = 0; i < word.length; i++){
            if (word[i] == key){
                wordProgress[i] = word[i];
                displayWord.innerHTML = wordProgress.join("");
                noKey = false;

                if(wordProgress.indexOf('_') == -1){
                    document.querySelector('.result').innerHTML = "<p style='letter-spacing: 0px; font-size: 2vw; color: green;'>You Win!, click a level or press a key to play again<p>";
                    wins++;
                    document.querySelector('.wins').innerHTML = wins;
                    guessLeft = modeGuessLeft;
                    gameEnd = true;
                    document.onkeyup = startGame;
                }
                else{
                    document.onkeyup = keyPress;
                }   
            }
        }
        
        // updates the guessedLetter array if the key pressed is not in the guessedLetter array already and is not a character of the word
        if(noKey == true){

            guessedLetter.push(key);
            document.querySelector('.guessedLetter').innerText = guessedLetter;
            guessLeft--;
            document.querySelector('.guessLeft').innerText = guessLeft;
            
            
            if (guessLeft == 0){
                document.querySelector('.result').innerHTML = "<p style='letter-spacing: 0px; font-size: 2vw; color: green;'>You Lose!, click a level or press a key to play again<p>";
                losses++;
                document.querySelector('.losses').innerHTML = losses;
                guessLeft = modeGuessLeft;
                gameEnd = true;
                document.onkeyup = startGame;
            }
            else{
                document.onkeyup = keyPress;
            } 
        }
    }
}




