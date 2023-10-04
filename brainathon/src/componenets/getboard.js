const reverseConvert = (board) => {
  let SudokuBoard = Array.from({ length: 81 }, () => null);
  for (let i = 0; i < SudokuBoard.length; i++) {
    SudokuBoard[i] = board[Math.floor(i / 9)][i % 9];
    if (SudokuBoard[i] === 0) SudokuBoard[i] = null;
  }
  return SudokuBoard;
};
export const getBoard = async () => {
  const url =
    "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}";

  const response = await fetch(url);
  const data = await response.json();

  const board = data.newboard.grids[0].value;
  return reverseConvert(board);
};
