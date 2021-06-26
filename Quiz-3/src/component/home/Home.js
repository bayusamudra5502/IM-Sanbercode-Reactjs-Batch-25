import React, { Component } from "react";
import { fetchData } from "../../lib/API";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetchData().then((data) => {
      this.setState({ data });
    });
  }

  render() {
    const dataRender = this.state.data.map((data) => {
      const size =
        data.size >= 1000 ? `${data.size / 1000} GB` : `${data.size} MB`;
      return (
        <div key={data.id} className="app">
          <h2>{data.name}</h2>
          <div className="wrapper">
            <div className="picture">
              <img src={data.image_url} alt={data.name} />
            </div>
            <div className="app-summary">
              <p>Release Year : {data.release_year}</p>
              <p>Price: Rp. {data.price.toLocaleString("id")},-</p>
              <p>Rating : {data.rating}</p>
              <p>Size : {size}</p>
              <div>
                Platform:
                {(data.is_android_app && <span>Android</span>) || null}
                <br />
                {(data.is_ios_app && <span>IOS</span>) || null}
              </div>
            </div>
          </div>
          <p>
            <strong>Description : </strong> {data.description}
          </p>
        </div>
      );
    });
    return (
      <>
        <h1>Popular Mobile Apps</h1>
        {dataRender}
      </>
    );
  }
}

export default Home;
