const gameController = (function() {
    let whosTurn = true;

    function startGame() {
        console.log("Let's play Naughts and Crosses.")
        const showInstructions = prompt("Do you need to see the instructions on how to play? Type y for yes or n for no.")
        if (showInstructions === "y" | "Y") {
            alert("Game instructions:\nYou need two players for this game.\nTake it in turns to place your marker on the grid.\nThe goal is to get three of your markers in a row, horizontally, vertically, or diagonally.\nThat's it!")
            console.log("Let's go!")
            gameBoard.displayBoardInConsole();
        } else if (showInstructions === "n" | "N") {
            console.log(`OK let's go!`)
            gameBoard.displayBoardInConsole();
        } else {
            console.log(`Not sure what that means, but it's not that hard. Let's play`);
            gameBoard.displayBoardInConsole();
        }
        for (i = 0; i < 9; i++) {
            takeTurn()
            whosTurn = !whosTurn;
        }
    }

    function takeTurn() {
        const currentPlayer = whosTurn ? "Player 1" : "Player 2";
        const playerChoice = prompt(`${currentPlayer}'s turn. Choose where to put your marker by typing the number:
        ${gameBoard.printBoard()}`)
        //Need to update the gameBoard here
        if (whosTurn) {
            gameBoard.updateBoard(playerChoice, "x");
        } else if (!whosTurn) {
            gameBoard.updateBoard(playerChoice, "o");
        } else {
            console.log("Hmmm, try choosing somewhere on the board");
            playerChoice;
            return
        }
    }

    return {
        startGame,

    }
})()


const gameBoard = (function() {
    const boardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8",]

    function updateBoard(index, player) {
        boardArr[index] = player;
        return boardArr;
    }

    function displayBoardInConsole() {
        console.log(boardArr.slice(0, 3).join(' | '))
        console.log(boardArr.slice(3, 6).join(' | '))
        console.log(boardArr.slice(6, 9).join(' | '))
    }

    function printBoard() {
          return `\n${boardArr.slice(0, 3).join(' | ')}\n${boardArr.slice(3, 6).join(' | ')}\n${boardArr.slice(6, 9).join(' | ')}`
    }

    function resetGameBoard() {
        boardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8",]
    }


  return {
    updateBoard,
    displayBoardInConsole,
    printBoard,
    resetGameBoard,
  }
})()

const players = (function() {
    const playerInfo = {
        p1: {
            player: "x",
            score: 0,
        },

        p2: {
            player: "o",
            score: 0,
        },
    }

    return {
        playerInfo,
    }
})()