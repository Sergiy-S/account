import React, { useState, useEffect } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "api/firebase";

import HomePage from "pages/HomePage/HomePage";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import Dashboard from "pages/Dashboard/Dashboard";
import ProgressBar from "components/ProgressBar/ProgressBar";

const theme = createMuiTheme();

const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  const [isFetching, setFetchingStatus] = useState(false);

  return (
    firebaseInitialized !== false && (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        {isFetching && <ProgressBar />}

        <Router>
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/login" render={() => <Login setFetchingStatus={setFetchingStatus} />} />
            <Route exact path="/activate" render={() => <Register setFetchingStatus={setFetchingStatus} />} />
            <Route exact path="/dashboard" render={() => <Dashboard />} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  );
};

export default App;
