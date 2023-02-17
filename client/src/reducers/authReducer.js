const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, admin },
  } = action;

  switch (type) {
    case "AUTH":
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
