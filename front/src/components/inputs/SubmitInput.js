import React from "react";
import styled from "@emotion/styled";

const SubmitInput = ({ value, bgColor }) => {
  return <Btn bgColor={bgColor} value={value} />;
};

export default SubmitInput;

const Btn = ({ bgColor, value }) => {
  const Button = styled.input`
    background-color: ${bgColor ? bgColor : "#0063C9"};
    cursor: pointer;
    border: none;
    padding: 7px 20px;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
  `;

  return <Button type="submit" name={"send"} value={value} />;
};
