//your JS code here. If required.
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const submit = document.getElementById("submit");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let players = [];
let currentPlayer = 0;
let gameOver = false;

const winningCombinations = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"]
];

submit.addEventListener("click", function () {
    const name1 = document.getElementById("player-1").value.trim();
    const name2 = document.getElementById("player-2").value.trim();

    if (!name1 || !name2) {
        alert("Please enter both player names.");
        return;
    }

    players = [
        { name: name1, symbol: "x" },
        { name: name2, symbol: "o" }
    ];

    setup.classList.add("hidden");
    game.classList.remove("hidden");

    message.textContent = `${players[0].name}, you're up`;
});

cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        if (gameOver || cell.textContent !== "") {
            return;
        }

        const player = players[currentPlayer];

        cell.textContent = player.symbol;

        // Check whether the current player has won.
        const won = winningCombinations.some(function (combination) {
            return combination.every(function (id) {
                return document.getElementById(id).textContent
                    === player.symbol;
            });
        });

        if (won) {
            message.textContent =
                `${player.name} congratulations you won!`;

            gameOver = true;
            return;
        }

        // Check for a draw.
        const allFilled = [...cells].every(function (cell) {
            return cell.textContent !== "";
        });

        if (allFilled) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        // Switch to the other player.
        currentPlayer = 1 - currentPlayer;

        message.textContent =
            `${players[currentPlayer].name}, you're up`;
    });
});