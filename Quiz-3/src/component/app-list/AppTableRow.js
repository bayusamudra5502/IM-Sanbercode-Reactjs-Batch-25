import React, { useContext } from "react";
import PropTypes from "prop-types";
import { EditContext } from "../Context/EditContext";
import { DataContext } from "../Context/DataContext";
import { deleteData, fetchData } from "../../lib/API";

const MAX_CHAR = 30;

export default function AppTableRow({ data }) {
  const { setEdit } = useContext(EditContext);
  const { setData } = useContext(DataContext);

  const editHandler = () => {
    setEdit(data.id);
  };

  const deleteHandler = async () => {
    await deleteData(data.id);

    const newData = await fetchData();
    setData(newData);
  };

  const description =
    data.description.length > MAX_CHAR
      ? data.description.slice(0, MAX_CHAR) + "..."
      : data.description;

  return (
    <tr>
      <td>{data.index + 1}</td>
      <td>{data.name}</td>
      <td>{data.category}</td>
      <td>{description}</td>
      <td>{data.release_year}</td>
      <td>{data.size}</td>
      <td>{data.price}</td>
      <td>{data.rating}</td>
      <td>
        <ul className="table-platform">
          {(data.is_android_app && <li>Android</li>) || null}
          {(data.is_ios_app && <li>IOS</li>) || null}
        </ul>
      </td>
      <td>
        <button onClick={editHandler}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

AppTableRow.propTypes = {
  data: PropTypes.shape({
    index: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    release_year: PropTypes.number,
    size: PropTypes.number,
    price: PropTypes.number,
    rating: PropTypes.number,
    is_android_app: PropTypes.bool,
    is_ios_app: PropTypes.bool,
  }),
};
