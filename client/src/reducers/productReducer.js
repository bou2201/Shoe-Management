// import {
//   LOAD_ERROR,
//   LOAD_SUCCESS,
//   CREATE_PRODUCT,
//   UPDATE_PRODUCT,
//   DELETE_PRODUCT,
//   DETAILS_PRODUCT,
// } from "../constants";

// const productReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case LOAD_ERROR:
//       return {
//         ...state,
//         products: [],
//         isLoading: false,
//       };

//     case LOAD_SUCCESS:
//       return {
//         ...state,
//         products: payload,
//         isLoading: false,
//       };

//     case CREATE_PRODUCT:
//       return {
//         ...state,
//         products: [...state.products, payload],
//       };

//     case DETAILS_PRODUCT:
//       return {
//         ...state,
//         product: payload,
//         isLoading: false,
//       };

//     case UPDATE_PRODUCT:
//       const updatedProduct = state.products.map((product) =>
//         product._id === payload._id ? payload : product
//       );

//       return {
//         ...state,
//         products: updatedProduct,
//       };

//     case DELETE_PRODUCT:
//       return {
//         ...state,
//         products: state.products.filter((product) => product._id !== payload),
//       };

//     default:
//       return state;
//   }
// };

// export default productReducer;
