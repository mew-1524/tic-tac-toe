const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetBtn = document.querySelector(".reset");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// ---------- CELL CLICK ----------
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();
        switchPlayer();
    });
});

// ---------- SWITCH PLAYER ----------
function switchPlayer() {
    if (!gameActive) return;
    currentPlayer = currentPlayer === "X" ? "Y" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// ---------- CHECK WIN ----------
function checkWinner() {
    for (let pattern of winConditions) {
        const [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} Wins! 🎉`;
            gameActive = false;

            document.querySelectorAll(".cell")[a].classList.add("winner");
            document.querySelectorAll(".cell")[b].classList.add("winner");
            document.querySelectorAll(".cell")[c].classList.add("winner");

            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw 😐";
        gameActive = false;
    }
}

// ---------- RESET GAME ----------
resetBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
});
