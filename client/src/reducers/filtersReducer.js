import {
    GET_F_NATION,
    GET_F_ADMIN,
    GET_F_NAT_ADMIN,
    GET_F_PLAN,
    GET_F_PLAN_ADMIN,
    GET_F_PLAN_NAT,
    GET_F_PLAN_NAT_ADMIN
} from "../actions/filters"


const initialState = {
    filters : []
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_F_NATION:
      return {
        filters: action.payload,
      };
    case GET_F_ADMIN:
      return {
        filters: action.payload,
      };
      case GET_F_NAT_ADMIN:
        return {
          filters: action.payload,
        }; case GET_F_PLAN:
        return {
          filters: action.payload,
        }; case GET_F_PLAN_ADMIN:
        return {
          filters: action.payload,
        }; case GET_F_PLAN_NAT:
        return {
          filters: action.payload,
        }; case GET_F_PLAN_NAT_ADMIN:
        return {
          filters: action.payload,
        };

    default:
      return state;
  }
};

export default filterReducer;