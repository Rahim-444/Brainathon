import React from "react";
import "./App.css";
import "./componenets/box.css";
import "./componenets/board.css";
import { useState } from "react";
export const App = () => {
    const [SudokuBoard, setSudokuBoard] = useState([
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
    ]);
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
                        console.log(
                            isNumValid(Math.floor(index / 9), index % 9, value, board),
                        );
                        console.log(Math.floor(index / 9), index % 9, value, board);
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
        const board = convert(SudokuBoard);
        solveSudoku(board);
        const updatedBoard = [...SudokuBoard]; // Create a new array
        for (let i = 0; i < SudokuBoard.length; i++) {
            updatedBoard[i] = board[Math.floor(i / 9)][i % 9];
        }
        setSudokuBoard(updatedBoard);
    };

    return (
        <div className="App">
            <h1 id="title">Sudoku</h1>
            <h3 id="subtitle">
                Fill all the Sudoku boxes to win numbers range from (1-9)
            </h3>
            <Board SudokuBoard={SudokuBoard} />
            <button onClick={showsol}>Solve</button>
        </div>
    );
};
export default App;
