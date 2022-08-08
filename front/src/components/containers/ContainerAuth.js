import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import bg_1 from "../../assets/img/bg_1.jpg";
import bg_2 from "../../assets/img/bg_2.jpg";
import bg_3 from "../../assets/img/bg_3.jpg";
import bg_4 from "../../assets/img/bg_4.jpg";
import bg_5 from "../../assets/img/bg_5.jpg";

const bgLogin = [bg_1, bg_2, bg_3, bg_4, bg_5];

const ContainerAuth = ({ children }) => {
  const [img, setImg] = useState(0);
  useEffect(() => {
    const number = Math.floor(Math.random() * (5 - 0));
    setImg(number);
  }, []);

  return <Cont bgLogin={bgLogin[img]}>{children}</Cont>;
};

export default ContainerAuth;

const Cont = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url(${(props) => props.bgLogin});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
