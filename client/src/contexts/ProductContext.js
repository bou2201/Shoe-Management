// import React, { createContext, useReducer } from "react";
// import * as API from "../api";
// import {
//   LOAD_ERROR,
//   LOAD_SUCCESS,
//   CREATE_PRODUCT,
//   DETAILS_PRODUCT,
//   UPDATE_PRODUCT,
//   DELETE_PRODUCT,
// } from "../constants";
// import productReducer from "../reducers/productReducer";

// export const ProductContext = createContext();

// const initialState = {
//   product: null,
//   products: [],
//   isLoading: true,
// };

// const ProductContextProvider = ({ children }) => {
//   const [productState, dispatch] = useReducer(productReducer, initialState);

//   const getProducts = async () => {
//     try {
//       const res = await API.fetchShoes();

//       if (res.data.success) {
//         dispatch({ type: LOAD_SUCCESS, payload: res.data.allShoes });
//       }
//     } catch (err) {
//       dispatch({ type: LOAD_ERROR });
//     }
//   };

//   const searchProducts = async (query) => {
//     try {
//       const res = await API.fetchShoesBySearch(query);
      
//       if (res.data.success) {
//         dispatch({ type: LOAD_SUCCESS, payload: res.data.searchResult });
//         return res.data.searchResult;
//       }
//     } catch (error) {
//       dispatch({ type: LOAD_ERROR });
//     }
//   };

//   const detailsProduct = async (productId) => {
//     try {
//       const res = await API.fetchShoe(productId);

//       if (res.data.success) {
//         dispatch({ type: DETAILS_PRODUCT, payload: res.data.details });
//       }
//     } catch (err) {
//       console.log(err.response?.data);
//       return err.response?.data && { success: false, message: "Server Error" };
//     }
//   };

//   const createProduct = async (newProduct) => {
//     try {
//       const res = await API.createShoe(newProduct);

//       if (res.data.success) {
//         dispatch({ type: CREATE_PRODUCT, payload: res.data.newShoe });
//         return res.data;
//       }
//     } catch (err) {
//       console.log(err.response?.data);
//       return err.response?.data && { success: false, message: "Server Error" };
//     }
//   };

//   const updateProduct = async (updatedProduct) => {
//     try {
//       const res = await API.updateShoe(updatedProduct);

//       if (res.data.success) {
//         dispatch({ type: UPDATE_PRODUCT, payload: res.data.updatedShoe });
//         return res.data;
//       }
//     } catch (err) {
//       console.log(err.response?.data);
//       return err.response?.data && { success: false, message: "Server Error" };
//     }
//   };

//   const deleteProduct = async (productId) => {
//     try {
//       const res = await API.deleteShoe(productId);

//       if (res.data.success) {
//         dispatch({ type: DELETE_PRODUCT, payload: productId });
//       }
//     } catch (err) {
//       console.log(err.response?.data);
//       return err.response?.data && { success: false, message: "Server Error" };
//     }
//   };

//   const productContextData = {
//     getProducts,
//     searchProducts,
//     detailsProduct,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     productState,
//   };

//   return (
//     <ProductContext.Provider value={productContextData}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductContextProvider;
