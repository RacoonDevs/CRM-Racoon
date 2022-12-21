import React from "react";
import styled from "@emotion/styled";

const BasicButton = ({ text, bgColor, onClick, type, disabled }) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled}
      name={"send"}
      bgColor={bgColor}
    >
      {text ? text : "Button"}
    </Button>
  );
};

export default BasicButton;

const Button = styled.button`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#0063C9")};
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  transition: 0.2s ease-in-out;
  &:hover {
    scale: 1.1;
  }
`;
