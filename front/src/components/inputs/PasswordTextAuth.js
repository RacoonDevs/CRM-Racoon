import React from "react";
import styled from "@emotion/styled";
import "./TextInputAuth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordTextAuth = ({
  bgColor,
  width,
  height,
  name,
  text,
  setValue,
  value,
  isVisible,
  setIsVisible,
}) => {
  return (
    <Container>
      <TextInput
        onChange={(e) => setValue(e.target.value)}
        type={isVisible ? "text" : "password"}
        value={value}
        name={name}
        bgColor={bgColor}
        width={width}
        height={height}
        required
      />
      <LabelInput>{text}</LabelInput>
      {!isVisible && (
        <Icon onClick={() => setIsVisible(!isVisible)}>
          <FaEye size={20} fill={"#fff"} />
        </Icon>
      )}
      {isVisible && (
        <Icon onClick={() => setIsVisible(!isVisible)}>
          <FaEyeSlash size={20} fill={"#fff"} />
        </Icon>
      )}
    </Container>
  );
};
export default PasswordTextAuth;

const Container = styled.div`
  width: 100%;
  position: relative;
`;
const TextInput = styled.input`
  background: ${(props) => (props.bgColor ? props.bgColor : "transparent")};
  border: none;
  border-bottom: solid 2px #fff;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "30px")};
  padding: 10px 0;
  font-size: 18px;
  color: #fff;
  margin-bottom: 30px;
  outline: none;
`;
const LabelInput = styled.label`
  position: absolute;
  top: -5px;
  left: 0;
  padding: 10px 0;
  font-size: 18px;
  color: #fff;
  pointer-events: none;
  transition: 0.3s ease-in-out;
`;
const Icon = styled.span`
  min-width: 30px;
  height: 100%;
  fill: #585858;
  position: absolute;
  top: -15px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
