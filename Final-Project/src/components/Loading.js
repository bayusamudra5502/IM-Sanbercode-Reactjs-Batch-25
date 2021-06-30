import React from "react";
import loadingImg from "../assets/img/loading.svg";

export default function Loading() {
  return (
    <div className="loading">
      <img src={loadingImg} alt="Loading Pacman" />
      <p>Loading</p>
    </div>
  );
}
