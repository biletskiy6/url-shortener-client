import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MUILink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import bg2 from "../assets/bg2.jpg";
import { ToastContainer } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useHttp } from "../hooks/http.hook";
import { useAuth } from "../hooks/auth.hook";
import { useMessage } from "../hooks/message.hook";

import "react-toastify/dist/ReactToastify.css";
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <MUILink color='inherit' href='https://material-ui.com/'>
        Your Website
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${bg2})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Signup() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });
  const http = useHttp();
  const auth = useAuth();
  const message = useMessage();
  const history = useHistory();

  useEffect(() => {
    if (http.error) {
      message(http.error, "error");
      http.clearError();
    }
  }, [http.error]);
  const onSubmit = async data => {
    try {
      const response = await http.request("/auth/register", "POST", data);
      const { token } = response.data;
      if (token) auth.login(token);
      message("User was successfully created ", "success");
    } catch (error) {}
  };
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <ToastContainer />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              error={!!errors.email}
              helperText={errors.email ? "Email format is not correct" : null}
              inputRef={register({ required: true, pattern: emailPattern })}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              error={!!errors.password}
              helperText={errors.password ? "Min password length is 6" : null}
              inputRef={register({ required: true, minLength: 6 })}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={http.loading}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <MUILink href='#' variant='body2'>
                  Forgot password?
                </MUILink>
              </Grid>
              <Grid item>
                <MUILink component={Link} to='/login' variant='body2'>
                  {"Already have an account? Sign In"}
                </MUILink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
