import React from "react";
import styled from "@emotion/styled";
import "./TextInputAuth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  width,
  height,
  label,
  value,
  onChange,
  isVisible,
  setIsVisible,
  name,
}) => {
  return (
    <Container>
      <InputText
        name={name}
        value={value}
        type={isVisible ? "text" : "password"}
        width={width}
        height={height}
        onChange={onChange}
        required
      />
      {label ? <Label>{label}</Label> : ""}
      {!isVisible && (
        <Icon onClick={() => setIsVisible(!isVisible)}>
          <FaEye size={20} />
        </Icon>
      )}
      {isVisible && (
        <Icon onClick={() => setIsVisible(!isVisible)}>
          <FaEyeSlash size={20} />
        </Icon>
      )}
    </Container>
  );
};

export default PasswordInput;

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
const Icon = styled.span`
  min-width: 30px;
  height: 100%;
  fill: #585858;
  position: absolute;
  top: -5px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
