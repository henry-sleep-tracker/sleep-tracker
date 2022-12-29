import {
  GET_COFFEE_SIZES,
  GET_ACTIVITIES,
  GET_DRINKS,
} from "../actions/newRecord";

const initialState = {
  activities: [],
  coffeeSizes: [],
  drinks: [],
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case GET_COFFEE_SIZES:
      return { ...state, coffeeSizes: action.payload };
    case GET_DRINKS:
      return { ...state, drinks: action.payload };
    default:
      return { ...state };
  }
};

export default recordReducer;
