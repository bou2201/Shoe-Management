import { createContext, useReducer, useEffect } from "react";

import authReducer from "../reducers/authReducer";
import setAuthToken from "../utils/utils";
import { ACCESS_TOKEN, AUTHENTICATION } from "../constants";
import * as API from "../api";

export const AuthContext = createContext();

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  admin: null,
};

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const authenticate = async () => {
    if (localStorage[ACCESS_TOKEN]) {
      setAuthToken(localStorage[ACCESS_TOKEN]);
    }

    try {
      const res = await API.fetchAdmins();

      if (res.data.success) {
        dispatch({
          type: AUTHENTICATION,
          payload: { isAuthenticated: true, admin: res.data.admin },
        });
      }
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN);
      setAuthToken(null);
      dispatch({
        type: AUTHENTICATION,
        payload: { isAuthenticated: false, admin: null },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  const login = async (loginForm) => {
    try {
      const res = await API.login(loginForm);

      if (res.data.success) {
        localStorage.setItem(ACCESS_TOKEN, res.data.token);
      }

      await authenticate();

      return res.data;
    } catch (error) {
      return { message: "Login failed", error: error };
    }
  };

  const register = async (registerForm) => {
    try {
      const res = await API.register(registerForm);

      return res.data;
    } catch (error) {
      return { message: "Register failed", error: error };
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch({
      type: AUTHENTICATION,
      payload: { isAuthenticated: false, admin: null },
    });
  };

  const authContextData = { login, register, logout, authState };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
