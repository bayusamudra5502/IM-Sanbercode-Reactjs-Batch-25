import React from "react";
import GameJumbotron from "./GameJumbotron";
import GameList from "./GameList";

export default function Games() {
  document.title = "Daftar Games - Movigempedia";

  return (
    <div className="game">
      <GameJumbotron />
      <GameList />
    </div>
  );
}
