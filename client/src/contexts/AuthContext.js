import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import authReducer from "../reducers/authReducer";
import { API_URL, ACCESS_TOKEN } from "../constants";
import setAuthToken from "../utils/utils";

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
      const res = await axios.get(`${API_URL}/admin`);

      if (res.data.success) {
        dispatch({
          type: "AUTH",
          payload: { isAuthenticated: true, admin: res.data.admin },
        });
      }
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN);
      setAuthToken(null);
      dispatch({
        type: "AUTH",
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
      const res = await axios.post(`${API_URL}/admin/login`, loginForm);

      if (res.data.success) {
        localStorage.setItem(ACCESS_TOKEN, res.data.token);
      }

      await authenticate();

      return res.data;
    } catch (error) {
      return { message: "Login failed", error: error };
    }
  };

  const authContextData = { login, authState };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
