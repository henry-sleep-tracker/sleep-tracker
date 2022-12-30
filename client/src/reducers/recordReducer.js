import {
  GET_COFFEE_SIZES,
  GET_ACTIVITIES,
  GET_DRINKS,
  NEW_RECORD,
  ERROR_TRYING_TO_CREATE_RECORD,
  NEW_ACTIVITY,
  ERROR_TRYING_TO_CREATE_ACTIVITY,
  GET_LAST_ID_ACTIVITY,
  NEW_COFFEE_SIZE,
  ERROR_TRYING_TO_CREATE_COFFEE_SIZE,
  GET_LAST_ID_COFFEE_SIZE,
  NEW_DRINK,
  ERROR_TRYING_TO_CREATE_DRINK,
  GET_LAST_ID_DRINK,
} from "../actions/newRecord";

import { CREATE_TOKEN } from "../actions/constants";

const initialState = {
  activities: [],
  coffeeSizes: [],
  drinks: [],
  statusNewRecord: null,
  statusNewActivity: null,
  lastIdActivity: null,
  statusNewCoffeeSize: null,
  lastIdCoffeeSize: null,
  statusNewDrink: null,
  lastIdDrink: null,
  token: null,
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case GET_COFFEE_SIZES:
      return { ...state, coffeeSizes: action.payload };
    case GET_DRINKS:
      return { ...state, drinks: action.payload };
    case NEW_RECORD:
      return { ...state };
    case ERROR_TRYING_TO_CREATE_RECORD:
      return { ...state, statusNewRecord: action.payload };
    case NEW_ACTIVITY:
      return { ...state };
    case ERROR_TRYING_TO_CREATE_ACTIVITY:
      return { ...state, statusNewActivity: action.payload };
    case GET_LAST_ID_ACTIVITY:
      return { ...state, lastIdActivity: action.payload };
    case NEW_COFFEE_SIZE:
      return { ...state };
    case ERROR_TRYING_TO_CREATE_COFFEE_SIZE:
      return { ...state, statusNewCoffeeSize: action.payload };
    case GET_LAST_ID_COFFEE_SIZE:
      return { ...state, lastIdCoffeeSize: action.payload };
    case NEW_DRINK:
      return { ...state };
    case ERROR_TRYING_TO_CREATE_DRINK:
      return { ...state, statusNewDrink: action.payload };
    case GET_LAST_ID_DRINK:
      return { ...state, lastIdDrink: action.payload };
    case CREATE_TOKEN:
      return { ...state, toke: action.payload };
    default:
      return { ...state };
  }
};

export default recordReducer;
