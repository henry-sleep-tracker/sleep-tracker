export default function reducer(state = [], action) {
  switch (action.type) {
    case "GET_SLEEP_BY_RANGE":
      return action.payload;
    default:
      return state;
  }
}
