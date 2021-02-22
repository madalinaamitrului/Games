let boxes = Array.from(document.getElementsByClassName("box"));
let spaces = [null, null, null, null, null, null, null, null, null];
const bigzero = "0";
const bigx = "X"

let currentPlayer = bigx;
let drawLines = () => {
    boxes.forEach((box, i) => {
        let boxstyle = '';
        if (i < 3) {
            boxstyle += 'border-bottom: 3px solid black;';
        }
        if (i % 3 == 0) {
            boxstyle += 'border-right: 3px solid black;';
        }
        if (i % 3 == 2) {
            boxstyle += 'border-left: 3px solid black;';
        }
        if (i > 5) {
            boxstyle += 'border-top: 3px solid black;';
        }
        box.style = boxstyle;
        box.addEventListener('click', boxClicked);
    });
};

const boxClicked = (event) => {
    const id = event.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        event.target.innerText = currentPlayer;
        if (playerWon()) {
            return $("#winnerText").text(`${currentPlayer} it's the winner`);
        }
        if (currentPlayer == bigx) {
            currentPlayer = bigzero;
        } else { currentPlayer = bigx; }
    }
}
function playerWon() {
    if (spaces[0] == currentPlayer && spaces[1] == currentPlayer && spaces[2] == currentPlayer) {
        return currentPlayer;
    } else if (spaces[0] == currentPlayer && spaces[3] == currentPlayer && spaces[6] == currentPlayer) {
        return currentPlayer;
    } else if (spaces[0] == currentPlayer && spaces[4] == currentPlayer && spaces[8] == currentPlayer) {
        return currentPlayer;
    } else if (spaces[8] == currentPlayer && spaces[7] == currentPlayer && spaces[6] == currentPlayer) {
        return currentPlayer;
    } else if (spaces[8] == currentPlayer && spaces[5] == currentPlayer && spaces[2] == currentPlayer) {
        return currentPlayer;
    } else if (spaces[2] == currentPlayer && spaces[4] == currentPlayer && spaces[6] == currentPlayer) {
        return currentPlayer;
    } else if (spaces[3] == currentPlayer && spaces[4] == currentPlayer && spaces[5] == currentPlayer) {
        return currentPlayer;
    } else if (spaces[1] == currentPlayer && spaces[4] == currentPlayer && spaces[7] == currentPlayer) {
        return currentPlayer;
    }
}
drawLines();
function restart() {
    location.reload();
}


