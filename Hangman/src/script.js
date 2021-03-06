let buttons = [];
let answerArr = [];
let life = 7;
let score = 0;
let stop = false;
let wordbank = ['ERROR', 'ORDER', 'TEMPER', 'PLAY', 'SISTER', 'NUMBER', 'JUGGLE', 'SHUT', 'ONEROUS', 'HANDSOME', 'JOIN', 'TAX', 'GUIDE', 'CABBAGE', 'DRIVING', 'DISLIKE', 'CAST', 'NOISELESS', 'DRUNK', 'TEST', 'BLOOD', 'SPIDERS', 'YARN', 'CRACKER', 'SLEEPY', 'PLANT', 'JUICE', 'STROKE', 'UNUSUAL', 'CLIP', 'BEE', 'DRAG', 'PURPLE', 'DEPRESSED', 'INTEND', 'CONNECT', 'FLAG', 'TYPICAL', 'BRIGHT', 'WHEEL', 'RIVER', 'PRINT', 'BREEZY', 'LETTER', 'SILENT', 'BITTER', 'INTERRUPT', 'REPLACE', 'PRICE', 'PROGRAM'];
let word = generateWord(wordbank);

// Starts the game at the beginning
startGame();

// Restart button
document.getElementById('restart').onclick = restartGame;

// Restarts the game, reset everything
function restartGame() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].reEnable();
    }
    answerArr = [];
    life = 7;
    score = 0;
    stop = false;
    document.getElementById("gameOver").innerHTML = '';
    word = generateWord(wordbank);
    generateUnderlines(word);
    printGame();
}

// Starting game function
function startGame() {
    createButtons();
    generateUnderlines(word);
    printGame();
}

// Button object for letters
function Button(id) {
    this.id = id;
    this.btn = document.createElement("button");
    this.btn.innerHTML = "<font size='5'>" + String.fromCharCode(id + 65) + "</font>";
    this.btn.style.position = "static";
    this.reEnable = function () {
        this.btn.disabled = false;
    }
    this.btn.onclick = function () {
        checkWord(id);
        this.disabled = true;
    };
    document.getElementById("buttonsDiv").appendChild(this.btn);
}

// Check if the clicked button is in the generated word
function checkWord(i) {
    if (!stop) {
        let guessed = false;
        let win = true;
        for (let j = 0; j < word.length; j++) {
            if (word[j] == String.fromCharCode(buttons[i].id + 65)) {
                guessed = true;
                if (answerArr[j] == '_') {
                    score++;
                }
                answerArr[j] = word[j];
                printGame();
            }
        }
        for (let j = 0; j < answerArr.length; j++) {
            if (answerArr[j] == '_') {
                win = false;
                break;
            }
        }
        if (!guessed) {
            score--;
            life--;
        }
        document.getElementById('life').innerHTML = "Current Life: " + life;
        document.getElementById('score').innerHTML = "Score: " + score;
        if (win) {
            gameOver('w');
        }
        if (life == 0) {
            gameOver();
        }
    }
}

// Create an array of buttons
function createButtons() {
    for (let i = 0; i < 26; i++) {
        buttons.push(new Button(i));
    }
}

// Set the answer to bunch of underlines
function generateUnderlines(word) {
    let letters = word.length;
    for (let i = 0; i < word.length; i++) {
        answerArr[i] = '_';
    }
}

// Game over function, display messages and generate a new word
function gameOver(winOrlose) {
    if (winOrlose == 'w') {
        document.getElementById('gameOver').innerHTML = "YOU WON!";
    } else {
        document.getElementById('gameOver').innerHTML = "GAME OVER!" + "\nCorrect Word is " + word;
    }
    word = generateWord(wordbank);
    generateUnderlines(word);
    stop = true;
}

// Print the word and life and score
function printGame() {
    document.getElementById("line").innerHTML = answerArr.join(' ');
    document.getElementById("life").innerHTML = "Current Life: " + life;
    document.getElementById('score').innerHTML = "Score: " + score;
}

// Randomly select a word from an array of words
function generateWord(wordList) {
    randomNum = parseInt(Math.random() * 50);
    return wordList[randomNum];
}