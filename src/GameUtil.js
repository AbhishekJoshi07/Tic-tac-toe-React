const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const X = "X";
const O = "O";
const clrTomato = "color-tomato";
const clrLightBlue = "color-light-blue";

function getAvailableIndex(squares, indexes) {
  for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];
    if (!squares[index]) {
      return index;
    }
  }
  return -1;
}

function isValueAtIndexes(squares, value, indexes) {
  let result = true;
  for (const index of indexes) {
    result = result && squares[index] === value;
  }
  return result;
}

export function getGameStatus(winner, isXNext, stepNumber, player1Name, player2Name) {
  if (winner) {
    return (
      <div className={isXNext ? clrLightBlue : clrTomato}>
        {winner} Wins!
      </div>
    );
  } else if (stepNumber < 9) {
    return (
      <div className={isXNext ? clrTomato : clrLightBlue}>
        {isXNext ? player1Name : player2Name} turn
      </div>
    );
  } else {
    return (
      <div>
        <span className={clrTomato}>Match</span>{" "}
        <span className={clrLightBlue}>Draw!!!</span>
      </div>
    );
  }
}

export function calculateWinner(squares, player1Name, player2Name) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] === X ? player1Name : player2Name;
    }
  }
  return null;
}

export function calculateNextMove(squares, stepNumber) {
  let calculatedIndex;

  // check if computer is winning
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      (isValueAtIndexes(squares, O, [a, b]) ||
        isValueAtIndexes(squares, O, [a, c]) ||
        isValueAtIndexes(squares, O, [b, c])) &&
      (!squares[a] || !squares[b] || !squares[c])
    ) {
      return !squares[a] ? a : !squares[b] ? b : c;
    }
  }

  // check if player is winning then block the square
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      (isValueAtIndexes(squares, X, [a, b]) ||
        isValueAtIndexes(squares, X, [a, c]) ||
        isValueAtIndexes(squares, X, [b, c])) &&
      (!squares[a] || !squares[b] || !squares[c])
    ) {
      return !squares[a] ? a : !squares[b] ? b : c;
    }
  }

  // block the center square if available
  if (!squares[4]) {
    return 4;
  }

  // if player blocked the diagonal corners then block his next move
  if (
    squares[4] === O &&
    stepNumber < 5 &&
    (isValueAtIndexes(squares, X, [0, 8]) ||
      isValueAtIndexes(squares, X, [2, 6]))
  ) {
    calculatedIndex = getAvailableIndex(squares, [1, 3, 5, 7]);
    if (calculatedIndex !== -1) {
      return calculatedIndex;
    }
  }

  // block the player's opposit corner if available
  if (squares[4] === O) {
    if (squares[0] === X && !squares[8]) {
      return 8;
    }
    if (squares[8] === X && !squares[0]) {
      return 0;
    }
    if (squares[2] === X && !squares[6]) {
      return 6;
    }
    if (squares[6] === X && !squares[2]) {
      return 2;
    }
  }

  return getAvailableIndex(squares, [0, 2, 6, 8, 1, 3, 5, 7]);
}
