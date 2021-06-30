import React, { useEffect, useState } from "react";
import GameCard from "../GameCard";
import { fetchGame } from "../../lib/GameAPI";

export default function HomeGames() {
  const [data, setData] = useState(null);

  useEffect(async () => {
    if (!data) {
      const dataGames = await fetchGame();
      setData(dataGames.slice(0, 5));
    }
  }, []);

  if (!data) {
    return (
      <div className="container">
        <h2>Game Teratas</h2>
        <p>Berikut ini adalah daftar game teratas kami</p>
        <div className="game">
          {new Array(5).fill(null).map((el, idx) => {
            return <GameCard key={idx} data={null} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h2>Game Teratas</h2>
        <p>Berikut ini adalah daftar game teratas kami</p>
        <div className="game">
          {data.map((el, idx) => {
            return <GameCard key={idx} data={el} />;
          })}
        </div>
      </div>
    );
  }
}
