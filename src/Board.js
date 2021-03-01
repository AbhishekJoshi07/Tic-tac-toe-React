import Square from './Square';

function renderSquare(props, i) {
  return (
    <div className="square" onClick={() => props.onClick(i)}>
      <Square
        value={props.squares[i]}
      />
    </div>
  );
}

export default function Board(props) {
  return (
    <div className="game-board">
        {renderSquare(props, 0)}
        {renderSquare(props, 1)}
        {renderSquare(props, 2)}
        {renderSquare(props, 3)}
        {renderSquare(props, 4)}
        {renderSquare(props, 5)}
        {renderSquare(props, 6)}
        {renderSquare(props, 7)}
        {renderSquare(props, 8)}
      </div>
  );
}
