let buttons = [];
let answerArr = [];
let life = 7;
let stop = false;
let wordbank = ['LEARNED', 'SENSE', 'SLIM', 'UTTER', 'LOCK', 'NOTICE', 'ZONKED', 'AWAKE', 'FRETFUL', 'CAUSE', 'COVER', 'POOR', 'PERMIT', 'DANGEROUS', 'FURRY', 'PICKLE', 'ERROR', 'ORDER', 'DAM', 'TEMPER', 'PLAY', 'SISTER', 'NUMBER', 'COMFORTABLE', 'ANTS', 'ARROGANT', 'EXCITE', 'AMUSING', 'BACK', 'RIPE', 'SUGGESTION', 'SEPARATE', 'INFLUENCE', 'STEADY', 'AVERAGE', 'ORANGES', 'LONGING', 'CRIME', 'NORTH', 'RUDDY', 'SPARK', 'INCONCLUSIVE', 'VICTORIOUS', 'JUGGLE', 'SHUT', 'ONEROUS', 'HANDSOME', 'JOIN', 'TAX', 'GUIDE', 'CABBAGE', 'DRIVING', 'DISLIKE', 'CAST', 'NOISELESS', 'DRUNK', 'VULGAR', 'TEST', 'BLOOD', 'SPIDERS', 'YARN', 'CRACKER', 'SLEEPY', 'HUM', 'PLANT', 'SLOW', 'JUICE', 'STROKE', 'UNUSUAL', 'COMPETITION', 'CLIP', 'BEE', 'DRAG', 'PURPLE', 'DEPRESSED', 'INTEND', 'CONNECT', 'FLAG', 'TYPICAL', 'MATERIALISTIC', 'GROTESQUE', 'BRIGHT', 'WHEEL', 'SNOTTY', 'RIVER', 'PRINT', 'BREEZY', 'INVENTION', 'EXUBERANT', 'LETTER', 'SILENT', 'EXCLUSIVE', 'BEFITTING', 'BOARD', 'BITTER', 'INTERRUPT', 'DEAFENING', 'REPLACE', 'PRICE', 'PROGRAM'];
let word = generateWord(wordbank);

startGame();

document.getElementById('restart').onclick = restartGame;

function restartGame() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].reEnable();
    }
    answerArr = [];
    life = 7;
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
    this.btn.style.width = "50px";
    this.btn.style.height = "50px";
    this.btn.style.margin = "10px";
    this.btn.style.borderRadius = "12px";
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
                    life++;
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
            life--;
        }
        document.getElementById('life').innerHTML = "Current Life: " + life;
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
}

function generateWord(wordList) {
    randomNum = parseInt(Math.random() * 100);
    return wordList[randomNum];
}