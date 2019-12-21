import { FETCHREST, FOUNDREST, ERROR } from "../Action/types";
//initial state works as state for the reducer
//inside restaurant data and fetch boolean and error
const initial = {
  Fetching: false,
  restaurant: {
    error: "",
    name: "",
    id: null,
    link: "",
    cat: "",
    catId: "",
    rating: "",
    lat: "",
    lon: "",
    Ulat: "",
    Ulon: "",
    open: "",
    image: ""
  }
};

export default (state = initial, action) => {
  switch (action.type) {
    //if the action is fetch data reducer change Fetching state to True help fire the spinner
    case FETCHREST:
      return { ...state, Fetching: true };
    //if data is recieved reducer updates the restaurant data and change Fetching state to false to stop the spinner
    case FOUNDREST:
      return { ...state, restaurant: action.rest, Fetching: false };
    //if error accured reducer updates restaurant state that include error object to be used properly
    case ERROR:
      return { ...state, restaurant: action.rest, Fetching: false };
    //when action is calling reducer return the cuurrent state
    default:
      return { ...state };
  }
};
