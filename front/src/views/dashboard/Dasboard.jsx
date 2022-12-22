import React, { useEffect, useState } from "react";
import Container from "../../components/containers/Container";
import Moon from "../../assets/img/moonlight.png";
import Astronaut from "../../assets/img/astronaut_moon.png";
import Building from "../../assets/img/under_construction.png";
import { H1, H4 } from "../../components/Titles";

const randomImg = [Moon, Astronaut, Building];
const phrases = [
  {
    title: "¡Ya casi esta listo!",
    description:
      "Seguimos trabajando para brindarte una herramienta de calidad. Muy pronto podras disfrutar de este CRM en toda su totalidad y además... ¡Gratis!",
  },
  {
    title: "No nos falta mucho",
    description:
      "No te desesperes y aguanta un poco más. Trabajamos dia y noche. Pronto estaremos al 100% preparados para brindarte el mejor servicio.",
  },
  {
    title: "¡Vuelve pronto!",
    description:
      "No te quedes fuera de poder disfrutar de esta herramienta digital con todas sus caracteristicas completas ¡Completamente Gratis!",
  },
];

const Dashboard = () => {
  const [numImagen, setNumImagen] = useState(0);
  const [numPhrase, setNumPhrase] = useState(0);

  useEffect(() => {
    const img = Math.floor(Math.random() * (3 - 0));
    const phrase = Math.floor(Math.random() * (3 - 0));
    setNumImagen(img);
    setNumPhrase(phrase);
  }, []);

  return (
    <Container nameSection={"Dashboard"}>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-3 text-center justify-center items-center md:w-1/2">
          <H1 text={phrases[numPhrase].title} color={"#0063c9"} />
          <H4 text={phrases[numPhrase].description} />
          <img
            className="w-fit md:max-w-lg"
            src={randomImg[numImagen]}
            alt="img_dashboard"
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
