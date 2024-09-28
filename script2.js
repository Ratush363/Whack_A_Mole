let currMoleTile;
let currMonsterTile;
let hit_val = 0;
let gameOver = false;
let moleInterval;
let monsterInterval;
let timerInterval;
let timeLeft = 60;

window.onload = function () {
    setGame();
}

function setGame() {
    for (let i = 0; i < 30; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    moleInterval = setInterval(setMole, 800);
    monsterInterval = setInterval(setMonster, 1500);
    timerInterval = setInterval(updateTimer, 1000); 
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 30);
    return num.toString();
}

function setMole() {
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./Images/mole.png";
    mole.className = "mole";
    mole.dataset.hit = "false";
    let num = getRandomTile();
    while (currMonsterTile && num === currMonsterTile.id) {
        num = getRandomTile(); 
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setMonster() {
    if (currMonsterTile) {
        currMonsterTile.innerHTML = "";
    }
    let monster = document.createElement("img");
    monster.src = "./Images/zombie.png";
    let num = getRandomTile();
    while (currMoleTile && num === currMoleTile.id) {
        num = getRandomTile();
    }
    currMonsterTile = document.getElementById(num);
    currMonsterTile.appendChild(monster);
}

function selectTile() {
    if (gameOver) return;
    if (this == currMoleTile) {
        const moleImage = this.querySelector('img');
        if (moleImage && moleImage.dataset.hit === "false") {
            hit_val += 10;
            document.getElementById("hit_val").innerText = hit_val.toString();
            moleImage.dataset.hit = "true";
            moleImage.src = "./Images/whack_mole.png";
        }
    } else if (this == currMonsterTile) {
        endGame();
    }
}

function updateTimer() {
    if (gameOver) return;
    timeLeft--;
    document.getElementById("time_val").innerText = timeLeft.toString();
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    clearInterval(moleInterval);
    clearInterval(monsterInterval);
    clearInterval(timerInterval);

    const gameOverPopup = document.createElement('div');
    gameOverPopup.setAttribute('id', 'gameOverPopup');

    const message = document.createElement('h1');
    message.textContent = 'Game Over';
    gameOverPopup.appendChild(message);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.onclick = restart;
    gameOverPopup.appendChild(restartButton);

    document.body.appendChild(gameOverPopup);
}

function restart() {
    location.reload();
}
