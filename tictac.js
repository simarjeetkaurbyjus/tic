window.addEventListener("DOMContentLoaded", () => {
  //assiging variables
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.querySelector("#reset");
    const announcer = document.querySelector(".announcer");
  // empty array assgined to store the results
    let board = [" ", " x", " ", "x", "", "", "x", "", ""];
      // current player default to X
    let currentPlayer = "X";
    //bydefault game is active 
    let isGameActive = true;
  // 3 variables for declaring the result 

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE";
  
    /*
          Indexes within the board
          [0] [1] [2]
          [3] [4] [5]
          [6] [7] [8]
      */
  // multiple array
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  //define the function handle resultvalidation 
    function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }
  //?:
      if (roundWon) {
        announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
      }
  
      if (!board.includes("")) announce(TIE);
    }
  
    const announce = (type) => {
      switch (type) {
        case PLAYERO_WON:
          announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
          break;
        case PLAYERX_WON:
          announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
          break;
        case TIE:
          announcer.innerText = "Tie";
      }
      announcer.classList.remove("hide");
    };
  // it will check whether you can type anything or not 
    const isValidAction = (tile) => {
      if (tile.innerText === "X" || tile.innerText === "O") {
        return false;
      }
  
      return true;
    };
  //define a function updateboard
    const updateBoard = (index) => {
      board[index] = currentPlayer;
    };
  
    const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
    };
  //defination of useraction function 
    const userAction = (tile, index) => {
      if (isValidAction(tile) && isGameActive) {
        //we want to change the text of the tile with the current player 
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        // calling three functions 
        updateBoard(index);
        //call a function handleresult validation
        handleResultValidation();
        //call a function name is changeplayer
        changePlayer();
      }
    };
  //define resetboard function
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
      isGameActive = true;
      announcer.classList.add("hide");
  
      if (currentPlayer === "O") {
        changePlayer();
      }
  
      tiles.forEach((tile) => {
        tile.innerText = "";
        tile.classList.remove("playerX");
        tile.classList.remove("playerO");
      });
    };
  //when we click on the tile this will happen 
    tiles.forEach((tile, index) => {
      //call the function useraction() 
      tile.addEventListener("click", () => userAction(tile, index));
    });
    resetButton.addEventListener("click", resetBoard);
  });
  