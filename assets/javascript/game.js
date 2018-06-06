
// Word Lists
var easyList =['Italy', 'Ireland','United Kingdom', 'Spain', 'Portugal', 'Italy', 'Germany', 'Austria', 'Belgium', 'Czech Republic', 'France'];

var wins;
var losses;
var displayWord;
var guessAlready =[];
var guessLeft = 12;
var wordSelected;
var wordList = easyList;
var letters;
var guessedWord = [];


//Chooses the easy, medium, or hard difficulty word lists
function easyBtn(){
    wordList = easyList;
}

function medBtn() {
    wordList = medList;
}

function hardBtn() {
    wordList = hardList;
}

// Starts the game by choosing a new word from list
function startGame() {
    wordSelected = wordList[Math.floor(Math.random() * wordList.length)];

    displayWord = document.querySelector('.displayWord');

    for (var i = 0; i <wordSelected.length; i++){
        // guessedWord.push("_");
        // currentWord.innerText = guessedWord; 
        if(wordSelected[i] == " "){
    
            displayWord.innerHTML += "&nbsp;"
        }else{
            displayWord.innerHTML += " _ "
        }
        
    }

    document.querySelector('.guessLeft').innerText = guessLeft;

    document.onkeyup = keyLetter;
}

function keyLetter(event){
    var key = event.key
    for(var i =0; i < wordSelected.length; i++){
        if(wordSelected[i] == key){

        }
    }

}

    

function keyGuess(event){
    var key = event.key;
}


