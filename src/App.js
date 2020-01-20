import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SIgnup";
import AuthRoute from "./utils/AuthRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuth } from "./hooks/auth.hook";
import LinkDetails from "./pages/LinkDetails";
import Navbar from "./components/Navbar";
function App() {
  const auth = useAuth();
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    const decodedToken = jwtDecode(userData.token);
    if (decodedToken.exp * 1000 < Date.now()) {
      auth.logout();
    } else {
      auth.login(userData.token);
    }
  }
  return (
    <Switch>
      <AuthRoute exact path='/login' component={Login} />
      <AuthRoute exact path='/signup' component={Signup} />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute path='/link/:id' component={LinkDetails} />
    </Switch>
  );
}

export default App;
