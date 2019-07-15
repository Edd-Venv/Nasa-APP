import React from "react";
import axios from "axios";
import "../App.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchData: [],
      value: [],
      isLoaded: false,
      page: [],
      CloseApproachData: [],
      MissDistance: [],
      OrbitalData: [],
      Links: []
    };
  }

  handleChangeSD = event => {
    //console.log(this.state.value);
    this.setState({ value: event.target.value });
  };

  handleSubmitSD = event => {
    event.preventDefault();
    //console.log("Clicked");
    const SearchData = this.state;
    const apiKey = "Hhm2bGSOeSRe71a5fmFvpPJ2RUkoDtxjjZKICZCt";
    const urlSD = `https://www.neowsapp.com/rest/v1/neo/browse?page=${
      this.state.value
    }&size=20&api_key=${apiKey}`;
    axios.get(urlSD).then(response => {
      //const date = [this.state.value];
      //console.log(response.data.links);
      //console.log(date);
      this.setState({
        SearchData: response.data.near_earth_objects[0],
        isLoaded: true,
        page: response.data.page,
        CloseApproachData:
          response.data.near_earth_objects[0].close_approach_data[0],
        MissDistance:
          response.data.near_earth_objects[0].close_approach_data[0]
            .miss_distance,
        OrbitalData: response.data.near_earth_objects[0].orbital_data,
        Links: response.data.links
      });
    });
  };

  handlePrevClick = event => {
    const urlPREV = `${this.state.Links.prev}`;
    axios.get(urlPREV).then(response => {
      this.setState({
        isLoaded: true,
        SearchData: response.data.near_earth_objects[0],
        page: response.data.page,
        CloseApproachData:
          response.data.near_earth_objects[0].close_approach_data[0],
        MissDistance:
          response.data.near_earth_objects[0].close_approach_data[0]
            .miss_distance,
        OrbitalData: response.data.near_earth_objects[0].orbital_data,
        Links: response.data.links
      });
    });
  };

  handleNextClick = event => {
    console.log("right Clicked");
    const urlNEXT = `${this.state.Links.next}`;
    axios.get(urlNEXT).then(response => {
      this.setState({
        isLoaded: true,
        SearchData: response.data.near_earth_objects[0],
        page: response.data.page,
        CloseApproachData:
          response.data.near_earth_objects[0].close_approach_data[0],
        MissDistance:
          response.data.near_earth_objects[0].close_approach_data[0]
            .miss_distance,
        OrbitalData: response.data.near_earth_objects[0].orbital_data,
        Links: response.data.links
      });
    });
  };

  /*
  <br />
  Relative Velocity: {SearchData.kilometers_per_second} (km/s)
  <br />*/

  render() {
    const {
      SearchData,
      isLoaded,
      page,
      CloseApproachData,
      MissDistance,
      OrbitalData
    } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmitSD}>
          <div style={{ marginLeft: "83%", marginTop: "2%" }}>
            <span className="form-inline">
              <input
                id="DateHelpBlock"
                placeholder="Page Number"
                className="form-control"
                type="text/number"
                value={this.state.value}
                onChange={this.handleChangeSD}
              />
              <button class="btn btn-dark" type="submit">
                <i class="fas fa-search" />
              </button>
            </span>
            <small
              id="DateHelpBlock"
              className="form-text text-muted"
              style={{ marginRight: "13%" }}
            >
              Search Near Field Earth Collisions From 1 To 1060 Pages
            </small>
          </div>
        </form>
        {this.state.isLoaded === false ? null : (
          <div className="row-md-4 offset-md-4" className="flex-container">
            <span
              className="card mb-3"
              className="shadow-lg p-3 mb-5 bg-white rounded"
              style={{ width: "70%" }}
            >
              <div style={{ paddingLeft: "30%" }}>
                <h1> Near Field Earth Collision</h1>
                <br />
                <p style={{ fontSize: "1.2em" }}>
                  <strong>Name : </strong>
                  {SearchData.designation}
                  <br />
                  <strong>Close Approach Date :</strong>{" "}
                  {CloseApproachData.close_approach_date_full} Hrs
                  <br />
                  <strong>Miss Distance :</strong> {MissDistance.kilometers} km
                  <br />
                  <strong>First Observation Date :</strong>{" "}
                  {OrbitalData.first_observation_date}
                  <br />
                  <strong>Last Observation Date :</strong>{" "}
                  {OrbitalData.last_observation_date}
                  <br />
                  <strong>Potentially Hazardous Asteroid :</strong>
                  {SearchData.is_potentially_hazardous_asteroid}
                </p>
                <p>
                  <strong>Page :</strong> {page.number}
                </p>
                <nav>
                  <ul class="pagination">
                    <button onClick={this.handlePrevClick} class="button">
                      Prev
                    </button>
                    <li
                      class="page-item"
                      style={{
                        paddingRight: "7px",
                        paddingLeft: "7px",
                        fontSize: "1.3em"
                      }}
                    >
                      {" "}
                      {page.number}{" "}
                    </li>

                    <li class="page-item">
                      <button onClick={this.handleNextClick} class="button">
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
