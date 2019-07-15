import React from "react";
import axios from "axios";
import "./App.css";
import PictureOfTheDay from "./components/PictureOfTheDay.js";
import MySlider from "./components/MySlider.js";
import Search from "./components/Search.js";
import Footer from "./components/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      SerachData: []
    };
  }
  async componentDidMount() {
    const apiKey = "Hhm2bGSOeSRe71a5fmFvpPJ2RUkoDtxjjZKICZCt";
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

    await axios
      .get(url, {
        params: { maxResults: 3 }
      })
      .then(response => {
        this.setState({
          isLoaded: true,
          data: response.data.photos.slice(0, 3)
        });
      });
  }
  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <div>
          {!this.state.isLoaded ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status" />
            </div>
          ) : (
            <React.Fragment>
              <Search />
              <PictureOfTheDay />
              <div className="row-md-4 offset-md-4" className="flex-container">
                {data.map(info => {
                  return (
                    <div
                      className="card mb-3"
                      className="shadow-lg p-3 mb-5 bg-white rounded"
                      key={info.id}
                    >
                      <img
                        src={info.img_src}
                        alt="Loading..."
                        class="card-img-top"
                        style={{ width: "100%" }}
                      />
                    </div>
                  );
                })}
              </div>
              <Footer />
              <MySlider />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default App;
