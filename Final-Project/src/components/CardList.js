import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function CardList({ CardComponent, dataFetcher }) {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const newData = await dataFetcher();
    setData(newData);
  }, []);

  const dataRender = data
    ? data.map((el) => {
        return <CardComponent key={el.id} data={el} />;
      })
    : new Array(5)
        .fill(null)
        .map((_, idx) => <CardComponent key={idx} data={null} />);

  return (
    <div className="list">
      <div className="item-list">{dataRender}</div>
    </div>
  );
}

CardList.propTypes = {
  CardComponent: PropTypes.func,
  dataFetcher: PropTypes.func,
};
