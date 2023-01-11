import {   GET_RECORDS_USER_DATE,
  GET_RECORDS_RANGE,} from '../actions/records_data'

import {
  //GET_COFFEE_SIZES,
  //GET_ACTIVITIES,
  //GET_DRINKS,
  //GET_LAST_ID_ACTIVITY,
  //GET_LAST_ID_COFFEE_SIZE,
  //GET_LAST_ID_DRINK,
  GET_ACTIVITIES_BY_USER,
  GET_COFFEE_SIZE_BY_USER,
  GET_DRINKS_BY_USER,
  NEW_RECORD,
  STATUS_NEW_RECORD,
  NEW_ACTIVITY,
  ERROR_TRYING_TO_CREATE_ACTIVITY,
  NEW_COFFEE_SIZE,
  ERROR_TRYING_TO_CREATE_COFFEE_SIZE,
  NEW_DRINK,
  ERROR_TRYING_TO_CREATE_DRINK,
  SET_STATUS_NEW_RECORD,
} from "../actions/records";



const initialState = {
  //lastIdActivity: null,
  //lastIdCoffeeSize: null,
  //lastIdDrink: null,
  //lastIdDrink: null,
  //token: null,
  statusNewRecord: null,
  statusNewActivity: null,
  statusNewCoffeeSize: null,
  statusNewDrink: null,
  activities: [],
  coffeeSizes: [],
  drinks: [],
  recordsUser: [],
  recordsRange: [],
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    /* case GET_ACTIVITIES:
      return { ...state, activities: action.payload }; */
    /* case GET_COFFEE_SIZES:
      return { ...state, coffeeSizes: action.payload }; */
    /* case GET_DRINKS:
      return { ...state, drinks: action.payload }; */
    /* case GET_LAST_ID_ACTIVITY:
      return { ...state, lastIdActivity: action.payload }; */
    /* case GET_LAST_ID_COFFEE_SIZE:
      return { ...state, lastIdCoffeeSize: action.payload }; */
    /* case GET_LAST_ID_DRINK:
      return { ...state, lastIdDrink: action.payload }; */
    case GET_ACTIVITIES_BY_USER:
      return { ...state, activities: action.payload };
    case GET_COFFEE_SIZE_BY_USER:
      return { ...state, coffeeSizes: action.payload };
    case GET_DRINKS_BY_USER:
      return { ...state, drinks: action.payload };
    case NEW_RECORD:
      return { ...state };
    case STATUS_NEW_RECORD:
      return { ...state, statusNewRecord: action.payload };
    case NEW_ACTIVITY:
      return { ...state };
    case ERROR_TRYING_TO_CREATE_ACTIVITY:
      return { ...state, statusNewActivity: action.payload };
    case NEW_COFFEE_SIZE:
      return { ...state };
    case ERROR_TRYING_TO_CREATE_COFFEE_SIZE:
      return { ...state, statusNewCoffeeSize: action.payload };
    case NEW_DRINK:
      return { ...state };
    case ERROR_TRYING_TO_CREATE_DRINK:
      return { ...state, statusNewDrink: action.payload };
    case SET_STATUS_NEW_RECORD:
      return { ...state, statusNewRecord: action.payload };
    case GET_RECORDS_USER_DATE:
      return { ...state, recordsUser: action.payload };
    case GET_RECORDS_RANGE:
      return { ...state, recordsRange: action.payload };
    default:
      return { ...state };
  }
};

export default recordReducer;
