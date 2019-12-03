let buttons = [];
let answerArr = [];
let life = 7;
let score = 0;
let stop = false;
let wordbank = ['ERROR', 'ORDER', 'TEMPER', 'PLAY', 'SISTER', 'NUMBER', 'JUGGLE', 'SHUT', 'ONEROUS', 'HANDSOME', 'JOIN', 'TAX', 'GUIDE', 'CABBAGE', 'DRIVING', 'DISLIKE', 'CAST', 'NOISELESS', 'DRUNK', 'TEST', 'BLOOD', 'SPIDERS', 'YARN', 'CRACKER', 'SLEEPY', 'PLANT', 'JUICE', 'STROKE', 'UNUSUAL', 'CLIP', 'BEE', 'DRAG', 'PURPLE', 'DEPRESSED', 'INTEND', 'CONNECT', 'FLAG', 'TYPICAL', 'BRIGHT', 'WHEEL', 'RIVER', 'PRINT', 'BREEZY', 'LETTER', 'SILENT', 'BITTER', 'INTERRUPT', 'REPLACE', 'PRICE', 'PROGRAM'];
let word = generateWord(wordbank);

startGame();

document.getElementById('restart').onclick = restartGame;

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


function startGame() {
    createButtons();
    generateUnderlines(word);
    printGame();
}

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

function createButtons() {
    for (let i = 0; i < 26; i++) {
        buttons.push(new Button(i));
    }
}

function generateUnderlines(word) {
    let letters = word.length;
    for (let i = 0; i < word.length; i++) {
        answerArr[i] = '_';
    }
}

function gameOver(winOrlose) {
    if (winOrlose == 'w') {
        document.getElementById('gameOver').innerHTML = "YOU WON!";
    } else {
        document.getElementById('gameOver').innerHTML = "GAME OVER!" + "\nCorrect Word is " + word;
    }
    word = generateWord(wordbank);
    generateUnderlines(word);
    life = 7;
    stop = true;
}

function printGame() {
    document.getElementById("line").innerHTML = answerArr.join(' ');
    document.getElementById("life").innerHTML = "Current Life: " + life;
    document.getElementById('score').innerHTML = "Score: " + score;
}

function generateWord(wordList) {
    randomNum = parseInt(Math.random() * 50);
    return wordList[randomNum];
}