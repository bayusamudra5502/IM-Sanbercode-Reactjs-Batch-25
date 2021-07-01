import React from "react";
import { fetchMovie } from "../../lib/MovieAPI";
import MovieCard from "../MovieCard";
import CardList from "../CardList";

export default function MovieList() {
  return <CardList CardComponent={MovieCard} dataFetcher={fetchMovie} />;
}
