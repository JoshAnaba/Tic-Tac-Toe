
  
const statusDisplay = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's Player ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleBtnClicked(clickedBtn, clickedBtnIndex) {
    gameState[clickedBtnIndex] = currentPlayer;
    clickedBtn.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        var aud = document.getElementById('myAudio');
        aud.play();
        if(winningMessage()===`Player X has won!`){
            document.getElementById('playerX').value++;
        }
        else document.getElementById('playerO').value++;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleBtnClick(clickedBtnEvent) {
    const clickedBtn= clickedBtnEvent.target;
    const clickedBtnIndex = parseInt(clickedBtn.getAttribute('data-btn-index'));

    if (gameState[clickedBtnIndex] !== "" || !gameActive) {
        return;
    }

    handleBtnClicked(clickedBtn, clickedBtnIndex);
    handleResultValidation();
}

function handleContinueGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.btn').forEach(btn => btn.innerHTML = "");
    var aud = document.getElementById('myAudio');
    aud.play();
    aud.load();
    aud.pause()
}


function handleRestartGame(){
    let sure = window.confirm('Are you sure you want to refresh this game?!')
    if(sure==true){
        gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.btn').forEach(btn => btn.innerHTML = "");
    document.getElementById('playerX').value = 0;
    document.getElementById('playerO').value = 0;
    }
    var aud = document.getElementById('myAudio');
    aud.play();
    aud.load();
    aud.pause()
}

document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', handleBtnClick));
document.querySelector('.game-continue').addEventListener('click', handleContinueGame);
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);


