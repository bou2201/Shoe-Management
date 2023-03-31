import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const initialState = {
  cart: [],
  isLoading: true,
  error: null,
  totalDue: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.isLoading = true;
    },
    getCartSuccess: (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
      state.totalDue = state.cart.reduce(
        (accumulator, item) =>
          accumulator +
          parseFloat(item.price.replace(/[$,]/g, "")) * item.quantity,
        0
      );
    },
    addCartSuccess: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) =>
          item.shoeId === action.payload.shoeId &&
          item.size === action.payload.size
      );
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      state.isLoading = false;
    },
    updateCartSuccess: (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
    },
    removeCartSuccess: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      state.isLoading = false;
    },
    cartFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

// Thunk
export const getCart = (adminId) => async (dispatch) => {
  try {
    const response = await API.fetchCart(adminId);

    if (response.data.success) {
      dispatch(getCartSuccess(response.data.items));
    }
  } catch (error) {
    dispatch(cartFailure(error));
  }
};

export const addToCart = (adminId, payload) => async (dispatch) => {
  dispatch(loadingRequest());
  try {
    const response = await API.addToCart(adminId, payload);

    if (response.data.success) {
      dispatch(addCartSuccess(response.data.cart));
      dispatch(getCart(adminId));
      return response.data;
    }
  } catch (error) {
    dispatch(cartFailure(error));
    console.log(error);
  }
};

export const updateCart = (adminId, payload) => async (dispatch) => {
  dispatch(loadingRequest());
  try {
    const response = await API.updateCart(adminId, payload);

    if (response.data.success) {
      dispatch(updateCartSuccess(response.data.cart));
      dispatch(getCart(adminId));
      return response.data;
    }
  } catch (error) {
    dispatch(cartFailure(error));
    console.log(error);
  }
};

export const removeFromCart = (adminId, id) => async (dispatch) => {
  try {
    const response = await API.removeFromCart(adminId, id);

    if (response.data.success) {
      dispatch(removeCartSuccess(id));
      dispatch(getCart(adminId));
    }
  } catch (error) {
    dispatch(cartFailure(error));
    console.log(error);
  }
};

const { actions, reducer } = cartSlice;

export const {
  loadingRequest,
  getCartSuccess,
  addCartSuccess,
  updateCartSuccess,
  removeCartSuccess,
  cartRequest,
  cartFailure,
} = actions;

export default reducer;
