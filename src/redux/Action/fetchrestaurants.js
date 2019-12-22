import { FETCHREST, FOUNDREST, ERROR } from "./types";
//import axios to help fetch the data from apis with no errors
import axios from "axios";

//link to fix 'No Access-Control-Allow-Origin' request so the data recieved correctly
const proxyurl = "https://cors-anywhere.herokuapp.com/";

//fetch restaurant function fetch restaurant data from api and sedn it to reducer
export const FetchRest = (lat, long) => {
  return dispatch => {
    //notifying reducer that the action is requesting the api so the the app fires the spinner to the user
    dispatch({ type: FETCHREST });
    axios
      .get(
          proxyurl +
          "http://wainnakel.com/api/v1/GenerateFS.php?uid=" +
          lat +
          "," +
          long +
          "&get_param=" +
          lat +
          "&" +
          long
      )
      .then(res => {
        if (res.error) {
          //notifying the reducer if there sre any errors to do needed respons
          dispatch({ type: ERROR });
        }
        //if data is fetched it sends it to reducer
        dispatch({ type: FOUNDREST, rest: res.data });
      });
  };
};
