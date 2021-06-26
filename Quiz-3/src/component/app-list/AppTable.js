import React, { useContext, useEffect } from "react";
import { DataContext } from "../Context/DataContext";
import { fetchData } from "../../lib/API";
import AppTableRow from "./AppTableRow";

export default function AppTable() {
  const { data, setData } = useContext(DataContext);

  useEffect(async () => {
    const newData = await fetchData();
    setData(newData);
  }, []);

  const dataRender = data.map((data, index) => {
    const dataProps = {
      index,
      ...data,
      is_android_app: data.is_android_app === 1,
      is_ios_app: data.is_ios_app === 1,
    };

    return <AppTableRow key={data.id} data={dataProps} />;
  });

  return (
    <div className="app-table">
      <h1>Mobile App List</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Release Year</th>
            <th>Size</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Platform</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{dataRender}</tbody>
      </table>
    </div>
  );
}
