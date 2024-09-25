let currMoleTile;
let currMonsterTile;
let hit_val = 0;
let gameOver = false;
let moleInterval;
let monsterInterval;

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
    moleInterval=setInterval(setMole, 2000);
    monsterInterval=setInterval(setMonster, 3000);
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
    if(gameOver) return;
    if (this == currMoleTile) {
        const moleImage = this.querySelector('img');
        if (moleImage && moleImage.dataset.hit === "false") {
            hit_val += 10;
            document.getElementById("hit_val").innerText = hit_val.toString();
            moleImage.dataset.hit = "true";
            moleImage.src = "./Images/whack_mole.png";
        }
    }
    else if (this == currMonsterTile) {
        gameOver=true;
        clearInterval(moleInterval);
        clearInterval(monsterInterval);
        const gameOverPopup = document.createElement('div');
        gameOverPopup.setAttribute('id', 'gameOverPopup');
        gameOverPopup.style.position = 'fixed';
        gameOverPopup.style.top = '50%';
        gameOverPopup.style.left = '50%';
        gameOverPopup.style.transform = 'translate(-50%, -50%)';
        gameOverPopup.style.padding = '20px';
        gameOverPopup.style.backgroundColor = '#333';
        gameOverPopup.style.color = 'white';
        gameOverPopup.style.textAlign = 'center';
        gameOverPopup.style.borderRadius = '10px';
        gameOverPopup.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';

        // Add the "Game Over" text
        const message = document.createElement('h1');
        message.textContent = 'Game Over';
        gameOverPopup.appendChild(message);

        // Add the restart button
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart';
        restartButton.style.marginTop = '10px';
        restartButton.style.padding = '10px 20px';
        restartButton.style.fontSize = '16px';
        restartButton.style.cursor = 'pointer';
        restartButton.onclick = restart; // Attach restart function
        gameOverPopup.appendChild(restartButton);

        // Add the popup to the body
        document.body.appendChild(gameOverPopup);
    }

    // Function to restart the game
    function restart() {
        // Reload the page (or reset game state if you have specific variables)
        location.reload();
    }
}

