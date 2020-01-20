import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setAuthenticated,
  setUnauthenticated
} from "../redux/actions/userActions";
import axios from "axios";
const storageName = "userData";

export const useAuth = () => {
  const dispatch = useDispatch();
  const login = useCallback(jwtToken => {
    if (!localStorage.getItem(storageName)) {
      localStorage.setItem(
        storageName,
        JSON.stringify({
          token: `${jwtToken}`
        })
      );
    }
    dispatch(setAuthenticated());
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    axios.defaults.headers.post["Content-Type"] = "application/json";
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(storageName);
    dispatch(setUnauthenticated());
  }, []);

  return { login, logout };
};
