import React, { useEffect, useState } from "react";
import { fetchMovie } from "../../lib/MovieAPI";
import MovieCard from "../MovieCard";

export default function MovieList() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    const newData = await fetchMovie();
    setData(newData);
    setLoading(false);
  }, []);

  const dataRender = data
    ? data.map((el) => {
        return <MovieCard key={el.id} data={el} />;
      })
    : new Array(5)
        .fill(null)
        .map((_, idx) => <MovieCard key={idx} data={null} />);

  return (
    <div className="list">
      <div className="item-list">{dataRender}</div>
    </div>
  );
}
