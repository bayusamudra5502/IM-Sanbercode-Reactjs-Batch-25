import React from "react";
import GameCard from "../GameCard";
import { fetchGame } from "../../lib/GameAPI";
import CardList from "../CardList";

export default function HomeGames() {
  const dataFetcher = async () => {
    const dataGames = await fetchGame();
    return dataGames.slice(0, 5);
  };

  return (
    <div className="container">
      <h2>Games Teratas</h2>
      <p>Berikut ini adalah daftar game teratas kami</p>
      <CardList CardComponent={GameCard} dataFetcher={dataFetcher} />
    </div>
  );
}
