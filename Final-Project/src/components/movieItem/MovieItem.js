import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchMovie } from "../../lib/MovieAPI";
import Loading from "../Loading";
import { Rate } from "antd";

export default function MovieItem() {
  const { id } = useParams();
  const [data, setData] = useState(undefined);

  useEffect(async () => {
    const fetchtedData = await fetchMovie(id);
    setData(fetchtedData);
  }, []);

  if (data) {
    return (
      <div className="movie-item">
        <div className="jumbotron">
          <img
            src={data.imageURL}
            alt="Movie Jumbotron"
            style={{ bottom: "-50%" }}
          ></img>
          <div className="overlay"></div>
        </div>
        <div className="data">
          <div className="picture">
            <img src={data.imageURL} alt="Nama Felm"></img>
          </div>
          <div className="header-data">
            <h1>{data.title}</h1>
            <p>{data.year}</p>
          </div>
          <div className="body">
            <Rate value={data.rating} disabled />
            <p className="genre">
              <strong>Genre Film : </strong>
              {data.genre}
            </p>
            <div className="item">
              <h2>Sinopsis</h2>
              <p>{data.description}</p>
            </div>
            <div className="item">
              <h2>Review</h2>
              <p>{data.review}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (data === undefined) {
    return (
      <div className="loading-full">
        <Loading></Loading>
      </div>
    );
  } else {
    return null;
  }
}
