import React from "react";
import { AppProvider } from "./AppContext/AppProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
