const mazeModel = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W W W",
  "W W W WWW WWWWW W W W",
  "W W W   W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW",
];

const initialPosition = { row: 9, column: 0 };

let currentPosition = { row: 9, column: 0 };
let movements = 0;

function createMaze(maze, position) {
  const divMaze = document.querySelector("#maze");
  divMaze.innerHTML = "";

  for (let row = 0; row < maze.length; row++) {
    const divRow = document.createElement("div");
    divRow.classList.add("row");

    for (let column = 0; column < maze[row].length; column++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const currentCell = maze[row][column];

      if (currentCell === "W") {
        cell.classList.add("wall");
      } else if (row === position.row && column === position.column) {
        cell.classList.add("player");
      } else if (currentCell === "F") {
        cell.classList.add("finish");
      } else if (currentCell === " ") {
        cell.classList.add("path");
      }

      divRow.appendChild(cell);
    }

    divMaze.appendChild(divRow);
  }
}

function validateMovement(maze, position) {
  const totalRows = maze.length;
  const totalColumns = maze[0].length;
  const row = position.row;
  const column = position.column;

  if (
    row < 0 ||
    row >= totalRows ||
    column < 0 ||
    column >= totalColumns ||
    maze[row][column] === "W"
  ) {
    return false;
  }

  return true;
}

function moverJogador(maze, pressedKey) {
  const newPosition = {
    row: currentPosition.row,
    column: currentPosition.column,
  };
  if (pressedKey === "ArrowUp") {
    newPosition.row -= 1;
  } else if (pressedKey === "ArrowDown") {
    newPosition.row += 1;
  } else if (pressedKey === "ArrowLeft") {
    newPosition.column -= 1;
  } else if (pressedKey === "ArrowRight") {
    newPosition.column += 1;
  }

  if (validateMovement(maze, newPosition)) {
    currentPosition = newPosition;

    movements++;

    const encontrouChegada = validateWinCondition(maze, newPosition);

    if (encontrouChegada) {
      switchResult();
    }

    createMaze(maze, currentPosition);
  }

  console.log(currentPosition);
}

function switchResult() {
  const resultContainer = document.querySelector("#result-container");

  if (resultContainer.classList.contains("hidden")) {
    resultContainer.classList.remove("hidden");
    resultContainer.classList.add("visible");
  } else {
    resultContainer.classList.remove("visible");
    resultContainer.classList.add("hidden");
  }

  const pResult = document.querySelector("#result");
  pResult.innerText = `You won in ${movements} movements!!`;
}

function validateWinCondition(maze, position) {
  const row = position.row;
  const column = position.column;

  return maze[row][column] === "F";
}

document.addEventListener("keydown", function (event) {
  event.preventDefault();
  const pressedKey = event.key;

  moverJogador(mazeModel, pressedKey);
});

const btnResetGame = document.querySelector("#btn-reset-game");
btnResetGame.addEventListener("click", function (event) {
  currentPosition = initialPosition;

  movements = 0;

  switchResult();

  createMaze(mazeModel, initialPosition);
});

createMaze(mazeModel, currentPosition);
