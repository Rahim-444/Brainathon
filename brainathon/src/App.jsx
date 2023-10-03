import React from "react";
import "./App.css";
import "./componenets/box.css";
import "./componenets/board.css";
import { useState } from "react";
export const App = () => {
  const boardToSolve = [
    5,
    3,
    null,
    null,
    7,
    null,
    null,
    null,
    null,
    6,
    null,
    null,
    1,
    9,
    5,
    null,
    null,
    null,
    null,
    9,
    8,
    null,
    null,
    null,
    null,
    6,
    null,
    8,
    null,
    null,
    null,
    6,
    null,
    null,
    null,
    3,
    4,
    null,
    null,
    8,
    null,
    3,
    null,
    null,
    1,
    7,
    null,
    null,
    null,
    2,
    null,
    null,
    null,
    6,
    null,
    6,
    null,
    null,
    null,
    null,
    2,
    8,
    null,
    null,
    null,
    null,
    4,
    1,
    9,
    null,
    null,
    5,
    null,
    null,
    null,
    null,
    8,
    null,
    null,
    7,
    9,
  ];
  const [solved, setSolved] = useState(false);
  const [SudokuBoard, setSudokuBoard] = useState(boardToSolve);
  var solveSudoku = function(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === null) {
          for (let k = 1; k <= 9; k++) {
            if (isNumValid(i, j, k, board)) {
              board[i][j] = k;
              if (solveSudoku(board) === true) {
                return true;
              } else {
                board[i][j] = null;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  function isNumValid(row, col, num, board) {
    for (let i = 0; i < 9; i++) {
      if ((board[row][i] === num) & (i !== col)) return false;

      if ((board[i][col] === num) & (i !== row)) return false;

      const currentMatrixRow = Math.floor(row / 3);
      const currentMatrixCol = Math.floor(col / 3);

      const currentRow = 3 * currentMatrixRow + Math.floor(i / 3);
      const currentCol = 3 * currentMatrixCol + (i % 3);

      if (
        board[currentRow][currentCol] === num &&
        currentCol !== col &&
        currentRow !== row
      )
        return false;
    }
    return true;
  }
  let updatedboard = SudokuBoard;
  const Box = ({ value, index }) => {
    const changed = (event) => {
      const updatedBoard = [...updatedboard];
      updatedBoard[event.target.name] = +event.target.value;
      setSudokuBoard(updatedBoard);
    };
    return (
      <>
        <input
          id="box"
          style={(() => {
            const board = convert(SudokuBoard);
            if (value === null) {
              return { background: "white" };
            }
            if (isNumValid(Math.floor(index / 9), index % 9, value, board)) {
              return { background: "#1b6083" };
            } else {
              return { background: "red" };
            }
          })()}
          name={index}
          type="text"
          placeholder={value}
          onChange={changed}
        />
      </>
    );
  };

  const Board = ({ SudokuBoard }) => {
    return (
      //separte to 3x3 boxes
      <div className="board">
        {SudokuBoard.map((value, index) => {
          return <Box key={index} value={value} index={index} />;
        })}
      </div>
    );
  };
  const convert = (SudokuBoard) => {
    let board = Array.from({ length: 9 }, () => Array(9).fill(null));
    for (let i = 0; i < SudokuBoard.length; i++) {
      board[Math.floor(i / 9)][i % 9] = SudokuBoard[i];
    }
    return board;
  };
  const showsol = () => {
    setSolved(true);
    const board = convert(boardToSolve);
    solveSudoku(board);
    const updatedBoard = [...boardToSolve]; // Create a new array
    for (let i = 0; i < SudokuBoard.length; i++) {
      updatedBoard[i] = board[Math.floor(i / 9)][i % 9];
    }
    setSudokuBoard(updatedBoard);
  };
  const clear = () => {
    const updatedBoard = [...boardToSolve];
    setSudokuBoard(updatedBoard);
    setSolved(false);
  };
  const EqualArrays = (SudokuBoard, updatedBoard) => {
    for (let i = 0; i < SudokuBoard.length; i++) {
      if (SudokuBoard[i] !== updatedBoard[i]) {
        return false;
      }
    }
    return true;
  };
  const submit = () => {
    const board = convert(boardToSolve);
    solveSudoku(board);
    const updatedBoard = [...boardToSolve]; // Create a new array
    for (let i = 0; i < SudokuBoard.length; i++) {
      updatedBoard[i] = board[Math.floor(i / 9)][i % 9];
    }

    if (solved === false) {
      if (EqualArrays(SudokuBoard, updatedBoard)) {
        alert("You Won");
      } else {
        alert("You Lost");
      }
    }
  };
  return (
    <div className="App">
      <h1 id="title">Sudoku</h1>
      <h3 id="subtitle">
        Fill all the Sudoku boxes to win numbers range from (1-9)
      </h3>
      <Board SudokuBoard={SudokuBoard} />
      <div className="buttons">
        <button onClick={showsol}>Solve</button>
        <button onClick={clear}>clear</button>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};
export default App;
