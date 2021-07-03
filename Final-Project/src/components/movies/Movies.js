import React from "react";
import MovieJumbotron from "./MovieJumbotron";
import MovieList from "./MoviesList";

export default function Movie() {
  document.title = "Daftar Film - Movigempedia";

  return (
    <div className="movie">
      <MovieJumbotron />
      <MovieList />
    </div>
  );
}
