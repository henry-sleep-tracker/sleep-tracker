// const initialState = {
//   currentComments: [],
//  };

 const getCurrentCommentReducer = function (state = [], action) {
 switch (action.type) {
    case "GET_CURRENT_COMMENT":
      return action.payload
    case "DELETE_COMMENT":
      return []
    default:
      return state;
  }
}

export default getCurrentCommentReducer;