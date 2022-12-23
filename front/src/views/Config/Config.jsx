import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import Context from "../../AppContext/Context";
import Container from "../../components/containers/Container";
import { listBg } from "../../components/Sidebar/Sidebar";
import { H3 } from "../../components/Titles";

const Config = () => {
  const { getUpdateUser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const onChangeBg = async (bg) => {
    const body = { bgSelected: bg };
    const res = await getUpdateUser(body);
    if (res?.error) {
      setIsLoading(false);
      notifyError(
        "Ha ocurrido un error al guardar los cambios. Intente más tarde."
      );
    }
    if (res?.status === 200) {
      setIsLoading(false);
      notify("Los cambios se han guardado con exito.");
    }
    setIsLoading(false);
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
                onClick={() => onChangeBg(i)}
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
      <span className="flex justify-center">
        <HashLoader color={"#0063C9"} size={25} loading={isLoading} />
      </span>
      <Toaster />
    </Container>
  );
};

export default Config;
