import React from "react";
import styled from "@emotion/styled";
import "./TextInputAuth.css";

const CalendarInput = ({ width, height, label, value, onChange, name }) => {
  return (
    <Container>
      <InputText
        name={name}
        value={value}
        type={"date"}
        width={width}
        height={height}
        onChange={onChange}
        required
      />
      {label ? <Label>{label}</Label> : ""}
    </Container>
  );
};

export default CalendarInput;

const Container = styled.div`
  width: 100%;
  min-height: 70px;
  position: relative;
`;

const InputText = styled.input`
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "70px"};
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
