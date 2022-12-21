export default function reducer(state = {}, action) {
  console.log("reducer", action.payload);
  switch (action.type) {
    case "CREATE_TOKEN":
      return action.payload;
    default:
      return state;
  }
}
