// Module for changing number of players font color
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


// Module for handling the player modal display
const player2SelectModule = (function () {
  const numPlayers = document.querySelector("#num-players");
  const modalPlayer2 = document.querySelector("#modal-player2");

  function showPlayer2Select() {
    if (numPlayers.checked) {
      modalPlayer2.style.display = "flex";
      modalPlayer2.style.animationName = "fadeIn";
    } else {
      modalPlayer2.style.display = "none";
    }
  }

  return {
    showPlayer2Select,
  };
})();


// Module for handling the zodiac button images
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

      // button.addEventListener("mouseenter", () => {
      //   zodSym.style.display = "none";
      //   zodImg.style.display = "flex";
      // });

      // button.addEventListener("mouseleave", () => {
      //   zodSym.style.display = "flex";
      //   zodImg.style.display = "none";
      // });
    });
  }

  return {
    changeZodBtnImgs,
  };
})();


// Factory function for creating player selectors
function PlayerSignSelectModule(playerId, valueChecker) {
  const zodBtns = document.querySelectorAll(".zod-btn");
  const playerSelects = document.querySelector(playerId);
  let selectedSign = "";

  function selectPlayerSign() {
    zodBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const matchingText = valueChecker.filter((text) =>
          text.hasOwnProperty(button.id)
        );

        if (matchingText.length > 0) {
          selectedSign = matchingText.map((obj) => obj[button.id]).join("");
          playerSelects.textContent = selectedSign;
          playerSelects.style.color = "var(--red)";
        }
      });
    });
  }

  function getSelectedSign () {
    return selectedSign;
  }

  return {
    selectPlayerSign,
    getSelectedSign
  };
}

// Initialize the modules
const numPlayersCheckbox = document.querySelector("#num-players");
numPlayersCheckbox.addEventListener("change", () => {
  numPlayersFontColorModule.changeNumPlayerFontColor();
  player2SelectModule.showPlayer2Select();
});

numPlayersFontColorModule.changeNumPlayerFontColor();
player2SelectModule.showPlayer2Select();
zodBtnImgsModule.changeZodBtnImgs();

const valueChecker1 = [
  { ari1: "Aries" },
  { tau1: "Taurus" },
  { gem1: "Gemini" },
  { can1: "Cancer" },
  { leo1: "Leo" },
  { vir1: "Virgo" },
  { lib1: "Libra" },
  { sco1: "Scorpio" },
  { sag1: "Sagittarius" },
  { cap1: "Capricorn" },
  { aqu1: "Aquarius" },
  { pis1: "Pisces" },
];
const valueChecker2 = [
  { ari2: "Aries" },
  { tau2: "Taurus" },
  { gem2: "Gemini" },
  { can2: "Cancer" },
  { leo2: "Leo" },
  { vir2: "Virgo" },
  { lib2: "Libra" },
  { sco2: "Scorpio" },
  { sag2: "Sagittarius" },
  { cap2: "Capricorn" },
  { aqu2: "Aquarius" },
  { pis2: "Pisces" },
];

const player1SignSelect = PlayerSignSelectModule(
  "#player1-sign-select",
  valueChecker1
);

const player2SignSelect = PlayerSignSelectModule(
  "#player2-sign-select",
  valueChecker2
);

player1SignSelect.selectPlayerSign();
player2SignSelect.selectPlayerSign();

const zodBtns = document.querySelectorAll(".zod-btn");
zodBtns.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(player1SignSelect.getSelectedSign());
  });
});

const modalClearStartBtnModule = (function () {
  const clearBtn = document.querySelector("#clear-btn");
  const startBtn = document.querySelector("#start-btn");
  const dialog = document.querySelector("dialog");

  function useClearBtn() {
    location.reload();
  }

  function useStartBtn() {
    dialog.style.display = "none";
  }

  clearBtn.addEventListener("click", useClearBtn);
  startBtn.addEventListener("click", useStartBtn);

})()


const gameBoard = (function () {
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

  // return board

  function updateCell(index, newMarker) {
    if (index >= 0 && index < 9) {
      board[index].marker = newMarker;
      // let newBoard = board;
      // return newBoard;
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
console.log(gameBoard.updateCell(6, "X"));
console.log(gameBoard.updateCell(1, "O"));
console.log(gameBoard.updateCell(2, "O"));
console.log(gameBoard.updateCell(4, "X"));
console.log(gameBoard.updateCell(8, "X"));
gameBoard.displayCell();

// SET UP THE GAMEPLAY

function gamePlayer() {
  // SET UP THE PLAYERS/CHOOSE PLAYERS AND TYPE OF PLAYER
  // PLAYER 1 WITH X; OPTIONAL NAME CHANGE; HUMAN OR AI, DEFAULT IS HUMAN
  // PLAYER 2 WITH O; OPTIONAL NAME CHANGE; HUMAN OR AI, DEFAULT IS AI
  // USE MODAL?
  // PLAYER TYPE TOGGLE
  // HUMAN1 VS AI2 -- DEFAULT
  // HUMAN1 VS HUMAN2
  // AI1 VS AI2
  // AI1 VS HUMAN2 -- rarest...
  // ONCE A SQUARE IS CLICKED TOGGLE AND PLAYER CHOICES ARE FROZEN, CAN NLY PICK SQUARES OR RESET GAME
  // PLAYER 1 SELECTS
  // PLAYER 1 MARKER IS PLACED ON THE DESIRED CELL
  // PLAYER 2 SELECTS
  // PLAYER 2 MARKER IS PLACED ON THE DESIRED CELL
  // CHECK FOR WIN CONDITION AFTER TURN 3
  // USE A TURN COUNTER...
  // CHECK FOR DRAW CONDITION AFTER TURN 9
  // USE A TURN COUNTER...
}