import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../AppContext/Context";
import Container from "../../components/containers/Container";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { H2 } from "../../components/Titles";
import { Formik, Form } from "formik";
import { async } from "@firebase/util";
import TextInput from "../../components/inputs/TextInput";
import BasicButton from "../../components/buttons/BasicButton";

const Teams = () => {
  const navigate = useNavigate();
  const { getCreateTeam } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState({ name: "", code: "" });

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const onCreateTeam = async () => {
    console.log("Create team");
  };

  return (
    <Container nameSection={"Mi Team"}>
      <span className="flex justify-center">
        <HashLoader color={"#0063C9"} size={25} loading={isLoading} />
      </span>
      <div>
        <H2 text={"Crear un Team"} />
        <Formik
          initialValues={team}
          enableReinitialize={true}
          onSubmit={async (values) => {
            await onCreateTeam(values);
            setTeam({ name: "", code: "" });
          }}
        >
          {({ handleChange, handleSubmit, values, isSubmiting }) => (
            <Form>
              <div className="border-4 rounded-md border-slate-200 p-5 grid gap-5">
                <TextInput
                  name="name"
                  type={"text"}
                  label={"Nombre del Team"}
                  onChange={handleChange}
                  value={values.name}
                />
                <TextInput
                  name="code"
                  type={"text"}
                  label={"Codigo"}
                  onChange={handleChange}
                  value={values.code}
                />
                <div className="text-center">
                  <BasicButton
                    text={isSubmiting ? "Saving..." : "Guardar cambios"}
                    type="submit"
                    disabled={isSubmiting}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </Container>
  );
};

export default Teams;
