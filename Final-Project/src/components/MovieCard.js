import React, { useState, useEffect } from "react";
import { Card, Skeleton, Rate, Tooltip } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function MovieCard({ data }) {
  const [load, changeLoad] = useState(true);
  const [dataState, changeData] = useState({
    title: "",
    duration: 0,
    description: "",
    imageURL: "...",
    rating: 0,
    year: 0,
  });
  const [cover, setCover] = useState({});

  useEffect(() => {
    if (data) {
      changeLoad(false);
      const { id, title, description, imageURL, rating, year } = data;
      const deskripsi =
        description.length < 250
          ? description
          : `${description.slice(0, 250)}...`;

      changeData({
        title,
        id,
        description: deskripsi,
        imageURL,
        rating,
        year,
      });
      setCover({
        cover: (
          <div className="cover">
            <img src={imageURL} alt={`Cover Film ${title}`} />
            <Link to={`/movies/${id}`}>
              <div className="overlay-card"></div>
            </Link>
          </div>
        ),
      });
    }
  }, [data]);

  return (
    <Card className="card" {...cover}>
      <Skeleton loading={load} active>
        <h3>
          <Link to={`/movies/${dataState.id}`}>
            {dataState.title} ({dataState.year})
          </Link>
        </h3>
        <Tooltip title={`Rating Film : ${dataState.rating}`}>
          <Rate
            key={dataState.id}
            value={(dataState.rating + 1) / 2}
            disabled
          />
          <p> </p>
        </Tooltip>
        <p>
          <strong>Deskripsi : </strong>
          {dataState.description}
        </p>
        <Link to={`/movies/${dataState.id}`}>Baca lebih lanjut</Link>
      </Skeleton>
    </Card>
  );
}

MovieCard.propTypes = {
  data: PropTypes.any,
};
