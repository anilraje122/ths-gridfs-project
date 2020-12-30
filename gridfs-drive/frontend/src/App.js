import React from "react";
import routes from "./routing/routes";
import { useRoutes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const App = () => {
  const routing = useRoutes(routes);
  return <SnackbarProvider>{routing}</SnackbarProvider>;
};

export default App;
