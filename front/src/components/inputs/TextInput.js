import React from "react";
import styled from "@emotion/styled";

const TextInput = ({ width, height, placeholder, type }) => {
  return (
    <InputText
      type={type}
      width={width}
      height={height}
      placeholder={placeholder}
    />
  );
};

export default TextInput;

const InputText = styled.input`
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "35px"};
  border: 0;
  background: #ffffff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 8px;
`;
