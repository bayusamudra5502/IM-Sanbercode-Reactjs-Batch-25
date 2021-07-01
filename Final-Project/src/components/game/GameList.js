import React from "react";
import { fetchGame } from "../../lib";
import GameCard from "../GameCard";
import CardList from "../CardList";

export default function GameList() {
  return <CardList CardComponent={GameCard} dataFetcher={fetchGame} />;
}
