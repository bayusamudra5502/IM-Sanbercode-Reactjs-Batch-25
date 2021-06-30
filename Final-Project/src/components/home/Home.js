import React from "react";
import HomeCarousel from "./HomeCarousel";
import HomeGames from "./HomeGames";
import HomeMovie from "./HomeMovies";

function Home() {
  document.title = "Movigempedia | Review Game dan Film";

  return (
    <div className="home">
      <HomeCarousel />
      <HomeMovie />
      <HomeGames />
    </div>
  );
}

export default Home;
