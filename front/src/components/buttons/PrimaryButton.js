import React from "react";
import styled from "@emotion/styled";

const PrimaryButton = ({ text, bgColor }) => {
  return <Btn bgColor={bgColor} text={text} />;
};

export default PrimaryButton;

const Btn = ({ bgColor, text }) => {
  const Button = styled.button`
    background-color: ${bgColor ? bgColor : "#0063C9"};
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
  `;

  return (
    <Button type="submit" name={"send"}>
      {text ? text : "Button"}
    </Button>
  );
};
