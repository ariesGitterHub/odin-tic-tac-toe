// const makeGameBoard = (function() {
// console.log("gameboard test");

// const rows = 3;
// const cols = 3;
// const board = [];
// const cell = "";

// for (let i = 0; i < rows; i++) {
//   board[i] = [];
//     for (let j = 0; j < cols; j++) {
//       board[i].push(cell);
//     }
// }
//  console.log(board);
// })()

// const makeGameBoard = (function () {
//   console.log("gameboard test");

// const board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
// // console.log(board);
// // const display = document.querySelectorAll(".cell");
// // const cell0 = document.querySelector("#cell0");
// // cell0.textContent = board[0];

// // const cell1 = document.querySelector("#cell1");
// // cell1.textContent = board[1];

// // const cell2 = document.querySelector("#cell2");
// // cell2.textContent = board[2];

// // const cell3 = document.querySelector("#cell3");
// // cell3.textContent = board[3];

// // const cell4 = document.querySelector("#cell4");
// // cell4.textContent = board[4];

// // const cell5 = document.querySelector("#cell5");
// // cell5.textContent = board[5];

// // const cell6 = document.querySelector("#cell6");
// // cell6.textContent = board[6];

// // const cell7 = document.querySelector("#cell7");
// // cell7.textContent = board[7];

// // const cell8 = document.querySelector("#cell8");
// // cell8.textContent = board[8];

//   const cells = document.querySelectorAll(".cell");

//   cells.forEach((cell, index) => {
//     cell.textContent = board[index];
//   });

// return board;

// })()

// const makeGameBoard = (function () {
//   console.log("gameboard test");

//   const board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
//   console.log(board);
//   const cells = document.querySelectorAll(".cell");
//   cells.forEach((cell, index) => {
//     cell.textContent = board[index];
//   });

//   return board;
// })()

// const board = [
//   "", "", "",
//   "", "", "",
//   "", "", ""
// ];


// SET UP THE GAMEBOARD AND INDIVIDUAL CELLS
// 3X3 GRID OF CELLS
// LABEL CELLS?

// const gameBoard = (function() {
//   const rows = 3;
//   const columns = 3;
//   const board = [];
  
//   function Cell() {
//     let marker = 0;
//     return {
//       marker
//     }
//   }
//   function makeBoard() {
//     for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j = 0; j < columns; j++) {
//       board[i].push(Cell());
//     }
//   }    
//     return board
//   } 

//   function labelBoard() {
//     console.log(board);

//   }

//   return {
//     makeBoard,
//     labelBoard
//   }

// })();

// console.log(gameBoard.makeBoard());
// gameBoard.labelBoard();

const gameBoard = (function () {

  function Cell() {
    let marker = "";
    return { marker };
  }  
  
  const board = [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()];

  // return board

  function updateCell(index, newMarker) {

    if (index >= 0 && index < 9) {
      board[index].marker = newMarker;
      let newBoard = board;
      return newBoard;
    } else {
      console.error("Invalid index provided");
    }
  }

  function displayCell() {
      const cells = document.querySelectorAll(".cell");
      cells.forEach((cell, index) => {
        cell.textContent = board[index].marker;
      });
  }

      return { board, updateCell, displayCell };

})();

// gameBoard.updateCell(0, "E");
// gameBoard.updateCell(1, "Y");
// gameBoard.updateCell(2, "A");
console.log(gameBoard.updateCell(0, "X"));
console.log(gameBoard.updateCell(1, "O"));
console.log(gameBoard.updateCell(2, "O"));
console.log(gameBoard.updateCell(4, "X"))
console.log(gameBoard.updateCell(8, "X"));
gameBoard.displayCell();



// SET UP THE PLAYERS
// PLAYER 1 WITH X
// PLAYER 2 WITH O

// SET UP THE GAMEPLAY
// PLAYER 1 SELECTS
// PLAYER 1 MARKER IS PLACED ON THE DESIRED CELL
// PLAYER 2 SELECTS
// PLAYER 2 MARKER IS PLACED ON THE DESIRED CELL

// CHECK FOR WIN CONDITION AFTER TURN 3
// USE A TURN COUNTER...
// CHECK FOR DRAW CONDITION AFTER TURN 9
// USE A TURN COUNTER...




