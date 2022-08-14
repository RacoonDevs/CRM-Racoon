import React from "react";
import styled from "@emotion/styled";
import { H2 } from "../Titles";

const Container = ({ width, height, bgColor, children, nameSection }) => {
  return (
    <Contenedor width={width} height={height} bgColor={bgColor}>
      {nameSection ? <H2 text={nameSection} /> : ""}
      {children}
    </Contenedor>
  );
};

export default Container;

const Contenedor = styled.div`
  width: ${(props) => (props.width ? props.size : "100%")};
  height: ${(props) => (props.height ? props.size : "80vh")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 10px 20px;
`;
