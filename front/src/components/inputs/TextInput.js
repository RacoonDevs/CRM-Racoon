import React from "react";
import styled from "@emotion/styled";

const TextInput = ({ bgColor, width, height, placeholder, type }) => {
  return (
    <InputText
      type={type}
      bgColor={bgColor}
      width={width}
      height={height}
      placeholder={placeholder}
    />
  );
};

export default TextInput;

const InputText = ({ bgColor, width, height, placeholder, type }) => {
  const InputText = styled.input`
    background: ${bgColor ? bgColor : "#fff"};
    border: 0;
    border-radius: 10px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    width: ${width ? width : "90%"};
    height: ${height ? height : "20px"};
    padding: 8px;
  `;

  return <InputText placeholder={placeholder} type={type} />;
};
