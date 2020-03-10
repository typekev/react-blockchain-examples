import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import AlertProvider from "./providers/AlertProvider";
import Chain from "./components/Chain";
import Layout from "./components/Layout";
import theme from "./theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AlertProvider>
        <Layout>
          <Chain />
        </Layout>
      </AlertProvider>
    </MuiThemeProvider>
  );
}

export default App;
