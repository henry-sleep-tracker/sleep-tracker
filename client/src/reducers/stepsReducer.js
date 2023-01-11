export default function reducer(state = [], action) {
  switch (action.type) {
    case "GET_STEPS":
      return action.payload;
    default:
      return state;
  }
}
