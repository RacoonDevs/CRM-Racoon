import React from "react";
import styled from "@emotion/styled";

const TextArea = ({ width, height, label, type, value, onChange }) => {
  return (
    <Container>
      <InputText
        type={type}
        width={width}
        height={height}
        value={value}
        onChange={onChange}
        required
      ></InputText>
      {label ? <Label>{label}</Label> : ""}
    </Container>
  );
};

export default TextArea;

const Container = styled.div`
  width: 100%;
  min-height: 40px;
  position: relative;
`;
const InputText = styled.textarea`
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "125px"};
  border: 0;
  background: #ffffff;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 8px;
`;
const Label = styled.label`
  color: #58585f;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  top: -5px;
  left: 0;
  padding: 10px 0 10px 10px;
  pointer-events: none;
  transition: 0.3s ease-in-out;
`;
