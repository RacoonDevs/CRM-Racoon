import React from "react";
import styled from "@emotion/styled";
import { FaSave } from "react-icons/fa";
import { H2 } from "../Titles";
import { ArrowBack } from "../../assets/svg/icons";
import IconButton from "../buttons/IconButton";

const Container = ({
  width,
  height,
  bgColor,
  children,
  nameSection,
  _isHeaderButtons,
  _onSave,
  _onCancel,
}) => {
  return (
    <>
      {_isHeaderButtons ? (
        <Content>
          <IconButton bgColor={"#EA5656"} text={"Volver"} onClick={_onCancel}>
            <ArrowBack size={20} />
          </IconButton>
          <IconButton text={"Guardar"} onClick={_onSave}>
            <FaSave />
          </IconButton>
        </Content>
      ) : (
        ""
      )}
      <Contenedor width={width} height={height} bgColor={bgColor}>
        <Title>{nameSection ? <H2 text={nameSection} /> : ""}</Title>
        {children}
      </Contenedor>
    </>
  );
};

export default Container;

const Contenedor = styled.div`
  width: ${(props) => (props.width ? props.size : "100%")};
  height: ${(props) => (props.height ? props.size : "85vh")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 10px 30px 30px;
`;

const Title = styled.div`
  padding: 15px 0;
  width: 50%;
`;
const Content = styled.div`
  padding: 0 0 15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
