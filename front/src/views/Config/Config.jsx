import React, { useContext } from "react";
import { AccountContext } from "../../AppContext/AppProvider";
import Container from "../../components/containers/Container";
import { listBg } from "../../components/Sidebar/Sidebar";
import { H3 } from "../../components/Titles";

const Config = () => {
  const { setBgSelected } = useContext(AccountContext);

  const setBg = (bg) => {
    localStorage.setItem("bgSelected", JSON.stringify({ bgSelected: bg }));
    setBgSelected({ bgSelected: bg });
  };
  return (
    <Container nameSection={"Configuraciones"}>
      <div className="p-3 border-4 rounded-md border-slate-200">
        <div className="p-3">
          <H3 text={"Seleccionar fondo de pantalla"} color={"#58585f"} />
        </div>
        <div className="w-[100%] h-72 grid grid-cols-5 gap-5 ">
          {listBg.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => setBg(i)}
                style={{
                  backgroundColor: "#081A51",
                  backgroundImage: `url(
                    "${item}"
                  )`,
                  backgroundSize: `${
                    i === 5 || i === 8 || i === 9 ? "contain" : "cover"
                  }`,
                }}
                className={
                  "cursor-pointer hover:scale-110 transition-all ease-in-out"
                }
              ></div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Config;
