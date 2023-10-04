import "./board.css";
import { Box } from "./box";
import React from "react";

export const Board = ({ SudokuBoard, props }) => {
  return (
    <div className="board">
      {SudokuBoard.map((value, index) => {
        return (
          <Box
            className="borders"
            value={value}
            index={index}
            setval={props.setval}
            setindex={props.setindex}
          />
        );
      })}
    </div>
  );
};
