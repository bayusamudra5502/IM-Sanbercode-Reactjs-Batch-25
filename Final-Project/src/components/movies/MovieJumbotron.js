import React from "react";
import movieImg from "../../assets/img/movie-img.jpg";

export default function MovieJumbotron() {
  return (
    <div className="jumbotron">
      <img
        src={movieImg}
        alt="Movie Jumbotron"
        style={{ bottom: "-380px" }}
      ></img>
      <div className="overlay"></div>
      <div className="message">
        <h1>Daftar Film</h1>
        <p>Kumpulan Film di Movigempedia</p>
      </div>
    </div>
  );
}
