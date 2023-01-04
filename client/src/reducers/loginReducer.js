export default function reducer(state = {}, action) {
  switch (action.type) {
    case "CREATE_TOKEN":
      console.log("reducer", action.payload);
      return action.payload;
    default:
      return state;
  }
}
