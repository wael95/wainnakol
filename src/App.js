import React from "react";
import "./App.css";
import Map from "./Components/Map/MapWrap";
import RestaurantPage from "./Components/Restaurant/RestaurantCard";
import logo from "./logo.svg";

import { Button, Spinner } from "react-bootstrap";
//import connect to help binding the class with redux
import { connect } from "react-redux";
import { FetchRest } from "./redux/Action/fetchrestaurants";
//import connect to help use action as a prop
import { bindActionCreators } from "redux";

//style object for some of the main and map components
const Styles = {
  Main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  Map: {
    width: "99vw",
    height: "99vh",
    marginTop: 1,
    position: "sticky"
  }
};

class App extends React.Component {
  //constructor to define props and initialize states
  constructor(props) {
    super(props);
    //call function position to fetch users location
    this.position();
    //intializing longtitude and latitude states to fetch user location
    this.state = {
      latitude: null,
      longitude: null
    };
  }
  //position uses navigator to fetch users geolocation and assign it to state
  position = async () => {
    navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
      err => console.log(err)
    );
  };

  render() {
    return (
      <div className="content" style={Styles.Main}>
        {/*
          If restaurant exists, the restaurantpage render th restaurant card with all the information.
          All restaurant needed data are sent to restaurant page te be rendered
        */}
        {this.props.restaurant && (
          <RestaurantPage
            lat={this.props.restlat}
            long={this.props.restlong}
            restaurant={this.props.restaurant}
            resCat={this.props.resCat}
            resRate={this.props.resRate}
          />
        )}
        {/*
          google map component wrapper renders the restaurant location when it recives it 
          where marker is hidden in the first page where there is no restaunt to be show
          restaurant longtitude and latitude are send to map component to be used
        */}
        <div style={Styles.Map}>
          <Map
            isMarkerShown={this.props.restaurant ? true : false}
            lat={this.props.restlat}
            long={this.props.restlong}
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBGiojfyxQ47HPb7zLnyflgatBbFxu0maQ"
            }
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          ></Map>
        </div>
        {/*
          the button div is responsible of the button and the logo
          the logo is disabled when the App fecth a restaurant 
          the color of the button changes depends on the page
        */}
        <div
          className="fixed-bottom"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: this.props.restaurant ? "10vh" : "30vh"
          }}
        >
          {/*
              if restaurant fetched the logo component disables
        */}
          {!this.props.restaurant && (
            <img style={{ marginBottom: "30px" }} src={logo} />
          )}
          {/*
              if button clicked it calls fetch action and sends users coordents as a parameters
        */}
          <Button
            style={{
              width: "40vw",
              backgroundColor: this.props.restaurant ? "#ffffff" : "#269397"
            }}
            variant={this.props.restaurant ? "light" : "success"}
            size="lg"
            onClick={() =>
              this.props.fetch(this.state.latitude, this.state.longitude)
            }
          >
            {/*
              the button content change depending on the page 
              spinner works when fetching the restaurant
            */}
            {this.props.isfetching ? (
              <Spinner animation="border" role="status"></Spinner>
            ) : this.props.restaurant ? (
              "اقتراح آخر"
            ) : (
              "اقترح"
            )}
          </Button>
        </div>
      </div>
    );
  }
}
/* function used to turn state from reducer to props so it can be used in the page */
const mapstatetoprops = state => {
  return {
    restaurant: state.restaurant.name,
    isfetching: state.Fetching,
    restlat: state.restaurant.lat,
    restlong: state.restaurant.lon,
    restID: state.restaurant.id,
    resRate: state.restaurant.rating,
    resCat: state.restaurant.cat
  };
};
/* function helps binding the actions to be used in the page */
const matchDispatchToProps = dispatch => {
  return bindActionCreators({ fetch: FetchRest }, dispatch);
};
/* connect is to wrap the page in the redux store */
export default connect(mapstatetoprops, matchDispatchToProps)(App);
