import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import Jumbotron from "../Jumbotron";
import Loading from "../Loading";
import { Tooltip } from "antd";

import { fetchGame } from "../../lib";

export default function GameItem() {
  const { id } = useParams();
  const [data, setData] = useState(undefined);

  useEffect(async () => {
    const fetchtedData = await fetchGame(id);
    setData(fetchtedData);
  }, []);

  if (data) {
    const singleplayer = data.singleplayer ? (
      <Tooltip title="Singleplayer">
        <BsFillPersonFill color="white" />
      </Tooltip>
    ) : null;

    const multiplayer = data.multiplayer ? (
      <Tooltip title="Multiplayer">
        <BsFillPeopleFill color="white" />
      </Tooltip>
    ) : null;

    return (
      <div className="movie-item">
        <Jumbotron
          alt={`Backdrop game ${data.name}`}
          src={data.imageURL}
          imgStyle={{ bottom: "-50%" }}
        />
        <div className="data">
          <div className="picture">
            <img src={data.imageURL} alt={data.name}></img>
          </div>
          <div className="header-data">
            <h1>{data.name}</h1>
            <p>{data.release}</p>
          </div>
          <div className="body">
            <p className="game-item">
              <strong>Genre Game : </strong>
              {data.genre}
            </p>
            <p className="game-item">
              <strong>Platform :</strong> {data.platform}
            </p>
            <p className="game-item">
              <strong>Mode Permainan:</strong> {singleplayer} {multiplayer}
            </p>
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
