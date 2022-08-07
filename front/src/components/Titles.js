import styled from "@emotion/styled";
export const H1 = ({ text, color, size }) => {
  const Header = styled.h1`
    color: ${color ? color : "#000"};
    font-size: ${size ? size : "3.5vh"};
    display: inline-block;
  `;

  return <Header>{text}</Header>;
};
