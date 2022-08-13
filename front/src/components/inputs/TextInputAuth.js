import React from "react";
import styled from "@emotion/styled";
import "./TextInputAuth.css";

const TextInputAuth = ({
  bgColor,
  width,
  height,
  type,
  name,
  text,
  setValue,
  value,
}) => {
  return (
    <Container>
      <TextInput
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={type}
        name={name}
        bgColor={bgColor}
        width={width}
        height={height}
        required
      />
      <LabelInput>{text}</LabelInput>
    </Container>
  );
};
export default TextInputAuth;

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
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 18px;
  color: #fff;
  pointer-events: none;
  transition: 0.3s ease-in-out;
`;
