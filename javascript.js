// Module for changing toggle slider color, and selected player number font color
const numPlayersFontColorModule = (function () {
  const numPlayers = document.querySelector("#num-players");
  const sliderText1 = document.querySelector("#slider-text1");
  const sliderText2 = document.querySelector("#slider-text2");

  function changeNumPlayerFontColor() {
    if (numPlayers.checked) {
      sliderText2.style.color = "var(--red)";
      sliderText1.style.color = "";
    } else {
      sliderText1.style.color = "var(--red)";
      sliderText2.style.color = "";
    }
  }

  return {
    changeNumPlayerFontColor,
  };
})();

// Module for handling player two marker options on modal/dialog display
const playerTwoSelectModule = (function () {
  const numPlayers = document.querySelector("#num-players");
  const modalPlayerTwo = document.querySelector("#modal-player-two");

  function showPlayerTwoSelect() {
    if (numPlayers.checked) {
      modalPlayerTwo.style.display = "flex";
      modalPlayerTwo.style.animationName = "fadeIn";
    } else {
      modalPlayerTwo.style.display = "none";
    }
  }

  return {
    showPlayerTwoSelect,
  };
})();

// Module for switching the zodiac symbol and image when button is hovered/focused
const zodBtnImgsModule = (function () {
  const zodBtns = document.querySelectorAll(".zod-btn");

  function changeZodBtnImgs() {
    zodBtns.forEach((button) => {
      const zodSym = button.querySelector(".zod-sym");
      const zodImg = button.querySelector(".zod-img");

      function showImg() {
        zodSym.style.display = "none";
        zodImg.style.display = "flex";
      }

      function hideImg() {
        zodSym.style.display = "flex";
        zodImg.style.display = "none";
      }

      button.addEventListener("mouseenter", showImg);
      button.addEventListener("mouseleave", hideImg);
      button.addEventListener("focus", showImg);
      button.addEventListener("blur", hideImg);
    });
  }

  return {
    changeZodBtnImgs,
  };
})();

// Factory function for creating player marker selection
(function () {
  function PlayerSignSelectModule(playerId, playerKey) {
    const zodBtns = document.querySelectorAll(".zod-btn");
    const playerSelects = document.querySelector(playerId);
    let selectedSign = "";
    let selectedSignId = "";

    function selectPlayerSign() {
      zodBtns.forEach((button) => {
        button.addEventListener("click", () => {
          const matchingText = valueChecker[playerKey][button.id];

          if (matchingText) {
            selectedSign = matchingText;
            selectedSignId = button.id;
            playerSelects.textContent = selectedSign;
            playerSelects.style.color = "var(--red)";
          }
        });
      });
    }

    function getSelectedSign() {
      return selectedSign;
    }

    function getSelectedSignId() {
      return selectedSignId;
    }

    return {
      selectPlayerSign,
      getSelectedSign,
      getSelectedSignId,
    };
  }

  const valueChecker = {
    player1: {
      ari1: "Aries",
      tau1: "Taurus",
      gem1: "Gemini",
      can1: "Cancer",
      leo1: "Leo",
      vir1: "Virgo",
      lib1: "Libra",
      sco1: "Scorpio",
      sag1: "Sagittarius",
      cap1: "Capricorn",
      aqu1: "Aquarius",
      pis1: "Pisces",
    },
    player2: {
      ari2: "Aries",
      tau2: "Taurus",
      gem2: "Gemini",
      can2: "Cancer",
      leo2: "Leo",
      vir2: "Virgo",
      lib2: "Libra",
      sco2: "Scorpio",
      sag2: "Sagittarius",
      cap2: "Capricorn",
      aqu2: "Aquarius",
      pis2: "Pisces",
    },
  };

  const playerOneSignSelect = PlayerSignSelectModule(
    "#player-one-sign-select",
    "player1"
  );
  const playerTwoSignSelect = PlayerSignSelectModule(
    "#player-two-sign-select",
    "player2"
  );

  playerOneSignSelect.selectPlayerSign();
  playerTwoSignSelect.selectPlayerSign();

  window.playerOneSignSelect = playerOneSignSelect;
  window.playerTwoSignSelect = playerTwoSignSelect;
})();

// Initialize the modules
const numPlayersCheckbox = document.querySelector("#num-players");

numPlayersCheckbox.addEventListener("change", () => {
  numPlayersFontColorModule.changeNumPlayerFontColor();
  playerTwoSelectModule.showPlayerTwoSelect();
});

numPlayersFontColorModule.changeNumPlayerFontColor();
playerTwoSelectModule.showPlayerTwoSelect();
zodBtnImgsModule.changeZodBtnImgs();

const clearBtnModule = (function () {
  const clearBtn = document.querySelectorAll(".clear-btn");

  function useClearBtn() {
    // Below code is to ensure the Firefox browsers completely reload page, previously not doing so with window.location.reload();. Tested: works.
    window.location.href =
      window.location.pathname + "?cachebust=" + new Date().getTime();
  }

  clearBtn.forEach((button) => button.addEventListener("click", useClearBtn));
})();

const modalStartBtnModule = (function () {
  const startBtn = document.querySelector("#start-btn");
  const numPlayers = document.querySelector("#num-players");
  const alert1 = document.querySelector("#alert1");
  const alertMsg1 = document.querySelector("#alert-msg1");
  const alert2 = document.querySelector("#alert2");
  const alertMsg2 = document.querySelector("#alert-msg2");
  const dialog = document.querySelector("dialog");
  const gameContainer = document.querySelector("#game-container");

  function useStartBtn() {
    const playerOneSignId = window.playerOneSignSelect.getSelectedSignId();
    const playerOneSign = window.playerOneSignSelect.getSelectedSign();
    const playerTwoSignId = window.playerTwoSignSelect.getSelectedSignId();
    const playerTwoSign = window.playerTwoSignSelect.getSelectedSign();

    // One player: if player one sign not selected...
    if (!numPlayers.checked && playerOneSignId === "") {
      alert1.style.display = "flex";
      alertMsg1.textContent = "Please select a sign for player one.";
      return;
    }

    // Two players: if player one and player two signs not selected...
    if (
      numPlayers.checked &&
      playerOneSignId === "" &&
      playerTwoSignId === ""
    ) {
      alert1.style.display = "flex";
      alertMsg1.textContent = "Please select a sign for player one.";
      alert2.style.display = "flex";
      alertMsg2.textContent = "Please select a sign for player two.";
      return;
    }

    // Two players, player one sign not selected...
    if (numPlayers.checked && playerOneSignId === "") {
      alert1.style.display = "flex";
      alertMsg1.textContent = "Please select a sign for player one.";
      return;
    }

    // Two players, player two sign not selected...
    if (numPlayers.checked && playerTwoSignId === "") {
      alert2.style.display = "flex";
      alertMsg2.textContent = "Please select a sign for player two.";
      return;
    }

    // Close the dialog and proceed with the game...no need for an else statement.
    dialog.style.display = "none";
    gameContainer.style.display = "flex";
    console.log(`Player ONE's starting turn.`);

    // Call another function with the selected sign data
    playerBoardModule.setPlayerBoard(
      playerOneSignId,
      playerOneSign,
      playerTwoSignId,
      playerTwoSign
    );
  }

  startBtn.addEventListener("click", useStartBtn);

  return {
    getPlayerOneSign: () => playerOneSign,
    getPlayerOneSignId: () => playerOneSignId,
    getPlayerTwoSign: () => playerTwoSign,
    getPlayerTwoSignId: () => playerTwoSignId,
  };
})();

const playerBoardModule = (function () {
  const playerOneMarker = document.querySelector("#player-one-marker");
  const playerOneName = document.querySelector("#player-one-name");
  const playerOneType = document.querySelector("#player-one-type");
  const playerTwoMarker = document.querySelector("#player-two-marker");
  const playerTwoName = document.querySelector("#player-two-name");
  const playerTwoType = document.querySelector("#player-two-type");
  const randomPick = Math.floor(Math.random() * 12);

  const computerPlayerTwoIdList = [
    "ari2",
    "tau2",
    "gem2",
    "can2",
    "leo2",
    "vir2",
    "lib2",
    "sco2",
    "sag2",
    "cap2",
    "aqu2",
    "pis2",
  ];

  const computerPlayerTwoList = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  function setPlayerBoard(
    playerOneSignId,
    playerOneSign,
    playerTwoSignId,
    playerTwoSign
  ) {
    // Keep redundancy of images below in case I want to change these images later on.
    const signMarkers = {
      ari1: { markerImg: "./assets/ari-img.svg", markerBkg: "var(--fire1)" },
      tau1: { markerImg: "./assets/tau-img.svg", markerBkg: "var(--earth1)" },
      gem1: { markerImg: "./assets/gem-img.svg", markerBkg: "var(--air1)" },
      can1: { markerImg: "./assets/can-img.svg", markerBkg: "var(--water1)" },
      leo1: { markerImg: "./assets/leo-img.svg", markerBkg: "var(--fire1)" },
      vir1: { markerImg: "./assets/vir-img.svg", markerBkg: "var(--earth1)" },
      lib1: { markerImg: "./assets/lib-img.svg", markerBkg: "var(--air1)" },
      sco1: { markerImg: "./assets/sco-img.svg", markerBkg: "var(--water1)" },
      sag1: { markerImg: "./assets/sag-img.svg", markerBkg: "var(--fire1)" },
      cap1: { markerImg: "./assets/cap-img.svg", markerBkg: "var(--earth1)" },
      aqu1: { markerImg: "./assets/aqu-img.svg", markerBkg: "var(--air1)" },
      pis1: { markerImg: "./assets/pis-img.svg", markerBkg: "var(--water1)" },
      ari2: { markerImg: "./assets/ari-img.svg", markerBkg: "var(--fire2)" },
      tau2: { markerImg: "./assets/tau-img.svg", markerBkg: "var(--earth2)" },
      gem2: { markerImg: "./assets/gem-img.svg", markerBkg: "var(--air2)" },
      can2: { markerImg: "./assets/can-img.svg", markerBkg: "var(--water2)" },
      leo2: { markerImg: "./assets/leo-img.svg", markerBkg: "var(--fire2)" },
      vir2: { markerImg: "./assets/vir-img.svg", markerBkg: "var(--earth2)" },
      lib2: { markerImg: "./assets/lib-img.svg", markerBkg: "var(--air2)" },
      sco2: { markerImg: "./assets/sco-img.svg", markerBkg: "var(--water2)" },
      sag2: { markerImg: "./assets/sag-img.svg", markerBkg: "var(--fire2)" },
      cap2: { markerImg: "./assets/cap-img.svg", markerBkg: "var(--earth2)" },
      aqu2: { markerImg: "./assets/aqu-img.svg", markerBkg: "var(--air2)" },
      pis2: { markerImg: "./assets/pis-img.svg", markerBkg: "var(--water2)" },
    };

    if (playerOneSignId) {
      const playerOneMarkerInfo = signMarkers[playerOneSignId];
      playerOneName.textContent = playerOneSign;
      playerOneType.textContent = "(Human)";
      playerOneMarker.src = playerOneMarkerInfo.markerImg;
      playerOneMarker.style.backgroundColor = playerOneMarkerInfo.markerBkg;
    }

    if (playerTwoSignId) {
      const playerTwoMarkerInfo = signMarkers[playerTwoSignId];
      playerTwoName.textContent = playerTwoSign;
      playerTwoType.textContent = "(Human)";
      playerTwoMarker.src = playerTwoMarkerInfo.markerImg;
      playerTwoMarker.style.backgroundColor = playerTwoMarkerInfo.markerBkg;
    } else {
      const computerPlayerTwoId = computerPlayerTwoIdList[randomPick];
      playerTwoMarkerInfo = signMarkers[computerPlayerTwoId];
      const computerPlayerTwo = computerPlayerTwoList[randomPick];
      playerTwoName.textContent = computerPlayerTwo;
      playerTwoType.textContent = "(Computer)";
      playerTwoMarker.src = playerTwoMarkerInfo.markerImg;
      playerTwoMarker.style.backgroundColor = playerTwoMarkerInfo.markerBkg;
    }
    return {
      playerOneMarker,
      playerTwoMarker,
    };
  }

  return {
    setPlayerBoard,
  };
})();

playerBoardModule.setPlayerBoard();

function gamePlayerController(playerOneMarker, playerTwoMarker) {
  const boardCells = document.querySelectorAll(".cell");
  let currentPlayer = 1;
  const messageBoard = document.querySelector("#message-board");
  const player1Opening = `Player One makes the first move.`;
  const player2Opening = `Player Two makes the first move.`;
  const player1Turn = `Player One pick a square.`;
  const player2Turn = `Player Two, it is your turn.`;
  const player1Win = `Player One wins! Click "New Game" for another match.`;
  const player2Win = `Player Two wins! Click "New Game" for another match.`;
  const playersDraw = `This match is a draw. Click the "New Game" button for another round.`;
  messageBoard.textContent = player1Opening;
  let round = 0;
  let winner = 0;
  const playerTwoType = document.querySelector("#player-two-type");

  function updateMessageBoard() {
    if (winner === 1) {
      messageBoard.textContent = player2Opening;
    } else if (winner === 2) {
      messageBoard.textContent = player1Opening;
    }
  }

  updateMessageBoard();

  const audio1 = new Audio("./assets.pop1.mp3");
  const audio2 = new Audio("./assets.pop2.mp3");

  boardCells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
      if (!cell.innerHTML && !checkWinCondition()) {
        // Check if the cell is empty first...
        if (currentPlayer === 1) {
          cell.innerHTML = `<img src="${playerOneMarker.src}" data-player="1" style="background-color: ${playerOneMarker.style.backgroundColor};" />`;
          audio1.play();
          round++;
          messageBoard.textContent = player2Turn;
        } else if (currentPlayer === 2) {
          cell.innerHTML = `<img src="${playerTwoMarker.src}" data-player="2" style="background-color: ${playerTwoMarker.style.backgroundColor};" />`;
          audio2.play();
          round++;
          messageBoard.textContent = player1Turn;
        }

        // Check for win condition after at least 5 rounds (earliest possible win)
        if (round >= 5) {
          if (checkWinCondition()) {
            messageBoard.textContent = `Player ${
              currentPlayer === 1 ? "One" : "Two"
            } wins! Click "New Game" for another match.`;
            messageBoard.style.backgroundColor =
              currentPlayer === 1
                ? playerOneMarker.style.backgroundColor
                : playerTwoMarker.style.backgroundColor;
            if (messageBoard.textContent === player1Win) {
              winner = 1;
            } else if (messageBoard.textContent === player2Win) {
              winner = 2;
            }
          } else if (round === 9) {
            messageBoard.textContent = playersDraw;
          }
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player turn

        const resetBtn = document.querySelector("#new-game-btn");
        resetBtn.addEventListener("click", useNewGameBtn);

        // Check if Player Two is a computer
        const isComputerPlayer = playerTwoType.textContent === "(Computer)";

        function computerPlayer() {
          if (isComputerPlayer && currentPlayer === 2) {
            setTimeout(() => {
              const emptyCells = Array.from(boardCells).filter(
                (cell) => !cell.innerHTML
              );

              // Putting currentPlayer 1 check here fixed the problem with computerPlayer hitting all the squares without player 1 input.
              if (emptyCells.length > 0 && currentPlayer === 2) {
                const randomCell =
                  emptyCells[Math.floor(Math.random() * emptyCells.length)];
                randomCell.click();
              }
            }, 500); // Adds a slight delay for the computer's move
          }
        }

        computerPlayer();

        function useNewGameBtn() {
          boardCells.forEach((cell) => {
            cell.innerHTML = "";
            messageBoard.style.backgroundColor = "";
            cell.style.backgroundColor = "";
            round = 0;

            if (winner === 1) {
              currentPlayer = 2;
            } else if (winner === 2) {
              currentPlayer = 1;
            }

            // currentPlayer = winner; // Winner starts the new game
            updateMessageBoard();

            if (isComputerPlayer && currentPlayer === 2) {
              computerPlayer();
            }
          });
        }

        // Log checks...
        console.log(`Current round is ${round}...`);
        console.log(`It is player ${currentPlayer}'s turn.`);
        console.log(`Winner condtion is: ${checkWinCondition()}`);

        if (winner === 0) {
          console.log(`No current player is a champion.`);
        } else if (winner === 1) {
          console.log(`PLAYER ONE IS THE CHAMPION OF THE WORLD.`);
        } else if (winner === 2) {
          console.log(`PLAYER TWO REIGNS AS CHAMP NOW.`);
        }
      }
    });
  });

  function checkWinCondition() {
    const cells = document.querySelectorAll(".cell");
    const winPatterns = [
      [0, 1, 2], // Rows
      [3, 4, 5], // Rows
      [6, 7, 8], // Rows
      [0, 3, 6], // Columns
      [1, 4, 7], // Columns
      [2, 5, 8], // Columns
      [0, 4, 8], // Diagonals
      [2, 4, 6], // Diagonals
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      const cellA = cells[a].querySelector("img");
      const cellB = cells[b].querySelector("img");
      const cellC = cells[c].querySelector("img");

      if (cellA && cellB && cellC) {
        const playerA = parseInt(cellA.dataset.player);
        const playerB = parseInt(cellB.dataset.player);
        const playerC = parseInt(cellC.dataset.player);

        if (
          playerA &&
          playerB &&
          playerC &&
          playerA === playerB &&
          playerB === playerC
        ) {
          // console.log(cells[a], cells[b], cells[c]);

          cells[a].style.backgroundColor = "var(--dk-gray)";
          cells[b].style.backgroundColor = "var(--dk-gray)";
          cells[c].style.backgroundColor = "var(--dk-gray)";

          return true;
        }
      }
      return false;
    });
  }
}

const { playerOneMarker, playerTwoMarker } = playerBoardModule.setPlayerBoard();
gamePlayerController(playerOneMarker, playerTwoMarker);

const gameBoardModule = (function () {
  function Cell() {
    let marker = "";
    return { marker };
  }

  const board = [
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
  ];

  function updateCell(index, newMarker) {
    if (index >= 0 && index < 9) {
      board[index].marker = newMarker;
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

// Initial marker in cell tests
// gameBoardModule.updateCell(0, "X");
// gameBoardModule.updateCell(1, "O");
// console.log(gameBoardModule.updateCell(6, "X"));
// console.log(gameBoardModule.updateCell(8, "O"));

gameBoardModule.displayCell();
