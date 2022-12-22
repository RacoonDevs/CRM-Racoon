import styled from "@emotion/styled";

export const H1 = ({ text, color, size, className }) => {
  const Text = styled.h1`
    color: ${color ? color : "#000"};
    font-size: ${size ? size : "3.5vh"};
    font-weight: bold;
  `;

  return <Text className={`${className}`}>{text}</Text>;
};

export const H2 = ({ text, color, size }) => {
  const Text = styled.h2`
    color: ${color ? color : "#0063C9"};
    font-size: ${size ? size : "3vh"};
    font-weight: bold;
  `;

  return <Text>{text}</Text>;
};

export const H3 = ({ text, color, size }) => {
  const Text = styled.h3`
    color: ${color ? color : "#000"};
    font-size: ${size ? size : "2.5vh"};
    font-weight: bold;
  `;

  return <Text>{text}</Text>;
};

export const H4 = ({ text, color, size }) => {
  const Text = styled.h4`
    color: ${color ? color : "#000"};
    font-size: ${size ? size : "2vh"};
    font-weight: bold;
  `;

  return <Text>{text}</Text>;
};

export const Label = ({ text, color, size }) => {
  const Text = styled.label`
    color: ${color ? color : "#000"};
    font-size: ${size ? size : "1.5vh"};
    font-weight: bold;
  `;

  return <Text>{text}</Text>;
};
