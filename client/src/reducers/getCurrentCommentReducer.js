// const initialState = {
//   currentComments: [],
//  };

 const getCurrentCommentReducer = function (state = [], action) {
 switch (action.type) {
    case "GET_CURRENT_COMMENT":
      return action.payload;
    default:
      return state;
  }
}

export default getCurrentCommentReducer;