export default function reducer(state = [], action) {
  switch (action.type) {
    case "GET_BY_DATE":
      console.log("actiontype", action.payload);
      return action.payload;
    default:
      return state;
  }
}
