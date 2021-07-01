import React from "react";
import GameJumbotron from "./GameJumbotron";
import GameList from "./GameList";

export default function Games() {
  return (
    <div className="game">
      <GameJumbotron />
      <GameList />
    </div>
  );
}
