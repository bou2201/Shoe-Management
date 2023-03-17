import { createSlice } from "@reduxjs/toolkit";

import setAuthToken from "../../utils/utils";
import { ACCESS_TOKEN } from "../../constants";
import * as API from "../../api";

const initialState = {
  admin: null,
  isLoading: true,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.admin = action.payload.admin;
    },
    authenticateFailed: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      state.isLoading = false;
    },
  },
});

export const authenticate = () => async (dispatch) => {
  if (localStorage[ACCESS_TOKEN]) {
    setAuthToken(localStorage[ACCESS_TOKEN]);
  }

  try {
    const res = await API.fetchAdmins();

    if (res.data.success) {
      dispatch(authenticateSuccess({ admin: res.data.admin }));
    }
  } catch (error) {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthToken(null);
    dispatch(authenticateFailed());
    console.log(error);
  }
};

export const login = (loginForm) => async (dispatch) => {
  try {
    const res = await API.login(loginForm);

    if (res.data.success) {
      localStorage.setItem(ACCESS_TOKEN, res.data.token);
    }
    
    await dispatch(authenticate());
    
    return res.data;
  } catch (error) {
    return { message: "Login failed", error: error };
  }
};

export const register = (registerForm) => async () => {
  try {
    const res = await API.register(registerForm);

    return res.data;
  } catch (error) {
    return { message: "Register failed", error: error };
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem(ACCESS_TOKEN);
  dispatch(authenticateFailed());
};

const { actions, reducer } = authSlice;

export const { authenticateSuccess, authenticateFailed } = actions;

export default reducer;
