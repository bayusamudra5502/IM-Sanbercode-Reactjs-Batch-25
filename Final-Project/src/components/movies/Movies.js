import React from "react";
import MovieJumbotron from "./MovieJumbotron";
import MovieList from "./MoviesList";

export default function Movie() {
  return (
    <div className="movie">
      <MovieJumbotron />
      <MovieList />
    </div>
  );
}
