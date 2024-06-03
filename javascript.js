function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => Cell())
  );

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
  const addToken = (player) => {
    value = player;
  };
  const getValue = () => value;
  return { addToken, getValue };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
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
    const checkLine = (line) =>
      line.every((cell) => cell.getValue() === player);

    if (checkLine(boardArray[row])) return true;
    if (boardArray.every((r) => r[column].getValue() === player)) return true;
    if (
      row === column &&
      boardArray.every((r, idx) => r[idx].getValue() === player)
    )
      return true;
    if (
      row + column === 2 &&
      boardArray.every((r, idx) => r[2 - idx].getValue() === player)
    )
      return true;

    return false;
  };

  printNewRound();

  return { playRound, getActivePlayer };
}

const game = GameController();
