 const wordContainer = document.getElementById('letter-area');
 const usedLettersElement = document.getElementById('used-letters');
 const message = document.getElementById('message');
//MENU FUNCTION
function showst()
{
    document.getElementById("addword-menu").style.display = "block";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("footer").style.display = "none";
}

function hidest()
{
    document.getElementById("addword-menu").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("footer").style.display = "grid";
}

function showmn()
{
    document.getElementById("game-dashboard").style.display = "block";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("footer").style.display = "none";
}

function hidemn()
{
    document.getElementById("game-dashboard").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("footer").style.display = "grid";
}

function hideaddword() {
    document.getElementById("addword-menu").style.display = "none";
    document.getElementById("game-dashboard").style.display = "block";
}


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [10,3,3,3],//head
    [11,6,1,5],//core
    [9,7,2,1],//leftarm
    [12,7,2,1],//rightarm
    [10,10,1,3],//leftleg
    [12,10,1,3]//righleg
];


//GAME CODE
let words = ["IGUANA", "PINTAR", "ANILLO", "CHISME", "CARLOS", "COCO"];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const startGame = () => {
    usedLetters = [''];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLetters.innerHTML = '';
    usedLettersElement.innerHTML = '';
    message.innerHTML = '';
    drawHangMan();
    selectedrandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

const addNewWord = newword => {
    newword = document.getElementById('add-word').value;
    words.push(newword);
    console.log(newword);
}

const drawHangMan = () => {
    ctx.canvas.width = 400;
    ctx.canvas.height = 380;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#D95D39';
    ctx.fillRect(0, 18 , 15, 1);
    ctx.fillRect(1, 1 , 1, 17);
    ctx.fillRect(2, 1 , 10, 1);
    ctx.fillRect(11, 2 , 1, 1);
};

const selectedrandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const correctLetter = letter => {
    const { children } = wordContainer;

    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) {
        endgame();
        message.innerHTML = 'GANASTE';
    }
};

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter;
    usedLettersElement.appendChild(letterElement);
}

const letterInput = letter => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    }
    else
    {
        wrongLetter();
    }

    addLetter(letter);
    usedLetters.push(letter);

};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();

    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(...bodyPart);
        
}

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length)
    {
        endgame(); 
        message.innerHTML = 'PERDISTE';
    }
    
};


const endgame = () => {
    document.removeEventListener('keydown', letterEvent);

    
};


//-------------------====== EVENTS CALLS =====---------------------
//----------------------==================---------------------------
    const addwordBtn = document.getElementById("addword-btn");

    addwordBtn.addEventListener("click", showst);

//-----------------------=========================-----------------
    const cancelBtn = document.getElementById("cancel-btn");

    cancelBtn.addEventListener("click", hidest);
//---------------------------========================-------------- 
    const startgameBtn = document.getElementById("start-btn");

    startgameBtn.addEventListener("click", () => {
        startGame();
        showmn();
    });

//---------------------------========================-------------- 
    const exitgameBtn = document.getElementById("exit-btn");

    exitgameBtn.addEventListener("click", hidemn);

//----------------------
    const newgameBtn = document.getElementById("new-game");

    newgameBtn.addEventListener('click', startGame);

    const newWordBtn = document.getElementById('save-btn');

    newWordBtn.addEventListener('click', () => {
        addNewWord();
        hideaddword();
        startGame();
    });


//dibujar tablero

