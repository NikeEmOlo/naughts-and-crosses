const gameController = (function() {

    function startGame() {
        console.log("Let's play Naughts and Crosses.")
        const showInstructions = prompt("Do you need to see the instructions on how to play? Type y for yes or n for no.")
        if (showInstructions === "y" | "Y") {
            console.log(`Game instructions: You need two players for this game.
            Take it in turns to place your marker on the grid.
            The goal is to get three of your markers in a row, horizontally, vertically, or diagonally.
            That's it!`)
        } else if (showInstructions === "n" | "N") {
            //do something else
        } else {
            console.log(`Not sure what that means, but it's not that hard. Let's play`)
        }

    }

    function 


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

    function printBoard() {
        console.log(boardArr.slice(0, 3).join(' | '))
        console.log(boardArr.slice(3, 6).join(' | '))
        console.log(boardArr.slice(6, 9).join(' | '))
    }

  return {
    updateBoard,
    printBoard,
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