import { AUTHENTICATION } from "../constants";

const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, admin },
  } = action;

  switch (type) {
    case AUTHENTICATION:
      return {
        ...state,
        isLoading: false,
        isAuthenticated,
        admin,
      };
    default:
      return state;
  }
};

export default authReducer;
