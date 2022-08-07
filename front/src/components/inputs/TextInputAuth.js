import React from "react";
import styled from "@emotion/styled";
import "./TextInputAuth.css";

const TextInputAuth = ({ bgColor, width, height, type, name, text }) => {
  return (
    <TextInput
      type={type}
      bgColor={bgColor}
      width={width}
      height={height}
      name={name}
      text={text}
    />
  );
};

export default TextInputAuth;

const TextInput = ({ bgColor, width, height, type, name, text }) => {
  const Container = styled.div`
    width: 100%;
    position: relative;
  `;
  const TextInput = styled.input`
    background: ${bgColor ? bgColor : "transparent"};
    border: none;
    border-bottom: solid 2px #fff;
    width: ${width ? width : "100%"};
    height: ${height ? height : "20px"};
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    outline: none;
  `;
  const LabelInput = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
  `;

  return (
    <Container>
      <TextInput type={type} name={name} required />
      <LabelInput>{text}</LabelInput>
    </Container>
  );
};
