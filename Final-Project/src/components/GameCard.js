import React, { useState, useEffect } from "react";
import { Card, Skeleton, Tooltip } from "antd";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function GameCard({ data }) {
  const [load, changeLoad] = useState(true);
  const [dataState, changeData] = useState({
    name: "",
    genre: "",
    singleplayer: false,
    imageURL: "...",
    multiplayer: false,
    platform: "",
  });
  const [cover, setCover] = useState({});

  useEffect(() => {
    if (data) {
      changeLoad(false);

      const { id, imageURL, name } = data;

      changeData(data);
      setCover({
        cover: (
          <div className="cover">
            <img src={imageURL} alt={`Cover Game ${name}`} />
            <Link to={`/games/${id}`}>
              <div className="overlay-card"></div>
            </Link>
          </div>
        ),
      });
    }
  }, [data]);

  const singleplayer = dataState.singleplayer ? (
    <Tooltip title="Singleplayer">
      <BsFillPersonFill color="white" />
    </Tooltip>
  ) : null;

  const multiplayer = dataState.multiplayer ? (
    <Tooltip title="Multiplayer">
      <BsFillPeopleFill color="white" />
    </Tooltip>
  ) : null;

  return (
    <Card className="card" {...cover}>
      <Skeleton loading={load} active>
        <h3>
          <Link to={`/games/${dataState.id}`}>
            {dataState.name} ({dataState.release})
          </Link>
        </h3>
        <p>
          <strong>Platform : </strong>
          {dataState.platform}
        </p>
        <p>
          <strong>Player Mode : </strong> {singleplayer} {multiplayer}
        </p>
        <Link to={`/games/${dataState.id}`}>Baca lebih lanjut</Link>
      </Skeleton>
    </Card>
  );
}

GameCard.propTypes = {
  data: PropTypes.any,
};
