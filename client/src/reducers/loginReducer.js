export default function reducer(state = {}, action) {
  switch (action.type) {
    case "CREATE_TOKEN":
      return action.payload;
    default:
      return state;
  }
}
