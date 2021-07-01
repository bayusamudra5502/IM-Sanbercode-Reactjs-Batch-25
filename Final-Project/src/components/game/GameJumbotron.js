import React from "react";
import gameImg from "../../assets/img/game-img.jpg";
import Jumbotron from "../Jumbotron";

export default function GameJumbotron() {
  return (
    <Jumbotron
      src={gameImg}
      alt="Game Jumbotron"
      imgStyle={{ bottom: "-380px" }}
    >
      <h1>Daftar Permainan</h1>
      <p>Kumpulan Game di Movigempedia</p>
    </Jumbotron>
  );
}
