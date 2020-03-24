import React from "react";
import styled from "styled-components";
import { Typography, Toolbar, AppBar, IconButton } from "@material-ui/core";
import GitHub from "@material-ui/icons/GitHub";
import logo from "../images/devoteam-logo-red.png";

const Main = styled.div`
  position: relative;
  min-height: calc(100vh - (9rem));
  padding: 1rem;
  overflow: hidden;

  @media (min-width: 600px) {
    min-height: calc(100vh - (9.75rem));
  }
`;

const Title = styled(Typography)`
  flex-grow: 1;
  padding-left: 1rem;
  padding-top: 0.125rem;
`;

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <a
            href="https://lu.devoteam.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} width="38px" alt="devoteam-logo" />
          </a>
          <Title variant="h5">
            <strong>React Blockchain Examples</strong>
          </Title>
          <IconButton
            href="https://github.com/Devoteam-LU/react-blockchain-examples"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main>{children}</Main>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" color="inherit" align="right" />
          <Typography color="inherit">
            <strong>© typekev </strong>
            {new Date().getFullYear()}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Layout;
