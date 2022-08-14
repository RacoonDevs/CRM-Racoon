import React from "react";
import styled from "@emotion/styled";
import "./TextInputAuth.css";

const TextInput = ({ width, height, type, label }) => {
  return (
    <Container>
      <InputText type={type} width={width} height={height} required />
      {label ? <Label>{label}</Label> : ""}
    </Container>
  );
};

export default TextInput;

const Container = styled.div`
  width: 100%;
  min-height: 40px;
  position: relative;
`;

const InputText = styled.input`
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "35px"};
  border: 0;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-size: 16px;
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
