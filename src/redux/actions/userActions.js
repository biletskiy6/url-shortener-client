import axios from "axios";
import { useHttp } from "../../hooks/http.hook";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED
});
export const setUnauthenticated = () => ({
  type: SET_UNAUTHENTICATED
});

// const setAuthorizationHeader = token => {
//   const token = `Bearer ${token}`;
//   localStorage.setItem("Token", token);
//   axios.defaults.headers.common["Authorization"] = token;
// };
