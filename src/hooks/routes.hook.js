import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/SIgnup";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/'></Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Redirect to='/login' />
    </Switch>
  );
};
