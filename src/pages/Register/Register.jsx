import React, { useState } from "react";
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Alert } from "@material-ui/lab";
import { Link, withRouter } from "react-router-dom";
import firebase from "api/firebase";
import styles from "./RegisterStyles";

const Register = (props) => {
  const { setFetchingStatus, classes } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onRegister() {
    setFetchingStatus(true);

    try {
      await firebase.register(name, email, password);
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
          Activate Account
        </Typography>

        <form className={classes.form} onSubmit={(e) => e.preventDefault() && false}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
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
            onClick={onRegister}
            className={classes.submit}
          >
            Activate Account
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            className={classes.submit}
          >
            Go back to Login
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default withRouter(withStyles(styles)(Register));
