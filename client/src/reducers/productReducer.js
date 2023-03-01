import {
  LOAD_ERROR,
  LOAD_SUCCESS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DETAILS_PRODUCT,
} from "../constants";

const productReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ERROR:
      return {
        ...state,
        products: [],
        isLoading: false,
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };

    case DETAILS_PRODUCT:
      return {
        ...state,
        product: payload,
        isLoading: false,
        // products: state.products.filter(product => product._id !== payload)
      };

    case UPDATE_PRODUCT:
      return {};

    case DELETE_PRODUCT:
      return {};

    default:
      return state;
  }
};

export default productReducer;
