const gameController = (function() {
    let whosTurn = true;

    function startGame() {
        let player = getCurrent().player;
        display.updateAnnouncementText(`${player}'s turn`)
        display.allowClicksToggle();
    }

    function takeTurn(cell, cellNum) {
        let player = getCurrent().player;
        let marker = getCurrent().marker;

        display.addMarker(cell, marker);
        gameBoard.updateBoard(cellNum, marker);
        stats.gameStats.turns++
        whosTurn = !whosTurn;
        const result = gameBoard.checkWinner();
        if (result.winner === null) {
            display.updateAnnouncementText(`${player}'s turn`);
        } else {
            display.allowClicksToggle()
            display.updateAnnouncementText(`${result.winner} wins!`)
            display.highlightWin(result.combo);
        }

        if (stats.gameStats.turns === 9) {
            display.allowClicksToggle()
            display.updateAnnouncementText(`It's a draw!`)
        }
    }

    function getCurrent() {
        const current = whosTurn 
            ? { player: "Player 1", marker: "X" }
            : { player: "Player 2", marker: "O" }
        
        return current
    }

    return {
        startGame,
        whosTurn,
        takeTurn,
    }
})()

const gameBoard = (function() {
    let boardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8",]

    function updateBoard(index, marker) {
        boardArr[index] = marker;
        return boardArr;
    }

    function resetGameBoard() {
        boardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8",]
    }

    function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let combo of winningCombos) {
        const [a, b, c] = combo

        if (boardArr[a] === "X" && boardArr[b] === "X" && boardArr[c] === "X") {
            return { winner: "Player 1", combo: combo }
        }

        if (boardArr[a] === "O" && boardArr[b] === "O" && boardArr[c] === "O") {
            return { winner: "Player 2", combo: combo };
        }
    }

    return {winner: null, combo: null}
}

  // your checking logic here

  return {
    updateBoard,
    resetGameBoard,
    checkWinner,
  }
})()

const stats = (function() {

    const gameStats = {
        score: {
            p1: 0,
            p2: 0,
        },
        turns: 0,
    }

    return {
        gameStats,
    }
})()

const display = (function() {

    const board = document.querySelector(".game-board")
    let allowClicks = false;

    function eventListeners() {

        //show Instructions
        const instructionsButton = document.querySelector(".show-instructions");
        const modal = document.querySelector(".modal");
        const closeModalButton = document.querySelector(".close-modal");

        instructionsButton.addEventListener("click", () => {
            modal.showModal();
        } )
        closeModalButton.addEventListener("click", () => {
            modal.close();
        })

        //Start the game
        const startGameButton = document.querySelector(".start-game")
        startGameButton.addEventListener("click", () => {
            startGameButton.hidden = true;
            displayAnnouncements();
            gameController.startGame();
        })

        //Listen for player choice
        const cells = document.querySelectorAll(".cell");
        for (const cell of cells) {
            cell.addEventListener("click", (e) => {
                gameController.takeTurn(e.target, e.target.dataset.index)
            });
        }
    }

    function allowClicksToggle() {
        allowClicks = !allowClicks;
        board.style.pointerEvents = allowClicks ? "all" : "none";
    }

    //Creates a div for announcements to be displayed
    function displayAnnouncements() {
        const header = document.querySelector(".header");
        const announcement = document.createElement("h2")
        announcement.classList.add("announcement");
        header.appendChild(announcement)
    }

    function updateAnnouncementText (string) {
        let announcement = document.querySelector(".announcement")
        announcement.textContent = string;
    }

    function addMarker(cell, marker) {
        const text = document.createElement("h1");
        text.textContent = marker
        cell.appendChild(text)
    }

    function highlightWin(combo) {
        for (let num of combo) {
            let cell = document.querySelector(`[data-index="${num}"]`)
            cell.style.backgroundColor = "green"; 
        }
    }

    return {
        eventListeners,
        updateAnnouncementText,
        addMarker,
        displayAnnouncements,
        allowClicksToggle,
        highlightWin,
    }
})()

display.eventListeners();