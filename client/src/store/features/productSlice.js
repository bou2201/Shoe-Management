import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const initialState = {
  product: null,
  products: [],
  isLoading: true,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.isLoading = true;
    },
    loadingSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    loadingFailure: (state) => {
      state.isLoading = false;
    },
    detailsProduct: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    },
    createProduct: (state, action) => {
      state.products.push(action.payload);
      state.isLoading = false;
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
        state.isLoading = false;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.isLoading = false;
    },
  },
});

export const searchShoes = (params) => async (dispatch) => {
  try {
    const response = await API.fetchShoesBySearch(params);

    if (response.data.success) {
      dispatch(loadingSuccess(response.data.searchResult));
      return response.data.searchResult;
    }
  } catch (error) {
    dispatch(loadingFailure());
  }
};

export const getShoes = () => async (dispatch) => {
  dispatch(loadingRequest());
  try {
    const res = await API.fetchShoes();

    if (res.data.success) {
      dispatch(loadingSuccess(res.data.allShoes));
    }
  } catch (err) {
    dispatch(loadingFailure());
  }
};

export const fetchShoeDetails = (productId) => async (dispatch) => {
  dispatch(loadingRequest());
  try {
    const res = await API.fetchShoe(productId);

    if (res.data.success) {
      dispatch(detailsProduct(res.data.details));
    }
  } catch (err) {
    dispatch(loadingFailure());
  }
};

export const addShoe = (newProduct) => async (dispatch) => {
  dispatch(loadingRequest());
  try {
    const res = await API.createShoe(newProduct);

    if (res.data.success) {
      dispatch(createProduct(res.data.newShoe));
      return res.data;
    }
  } catch (err) {
    console.log(err.response?.data);
    return err.response?.data && { success: false, message: "Server Error" };
  }
};

export const editShoe = (updatedProduct) => async (dispatch) => {
  dispatch(loadingRequest());
  try {
    const res = await API.updateShoe(updatedProduct);

    if (res.data.success) {
      dispatch(updateProduct(res.data.updatedShoe));
      return res.data;
    }
  } catch (err) {
    console.log(err.response?.data);
    return err.response?.data && { success: false, message: "Server Error" };
  }
};

export const removeShoe = (productId) => async (dispatch) => {
  try {
    const response = await API.deleteShoe(productId);

    if (response.data.success) {
      dispatch(deleteProduct(productId));
    }
  } catch (err) {
    console.log(err.response?.data);
    return err.response?.data && { success: false, message: "Server Error" };
  }
};

const { actions, reducer } = productSlice;

export const {
  loadingRequest,
  loadingSuccess,
  loadingFailure,
  createProduct,
  detailsProduct,
  updateProduct,
  deleteProduct,
} = actions;

export default reducer;
