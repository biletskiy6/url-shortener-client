import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ component: Component, ...rest }) {
  const authenticated = useSelector(({ user }) => user.authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}
