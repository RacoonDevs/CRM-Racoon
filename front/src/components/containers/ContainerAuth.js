import React from "react";
import styled from "@emotion/styled";
import bgLogin from "../../assets/img/bg_login.jpg";

const ContainerAuth = ({ children }) => {
  return <Container children={children} />;
};

export default ContainerAuth;

const Container = ({ children }) => {
  const Cont = styled.div`
    height: 100vh;
    width: 100%;
    background-image: url(${bgLogin});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return <Cont>{children}</Cont>;
};
