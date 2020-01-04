import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevoteamTheme from 'static/Theme';

import Layout from 'components/Layout';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default function App() {
  return (
    <MuiThemeProvider theme={DevoteamTheme}>
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </div>
    </MuiThemeProvider>
  );
}
