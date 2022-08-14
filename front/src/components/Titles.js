import styled from "@emotion/styled";

export const H1 = ({ text, color, size }) => {
  const Header = styled.h1`
    color: ${color ? color : "#000"};
    font-size: ${size ? size : "3.5vh"};
    font-weight: bold;
    display: inline-block;
  `;

  return <Header>{text}</Header>;
};

export const H2 = ({ text, color, size }) => {
  const Header = styled.h1`
    color: ${color ? color : "#0063C9"};
    font-size: ${size ? size : "3vh"};
    font-weight: bold;
  `;

  return <Header>{text}</Header>;
};

export const H3 = ({ text, color, size }) => {
  const Header = styled.h1`
    color: ${color ? color : "#000"};
    font-size: ${size ? size : "2.5vh"};
    font-weight: bold;
    display: inline-block;
  `;

  return <Header>{text}</Header>;
};

export const H4 = ({ text, color, size }) => {
  const Header = styled.h1`
    color: ${color ? color : "#000"};
    font-size: ${size ? size : "2vh"};
    font-weight: bold;
    display: inline-block;
  `;

  return <Header>{text}</Header>;
};
