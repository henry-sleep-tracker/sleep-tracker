
const initialState = {
    users: []
};
  
const usersReducer = function (state = initialState, action){
switch (action.type){
    case 'GET_USERS_RESPONSE':
    return {
        ...state,
        users: action.payload
    }

    default:
    return { ...state };
}
};

export default usersReducer;