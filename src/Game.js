import React from "react";
import Board from "./Board";
import { calculateWinner, calculateNextMove, getGameStatus } from "./GameUtil";
import "./Game.css";

const O = 'O';
const X = 'X';
const COMPUTER = 'Computer';
const PLAYER1 = 'Player 1';
const PLAYER2 = 'Player 2';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.player1Name = PLAYER1;
    this.player2Name = PLAYER2;
    this.state = {
      squares: Array(9).fill(""),
      player1WinCount: 0,
      player2WinCount: 0,
      stepNumber: 0,
      winner: "",
      isOpponentDecided: false,
      isWithComputer: false,
      isXNext: true,
      isInputLocked: false
    };
  }

  handleClick = (i) => {
    let { stepNumber, isXNext, isInputLocked, isWithComputer, player1WinCount, player2WinCount} = { ...this.state };
    const squares = [...this.state.squares];
    
    if (this.state.winner || squares[i] || (isWithComputer && isInputLocked)) {
      return;
    }

    squares[i] = isXNext ? X : O;
    ++stepNumber;
    const winner = calculateWinner(squares, this.player1Name, this.player2Name);

    if(winner) {
      isXNext ? ++player1WinCount : ++player2WinCount;
    }

    this.setState(
      {
        squares: squares,
        stepNumber: stepNumber,
        winner: winner,
        player1WinCount: player1WinCount,
        player2WinCount: player2WinCount,
        isXNext: !isXNext,
        isInputLocked: true
      },
      () => {
        if (isWithComputer && !winner && stepNumber < 9) {
          setTimeout(this.computerTurn, 750);
        }
      }
    );
  };

  computerTurn = () => {
    let { stepNumber, isXNext, player2WinCount } = { ...this.state };
    const squares = [...this.state.squares];
    ++stepNumber;
    const index = calculateNextMove(squares, stepNumber);
    squares[index] = O;
    const winner = calculateWinner(squares, this.player1Name, this.player2Name);
    
    if(winner) {
      ++player2WinCount;
    }

    this.setState({
      squares: squares,
      stepNumber: stepNumber,
      winner: winner,
      isXNext: !isXNext,
      player2WinCount: player2WinCount,
      isInputLocked: false
    });
  };

  resetGame = () => {
    this.player2Name = PLAYER2;
    this.setState({
      squares: Array(9).fill(""),
      stepNumber: 0,
      player1WinCount: 0,
      player2WinCount: 0,
      winner: "",
      isXNext: true,
      isOpponentDecided: false,
      isInputLocked: false
    });
  };

  restartGame = () => {
    this.setState({
      squares: Array(9).fill(""),
      stepNumber: 0,
      winner: "",
      isXNext: true,
      isInputLocked: false
    });
  };

  decideOpponent = (opponent) => {
    const isWithComputer = opponent === COMPUTER;

    if (isWithComputer) {
      this.player2Name = COMPUTER;
    }

    this.setState({
      isOpponentDecided: true,
      isWithComputer: isWithComputer,
    });
  };

  render() {
    const { squares, winner, stepNumber, isOpponentDecided, isXNext, player1WinCount, player2WinCount } = {
      ...this.state,
    };

    const gameStatus = getGameStatus(winner, isXNext, stepNumber, this.player1Name, this.player2Name);

    return (
      <>
        {isOpponentDecided ? (
          <>
            <div className='flex'>
              <div className='p1'>{this.player1Name} points: {player1WinCount*10}</div>              
              <div className='p2'>{this.player2Name} points: {player2WinCount*10}</div>
            </div>
            
            <div className="game-header">{gameStatus}</div>

            <Board squares={squares} onClick={this.handleClick} />

            <div className="button-container">
              <button className="btn margin-right" onClick={this.restartGame}>
                Restart
              </button>
              <button className="btn" onClick={this.resetGame}>
                Reset
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="game-header">Tic Tac Toe</div>
            <div  className="button-container">
              <button className="btn margin-right" onClick={() => this.decideOpponent(COMPUTER)}>
                1 Player
              </button>
              <button className="btn" onClick={() => this.decideOpponent(PLAYER2)}>
                2 Players
              </button>    
            </div>
          </>
        )}
        <footer>
          {'coded with '}
          <span className="love">&#9829;</span>{' by '}
          <a
            href="https://github.com/AbhishekJoshi07"
            rel="noreferrer"
            target="_blank"
            alt="about Abhishek Joshi"
            title="about Abhishek Joshi">Abhishek Joshi
          </a>
        </footer>
      </>
    );
  }
}

export default Game;
