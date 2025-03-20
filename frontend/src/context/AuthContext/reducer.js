export const initialState = {
  isLoggedIn: false,
  username: "",
  email: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        email: action.payload.email,
      };

    case "SIGNUP":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        email: action.payload.email,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        email: "",
      };
    case "UPDATE":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        email: action.payload.email,
      };

    default:
      return state;
  }
};
