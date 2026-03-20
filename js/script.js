const gameController = (function() {
    let whosTurn = true;

    function startGame() {
        console.log("Let's play Naughts and Crosses.")
        const showInstructions = prompt("Do you need to see the instructions on how to play? Type y for yes or n for no.")
        if (showInstructions.toLowerCase() === "y") {
            alert("Game instructions:\nYou need two players for this game.\nTake it in turns to place your marker on the grid.\nThe goal is to get three of your markers in a row, horizontally, vertically, or diagonally.\nThat's it!")
            console.log("Let's go!")
            gameBoard.displayBoardInConsole();
        } else if (showInstructions.toLowerCase() === "n") {
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

        for (i = 0; i < winningCombos.length; i++) {
            const combo = winningCombos[i];
            if (boardArr[combo[0]] === "x" && boardArr[combo[1]] === "x" && boardArr[combo[2]] === "x") {
                console.log("Player 1 wins!")
                players.playerInfo.p1.score++;
                displayBoardInConsole();
                resetGameBoard();
            } else if (boardArr[combo[0]] === "o" && boardArr[combo[1]] === "o" && boardArr[combo[2]] === "o") {
                players.playerInfo.p2.score++;
                displayBoardInConsole();
                console.log("Player 2 wins!")
                resetGameBoard();
            } else {
                console.log("Something wrong with scoring or winning combos")
            }
        }
        
        return winningCombos;
    }

  // your checking logic here

  return {
    updateBoard,
    displayBoardInConsole,
    printBoard,
    resetGameBoard,
    checkWinner,
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