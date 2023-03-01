import React, { createContext, useReducer } from "react";
import axios from "axios";
import {
  API_URL,
  LOAD_ERROR,
  LOAD_SUCCESS,
  CREATE_PRODUCT,
  DETAILS_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../constants";
import productReducer from "../reducers/productReducer";

export const ProductContext = createContext();

const initialState = {
  product: null,
  products: [],
  isLooading: true,
};

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/shoes`);

      if (res.data.success) {
        dispatch({ type: LOAD_SUCCESS, payload: res.data.allShoes });
      }
    } catch (err) {
      dispatch({ type: LOAD_ERROR });
    }
  };

  const detailsProduct = async (productId) => {
    try {
      const res = await axios.get(`${API_URL}/shoes/${productId}`);

      if (res.data.success) {
        dispatch({ type: DETAILS_PRODUCT, payload: res.data.details });
      }
    } catch (err) {
      console.log(err.res.data);
      return err.res.data && { success: false, message: "Server Error" };
    }
  };

  const createProduct = async (newProduct) => {
    try {
      const res = await axios.post(`${API_URL}/shoes/create`, newProduct);

      if (res.data.success) {
        dispatch({ type: CREATE_PRODUCT, payload: res.data.newShoe });
      }
    } catch (err) {
      console.log(err.res.data);
      return err.res.data && { success: false, message: "Server Error" };
    }
  };

  const productContextData = {
    getProducts,
    detailsProduct,
    createProduct,
    productState,
  };

  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
