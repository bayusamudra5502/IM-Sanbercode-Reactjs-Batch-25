import React from "react";
import MovieCard from "../MovieCard";
import { fetchMovie } from "../../lib/MovieAPI";
import CardList from "../CardList";

export default function HomeMovie() {
  const fetchFunction = async () => {
    const dataMovie = await fetchMovie();
    dataMovie.sort((obj1, obj2) => obj2.rating - obj1.rating);
    return dataMovie.slice(0, 5);
  };

  return (
    <div className="container">
      <h2>Film Teratas</h2>
      <p>Berikut ini adalah daftar film teratas kami</p>
      <CardList CardComponent={MovieCard} dataFetcher={fetchFunction} />
    </div>
  );
}
