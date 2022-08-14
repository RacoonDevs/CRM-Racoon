import React from "react";
import styled from "@emotion/styled";

const IconButton = ({ text, bgColor, textColor, onClick, size, children }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      name={"send"}
      textColor={textColor}
      bgColor={bgColor}
    >
      <Icon size={size}>{children}</Icon>
      {text ? text : "Button"}
    </Button>
  );
};

export default IconButton;

const Button = styled.button`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#0063C9")};
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  color: ${(props) => (props.textColor ? props.textColor : "#fff")};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  gap: 10px;
  transition: 0.2s ease-in-out;
  &:hover {
    scale: 1.1;
  }
`;

const Icon = styled.span`
  width: ${(props) => (props.size ? props.size : "24px")};
  height: ${(props) => (props.size ? props.size : "24px")};
`;
