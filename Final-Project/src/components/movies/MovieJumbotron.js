import React from "react";
import movieImg from "../../assets/img/movie-img.jpg";
import Jumbotron from "../Jumbotron";

export default function MovieJumbotron() {
  return (
    <Jumbotron
      src={movieImg}
      alt="Movie Jumbotron"
      imgStyle={{ bottom: "-380px" }}
    >
      <h1>Daftar Film</h1>
      <p>Kumpulan Film di Movigempedia</p>
    </Jumbotron>
  );
}
