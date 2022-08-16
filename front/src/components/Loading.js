import { HashLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div
      style={{
        textAling: "center",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <HashLoader color={"#0063C9"} size={100} loading={true} />
    </div>
  );
};
