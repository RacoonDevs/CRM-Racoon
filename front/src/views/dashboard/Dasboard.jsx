import React from "react";
import { ArrowBack } from "../../assets/svg/icons";
import { FaStar, FaSave } from "react-icons/fa";
import IconButton from "../../components/buttons/IconButton";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
import TextArea from "../../components/inputs/TextArea";

const Dashboard = () => {
  return (
    <Container nameSection={"Dashboard"}>
      <div className="flex gap-5">
        <div className="pt-5 flex flex-col gap-y-5 w-1/2">
          <TextInput placeholder={"Input 1"} label={"Nombre"} />
          <TextInput placeholder={"Input 2"} label="Apellido" />
          <TextInput placeholder={"Input 3"} label="Correo electronico" />
          <TextInput placeholder={"Input 4"} label="Telefono" />
          <TextInput placeholder={"Input 5"} label="Domicilio" />
        </div>
        <div className=" w-1/2">
          <TextArea label={"Comentarios"} />
        </div>
      </div>
      <div className="flex justify-center gap-10 m-10">
        <IconButton text={"GO BACK"} size={24} bgColor={"#58585F"}>
          <ArrowBack size={24} />
        </IconButton>
        <IconButton text={"SAVE"} size={24}>
          <FaSave size={20} />
        </IconButton>
        <IconButton text={"BUTTON STAR"} size={24} bgColor={"#37CAE6"}>
          <FaStar size={20} fill={"#FAFF00"} />
        </IconButton>
      </div>
    </Container>
  );
};

export default Dashboard;
