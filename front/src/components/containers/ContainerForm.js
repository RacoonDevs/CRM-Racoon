import React from "react";
import styled from "@emotion/styled";

const ContainerForm = ({ children }) => {
  return <Form>{children}</Form>;
};

export default ContainerForm;

const Form = styled.div`
  max-width: 500px;
  min-width: 300px;
  width: 50%;
  padding: 50px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media (max-width: 720px) {
    min-width: 85%;
    padding: 30px;
  }
`;
