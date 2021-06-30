import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import { fetchMovie } from "../../lib/MovieAPI";

export default function HomeMovie() {
  const [data, setData] = useState(null);

  useEffect(async () => {
    if (!data) {
      const dataMovie = await fetchMovie();
      dataMovie.sort((obj1, obj2) => obj2.rating - obj1.rating);
      setData(dataMovie.slice(0, 5));
    }
  }, []);

  if (!data) {
    return (
      <div className="container">
        <h2>Film Teratas</h2>
        <p>Berikut ini adalah daftar film-film teratas kami</p>
        <div className="film">
          {new Array(5).fill(null).map((el, idx) => {
            return <MovieCard key={idx} data={null} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h2>Film Teratas</h2>
        <p>Berikut ini adalah daftar film-film teratas kami</p>
        <div className="film">
          {data.map((el, idx) => {
            return <MovieCard key={idx} data={el} />;
          })}
        </div>
      </div>
    );
  }
}
