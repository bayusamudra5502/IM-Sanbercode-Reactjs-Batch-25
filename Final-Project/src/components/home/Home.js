import React, { useContext, useEffect } from "react";
import { notification } from "antd";
import HomeCarousel from "./HomeCarousel";
import HomeGames from "./HomeGames";
import HomeMovie from "./HomeMovies";
import MessageContext from "../context/MessageContext";

function Home() {
  document.title = "Movigempedia | Review Game dan Film";
  const { message, setMessage } = useContext(MessageContext);

  useEffect(() => {
    if (message) {
      const { type, ...data } = message;
      notification[type](data);
      setMessage(null);
    }
  }, [message]);

  return (
    <div className="home">
      <HomeCarousel />
      <HomeMovie />
      <HomeGames />
    </div>
  );
}

export default Home;
