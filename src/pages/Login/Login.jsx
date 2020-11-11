import React, { useState } from "react";
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Alert } from "@material-ui/lab";
import { Link, withRouter } from "react-router-dom";
import firebase from "api/firebase";
import styles from "./LoginStyles";

const Login = (props) => {
  const { setFetchingStatus, classes } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    setFetchingStatus(true);

    try {
      await firebase.login(email, password);
      props.history.replace("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setFetchingStatus(false);
    }
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className={classes.form} onSubmit={(e) => e.preventDefault() && false}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={login}
            className={classes.submit}
          >
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/activate"
            className={classes.submit}
          >
            Activate Account
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default withRouter(withStyles(styles)(Login));
