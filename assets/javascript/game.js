
// Word Lists (default = easyList)
var easyList =['ITALY', 'IRELAND','UNITED KINGDOM', 'SPAIN', 'PORTUGAL', 'GERMANY', 'AUSTRIA', 'BELGIUM', 'CZECH REPUBLIC', 'FRANCE'];

// var easyPic =

//Global variables
var wins = 0;                   // total number of wins (initially set to 0)
var losses = 0;                 // total number of losses (initially set to 0)
var displayWord;                // selects the HTML element associated with '.displayWord' CSS selector
var guessedLetter =[];          // array containing the incorrect letters already guessed by user
var wordProgress = [];          // array containing "_" for the letters left to be guessed by user and the correctly guessed letters by user
var guessLeft = 12;             // how many guesses the user has left (initial default = 12)
var modeGuessLeft = 12;         // the starting number of guesses depending on level of difficulty selected by user (initial default = 12 corresponding with easyList)
var word;                       // word from wordList that needs to be guessed by user
var wordList = easyList;        // wordList based on default or button pressed: either easy, medium, or hard
var letter;                     // keeps track of the user letter pressed
var incorrectKey;               // if incorrectKey = true then updates the guessedLetter array if the key pressed is an incorrect letter
var proceed;                    // if proceed = true then the letter is not in the guessedLetter array or in the wordProgress array
             



//Chooses the easy, medium, or hard difficulty word lists based on button pressed
function easyBtn(){
    wordList = easyList;
    guessLeft = 12;
    modeGuessLeft = guessLeft;
    startGame();

}

function medBtn() {
    // wordList = medList;
    guessLeft = 10;
    modeGuessLeft = guessLeft;
    startGame();
}

function hardBtn() {
    // wordList = hardList;
    guessLeft = 8;
    modeGuessLeft = guessLeft;
    startGame();
}

// Starts the game by choosing a new word from wordList, 
// sets the guessedLetter array (incorrect letter guesses by user) as empty,
// creates a wordProgress array that has as many "_" as there are characters in the word 
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

    // displays the wordProgress array in the selected HTML element using CSS selector '.displayWord'
    // .join("") method displays the array without ',' that are used to separate each element in the array
    displayWord.innerHTML = wordProgress.join("");

    document.querySelector('.guessLeft').innerText = guessLeft;
    document.querySelector('.guessedLetter').innerText = guessedLetter;
    document.querySelector('.result').innerHTML ="";

    document.onkeyup = keyPress;
}

// user can continue playing if guessLeft (the amount of guesses left is > 0 and if there are no "_" (characters) left to solve in word)
// stores string of letter key pressed in variable
function keyPress(event){
    if (guessLeft > 0 && wordProgress.indexOf('_') > -1){
        if(event.which >= 65 && event.which <= 90){
            letter = event.key.toUpperCase();
            checkIfGuessCorrect();
        }  
    } 

}

// function that determines if the user's guess is a correct letter in the word
function checkIfGuessCorrect(){
    incorrectKey = true;
    proceed = true;

    if(guessedLetter.indexOf(letter) > -1 || wordProgress.indexOf(letter) > -1 ){
        proceed = false;
    }

    // if the user hits a incorrect letter key that they already picked, the guessedLetter array and the guessLeft number is unchanged
    // for (var x = 0; x < guessedLetter.length; x++){
    //     if (guessedLetter[x] == letter){
    //         proceed = false;
    //     }
    // }

    // if the user hits a correct letter key that they already picked, the guessLeft number is unchanged
    // for (var x = 0; x < wordProgress.length; x++){
    //     if (wordProgress[x] == letter ){
    //         proceed = false;
    //     }
    // }


    // only executed if the letter is not in the guessedLetter array or in the wordProgress array
    if(proceed == true){
        // updates the wordProgress array if the letter pressed by the user is the same as a letter in the word
        for (var i = 0; i < word.length; i++){
            if (word[i] == letter){
                wordProgress[i] = word[i];
                displayWord.innerHTML = wordProgress.join("");
                incorrectKey = false;

                // if the user has completely guessed the word then user wins
                if(wordProgress.indexOf('_') == -1){
                    document.querySelector('.result').innerHTML = "<p style='letter-spacing: 0px; font-size: 30px; color: green;'>You Win!<p> <p style='letter-spacing: 0px; font-size: 30px;'color:black;'>Click a level or press a letter to play again<p>";
                    wins++;
                    document.querySelector('.wins').innerHTML = wins;
                    guessLeft = modeGuessLeft;
                    document.onkeyup = startGame;
                }else{
                    document.onkeyup = keyPress;
                }   
            }
        }
        
        // updates the guessedLetter array if the letter pressed is an incorrect letter
        if(incorrectKey == true){

            guessedLetter.push(letter);
            document.querySelector('.guessedLetter').innerText = guessedLetter;
            guessLeft--;
            document.querySelector('.guessLeft').innerText = guessLeft;
            
            // if the number of guesses left (guessLeft) is 0 then user loses
            if (guessLeft == 0){
                document.querySelector('.result').innerHTML = "<p style='letter-spacing: 0px; font-size: 20px; color: green;'>You Lose! Click a level or press a letter to play again<p>";
                losses++;
                document.querySelector('.losses').innerHTML = losses;
                guessLeft = modeGuessLeft;
                document.onkeyup = startGame;
            }else{
                document.onkeyup = keyPress;
            } 
        }
    }
}




