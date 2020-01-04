import React from 'react';

import { Typography, Toolbar, Card, AppBar } from 'material-ui';

import CardExpander from './CardExpander';
import CardContainer from './CardContainer';
import logo from 'images/devoteam-white.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    paddingLeft: '2rem',
  },
};

const Layout = props => {
  const { children, history, openNotif, openDialog, openMenu } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            <a href="https://lu.devoteam.com/" target="_blank">
              <img src={logo} width="38px" />
            </a>
          </Typography>
          <Typography variant="title" color="inherit" style={styles.flex}>
            <strong>Learn Blockchain</strong>
          </Typography>
          <Typography color="inherit">
            <a
              href="https://github.com/Devoteam-LU/learn-blockchain"
              target="_blank"
            >
              <strong>Github</strong>
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContainer>
        <Card>
          <CardExpander>{children}</CardExpander>
        </Card>
      </CardContainer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" style={styles.flex} />
          <Typography color="inherit">
            <strong>© Devoteam </strong>2018
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Layout;
