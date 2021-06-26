import React, { useContext, useState } from "react";
import { fetchData } from "../../lib/API";
import { DataContext } from "../Context/DataContext";

async function searchNameData(query) {
  const data = await fetchData();
  return data.filter(({ name }) => {
    return name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  });
}

export default function SearchBar() {
  const { setData } = useContext(DataContext);
  const [query, setQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const newData = await searchNameData(query);
    setData(newData);
  };

  const onChange = async (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search by name"
          value={query}
          name="query"
          onChange={onChange}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
