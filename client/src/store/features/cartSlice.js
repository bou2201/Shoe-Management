import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const initialState = {
  cart: [],
  isLoading: true,
  error: null,
  totalDue: 0,
};

const priceNumber = (price) => parseFloat(price.replace(/[$,]/g, ""));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartSuccess: (state, action) => {
      state.cart = action.payload.cart;
      state.isLoading = false;
      state.totalDue = state.cart.reduce(
        (accumulator, item) =>
          accumulator + priceNumber(item.price) * item.quantity,
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

export const getCart = (adminId) => async (dispatch) => {
  try {
    const response = await API.fetchCart(adminId);

    if (response.data.success) {
      dispatch(getCartSuccess({ cart: response.data.items }));
    }
  } catch (error) {
    dispatch(cartFailure(error));
    console.log(error);
  }
};

export const addToCart = (adminId, payload) => async (dispatch) => {
  try {
    const response = await API.addToCart(adminId, payload);

    if (response.data.success) {
      dispatch(addCartSuccess(response.data.cart));
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
    }
  } catch (error) {
    dispatch(cartFailure(error));
    console.log(error);
  }
};

const { actions, reducer } = cartSlice;

export const {
  getCartSuccess,
  addCartSuccess,
  removeCartSuccess,
  cartRequest,
  cartFailure,
} = actions;

export default reducer;
