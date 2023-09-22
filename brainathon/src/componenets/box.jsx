import "./box.css";
import React from "react";
import { useState } from "react";

export const Box = ({ value, index, props }) => {
  const [val, setVal] = useState(null);
  const changed = (event) => {
    setVal(event.target.value);
  };
  return (
    <>
      <input id="box" type="text" placeholder={value} onChange={changed} />
      {props.setval(val)}
      {props.setindex(index)}
    </>
  );
};
