export default function reducer(state = [], action) {
  switch (action.type) {
    case "GET_SLEEP_STAGE":
      return action.payload;
    default:
      return state;
  }
}
