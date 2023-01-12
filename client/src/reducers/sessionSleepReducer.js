export default function reducer(state = [], action) {
  switch (action.type) {
    case "GET_SLEEP_SESSION":
      return action.payload;
    default:
      return state;
  }
}
