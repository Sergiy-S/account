import React from "react";
import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import firebase from "api/firebase";
import styles from "./DashboardStyles";

const Dashboard = (props) => {
  const { classes } = props;

  if (!firebase.getCurrentUsername()) {
    // not logged in
    props.history.replace("/login");
    return null;
  }

  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Wellcome {firebase.getCurrentUsername()}!
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={logout}
          className={classes.submit}
        >
          Logout
        </Button>
      </Paper>
    </main>
  );
};

export default withRouter(withStyles(styles)(Dashboard));
