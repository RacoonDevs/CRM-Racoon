import React from "react";
import styled from "@emotion/styled";

const TextArea = ({ width, height, placeholder, type }) => {
  return (
    <InputText
      type={type}
      width={width}
      height={height}
      placeholder={placeholder}
    />
  );
};

export default TextArea;

const InputText = styled.textarea`
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "125px"};
  border: 0;
  background: #ffffff;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 8px;
`;
