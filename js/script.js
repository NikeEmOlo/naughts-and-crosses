const gameBoard = (function() {
  // your private board array here
    const boardArr = ["", "", "", "", "", "", "", "", "",]

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