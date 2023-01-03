
const initialState = {
   user: [],
  };

  const userReducer = function (state = initialState, action) {
    switch (action.type) {
      case "GET_USER":
        return {
          ...state,
          user: action.payload,
        };

    case "CLEAR_USER":
          return {
            ...state,
            user: null,
          }

    default:
        return { ...state };
    }
  };
  
  export default userReducer;