import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AuthRoute({ component: Component, ...rest }) {
  const authenticated = useSelector(({ user }) => user.authenticated);
  console.log(authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
}
