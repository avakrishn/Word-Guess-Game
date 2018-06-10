
// Word Lists (default = easyList)
var easyList =['DENMARK', 'FINLAND', 'FRANCE', 'GERMANY', 'GREECE', 'HUNGARY', 'IRELAND', 'ITALY', 'SPAIN', 'GREENLAND', 'SWITZERLAND', 'SWEDEN', 'SCOTLAND', 'UNITED KINGDOM'];
// var easyImage =['assets/images/flags/denmark.png', 'assets/images/flags/finland.png'];
// ['ITALY', 'IRELAND','UNITED KINGDOM', 'SPAIN', 'PORTUGAL', 'GERMANY', 'AUSTRIA', 'BELGIUM', 'CZECH REPUBLIC', 'FRANCE'];
var medList =['AUSTRIA', 'BELGIUM', 'BULGARIA' , 'CROATIA' ,'CZECH REPUBLIC', 'NETHERLANDS', 'NORWAY', 'POLAND', 'PORTUGAL','ROMANIA']; 
var hardList =['ALBANIA', 'BELARUS', 'BASQUE', 'CATALONIA', 'CYPRUS', 'VATICAN CITY', 'ESTONIA','LIECHTENSTEIN','LITHUANIA', 'LUXEMBOURG', 'MACEDONIA', 'MONTENEGRO'];

var medImage =[];
var hardImage =[];
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
var index;
var image;
var wordList = easyList;        // wordList based on default or button pressed: either easy, medium, or hard
var imageList = easyImage;
var letter;                     // keeps track of the user letter pressed
var incorrectKey;               // if incorrectKey = true then updates the guessedLetter array if the key pressed is an incorrect letter
var proceed;                    // if proceed = true then the letter is not in the guessedLetter array or in the wordProgress array
             



//Chooses the easy, medium, or hard difficulty word lists based on button pressed
function easyBtn(){
    wordList = easyList;
    // imageList = easyImage;
    guessLeft = 12;
    modeGuessLeft = guessLeft;
    startGame();

}

function medBtn() {
    wordList = medList;
    // imageList = medImage;
    guessLeft = 11;
    modeGuessLeft = guessLeft;
    startGame();
}

function hardBtn() {
    wordList = hardList;
    // imageList = hardImage;
    guessLeft = 10;
    modeGuessLeft = guessLeft;
    startGame();
}

// Starts the game by choosing a new word from wordList, 
// sets the guessedLetter array (incorrect letter guesses by user) as empty,
// creates a wordProgress array that has as many "_" as there are characters in the word 
function startGame() {
    index = Math.floor(Math.random() * wordList.length)
    word = wordList[index];
    // image = imageList[index];
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
    document.querySelector('.winOutcome').innerHTML ="";
    document.querySelector('.loseOutcome').innerHTML ="";
    document.getElementById('globe').src= "assets/images/antique.jpg";

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

    // if the user hits incorrect letter or a correct letter that they have already picked, the guessedLetter array and the guessLeft number are unchanged.
    if(guessedLetter.indexOf(letter) > -1 || wordProgress.indexOf(letter) > -1 ){
        proceed = false;
    }

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
                    document.querySelector('.winOutcome').innerHTML = "<p>You Win!</p> <p>Click a level or press a letter to play again</p>";
                    wins++;
                    document.querySelector('.wins').innerHTML = wins;
                    guessLeft = modeGuessLeft;
                    // document.getElementById('globe').src= image;
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
                document.querySelector('.loseOutcome').innerHTML = "<p>You Lose!</p> <p>Click a level or press a letter to play again</p>";
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




