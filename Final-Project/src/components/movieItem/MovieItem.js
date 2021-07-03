import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { fetchMovie } from "../../lib/MovieAPI";
import Loading from "../Loading";
import Jumbotron from "../Jumbotron";
import { Rate, notification, Tooltip } from "antd";
import MessageContext from "../context/MessageContext";

export default function MovieItem() {
  const { id } = useParams();
  const [data, setData] = useState(undefined);
  const { message, setMessage } = useContext(MessageContext);

  useEffect(async () => {
    const fetchtedData = await fetchMovie(id);
    setData(fetchtedData);
  }, []);

  useEffect(() => {
    if (message) {
      const { type, ...data } = message;
      notification[type](data);
      setMessage(null);
    }
  }, [message]);

  if (data) {
    document.title = `${data.title} - Movigempedia`;

    return (
      <div className="movie-item">
        <Jumbotron
          alt={`Backdrop film ${data.title}`}
          src={data.imageURL}
          imgStyle={{ bottom: "-50%" }}
        />
        <div className="data">
          <div className="picture">
            <img src={data.imageURL} alt={data.title}></img>
          </div>
          <div className="header-data">
            <h1>{data.title}</h1>
            <p>{data.year}</p>
          </div>
          <div className="body">
            <Tooltip title={`Rating : ${data.rating}`}>
              <Rate value={data.rating / 2} disabled />
              <p> </p>
            </Tooltip>
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
