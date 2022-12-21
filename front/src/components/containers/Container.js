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
  _needCancel,
  _needSave,
  _onSave,
  _onCancel,
}) => {
  return (
    <>
      <Contenedor width={width} height={height} bgColor={bgColor}>
        <div className="flex justify-between pb-4">
          <Title>{nameSection ? <H2 text={nameSection} /> : ""}</Title>
          {_isHeaderButtons ? (
            <Content>
              {_needCancel && (
                <IconButton
                  bgColor={"#EA5656"}
                  text={"Volver"}
                  onClick={_onCancel}
                >
                  <ArrowBack size={20} />
                </IconButton>
              )}
              {_needSave && (
                <IconButton text={"Guardar"} onClick={_onSave}>
                  <FaSave />
                </IconButton>
              )}
            </Content>
          ) : (
            ""
          )}
        </div>
        {children}
      </Contenedor>
    </>
  );
};

export default Container;

const Contenedor = styled.div`
  width: ${(props) => (props.width ? props.size : "100%")};
  min-height: 70vh;
  height: ${(props) => (props.height ? props.size : "auto")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  box-shadow: 0px 0px 7px 7px rgba(0, 0, 0, 0.1);
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
