import React from "react";
import Container from "../../components/containers/Container";
import { Label } from "../../components/Titles";

const Tasks = () => {
  return (
    <Container nameSection={"Tareas"}>
      <div className="flex flex-col items-center justify-center w-[100%]">
        <img
          src={require("../../assets/img/working_in_progress.png")}
          width={"350px"}
          alt="working_in_progress"
        />

        <div className="w-80 text-center">
          <Label
            size={"18px"}
            color={"#349EFF"}
            text={"Continuamos trabajando, por ahora ¿podrías pedirme un taxi?"}
          />
        </div>
      </div>
    </Container>
  );
};

export default Tasks;
