// const initialState = {
//   comments: [],
//  };

 const getCommentsReducer = function (state = [], action) {
 switch (action.type) {
    case "GET_COMMENTS":
      return action.payload;
    default:
      return state;
  }
}

export default getCommentsReducer;