import React from "react";
import axios from "axios";
import "../App.css";

class PictureOfTheDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false
    };
  }
  async componentDidMount() {
    const apiKey = "";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    await axios.get(url).then(response => {
      this.setState({
        isLoaded: true,
        data: response.data
      });
    });
  }
  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <div className="POTD">
          <div
            className="card mb-3"
            className="shadow-lg p-3 mb-5 bg-white rounded"
          >
            <h2>Picture Of The Day</h2>
            <img
              src={data.hdurl}
              alt="looking..."
              style={{ width: "40%", height: "20%" }}
            />
            <h3 className="card-title">
              Tilte: <i>{data.title}</i>
            </h3>
            <p className="card-text" style={{ fontSize: "1.3em" }}>
              <strong>Description:</strong> {data.explanation}
            </p>
            <p>Date: {data.date}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PictureOfTheDay;
