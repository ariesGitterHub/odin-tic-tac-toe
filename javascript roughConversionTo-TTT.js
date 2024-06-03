function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const addToken = (row, column, player) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].addToken(player);
      return true;
    }
    return false;
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => (cell.getValue() === 0 ? "-" : cell.getValue()))
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, addToken, printBoard };
}

function Cell() {
  let value = 0;

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];
  let moves = 0;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    if (board.addToken(row, column, getActivePlayer().token)) {
      moves++;
      if (checkWin(row, column, getActivePlayer().token)) {
        board.printBoard();
        console.log(`${getActivePlayer().name} wins!`);
        return;
      } else if (moves === 9) {
        board.printBoard();
        console.log("It's a draw!");
        return;
      }

      switchPlayerTurn();
      printNewRound();
    } else {
      console.log("Invalid move, try again.");
    }
  };

  const checkWin = (row, column, player) => {
    const boardArray = board.getBoard();

    // Check row
    if (boardArray[row].every((cell) => cell.getValue() === player))
      return true;

    // Check column
    if (boardArray.every((row) => row[column].getValue() === player))
      return true;

    // Check diagonals
    if (
      row === column &&
      boardArray.every((row, idx) => row[idx].getValue() === player)
    )
      return true;
    if (
      row + column === 2 &&
      boardArray.every((row, idx) => row[2 - idx].getValue() === player)
    )
      return true;

    return false;
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();

