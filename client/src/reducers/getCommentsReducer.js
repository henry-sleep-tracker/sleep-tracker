const initialState = {
  comments: [],
 };

 const getCommentsReducer = function (state = initialState, action) {
 switch (action.type) {
    case "GET_COMMENTS":
      console.log("reducer", action.payload);
      return action.payload;
    default:
      return state;
  }
}

export default getCommentsReducer;