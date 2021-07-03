import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { BsTrash, BsPencil } from "react-icons/bs";
import {
  Table,
  Rate,
  Space,
  Popconfirm,
  Button,
  message,
  Tooltip,
  Form,
  Input,
} from "antd";
import { FiSearch } from "react-icons/fi";
import { deleteMovie } from "../../lib/MovieAPI";
import { Link } from "react-router-dom";
import { fetchMovie } from "../../lib/MovieAPI";

import UserContext from "../context/UserContext";

export default function MovieTable() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilter] = useState([]);
  const [filterGenre, setFilterGenre] = useState([]);

  const updateData = async () => {
    setLoading(true);
    const newData = (await fetchMovie()).map((record) => ({
      ...record,
      key: record.id,
    }));

    setLoading(false);
    setData(newData);
  };

  const sortedTahun = [...filterData];
  sortedTahun.sort();

  const columns = [
    {
      title: "Judul Film",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Durasi",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
      render(duration) {
        return <>{duration} menit</>;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      filters: filterGenre.map((el) => ({
        text: el,
        value: el,
      })),
      sorter: (a, b) => a.genre.localeCompare(b.genre),
      onFilter: (value, record) => {
        const regex = new RegExp(value, "gi");
        return regex.test(record.genre);
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      filters: new Array(5).fill(0).map((_, idx) => ({
        text: `${(idx + 1) * 2 - 1}-${(idx + 1) * 2}`,
        value: idx + 1,
      })),
      render(rating, { id }) {
        return (
          <Tooltip title={`Rating Film : ${rating}`}>
            <Rate key={id} value={rating / 2} disabled />
            <span> </span>
          </Tooltip>
        );
      },
      sorter: (a, b) => a.rating - b.rating,
      onFilter: (value, record) => {
        return Math.floor(record.rating / 2) == value;
      },
    },
    {
      title: "Tahun",
      dataIndex: "year",
      key: "year",
      filters: sortedTahun.map((el) => {
        return {
          text: el,
          value: el,
        };
      }),
      sorter: (a, b) => a.year - b.year,
      onFilter: (value, record) => record.year === value,
    },
    {
      title: "Aksi",
      key: "action",
      render(_, data) {
        return <ActionBar id={data.id} onDelete={updateData} />;
      },
    },
  ];

  useEffect(updateData, []);

  useEffect(() => {
    const years = data.map((el) => el.year);
    const uniqueYears = [...new Set(years)];

    setFilter(uniqueYears);

    const genre = data.map((el) => el.genre.split(","));
    const genreRata = genre.reduce((res, el) => [...res, ...el], []);
    const uniqueGenre = [...new Set(genreRata.map((el) => el.trim()))];

    setFilterGenre(uniqueGenre);
  }, [data]);

  const onChangeHandler = async (e) => {
    setLoading(true);
    const keyword = e.target.value;

    const newData = (await fetchMovie()).filter(({ title }) => {
      const regex = new RegExp(keyword, "gi");
      return regex.test(title);
    });

    const newDataKeyAdded = newData.map((record) => ({
      key: record.id,
      ...record,
    }));

    setData(newDataKeyAdded);
    setLoading(false);
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <h1>Tabel Film</h1>

      <div className="pencarian">
        <Form name="pencarian">
          <Form.Item>
            <Input
              prefix={<FiSearch />}
              placeholder="Masukkan Nama Film"
              onChange={onChangeHandler}
            />
          </Form.Item>
        </Form>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender(data) {
            return <ExpandTable data={data} />;
          },
        }}
        loading={isLoading}
      />
    </Space>
  );
}

function ExpandTable({ data }) {
  return (
    <div className="expand">
      <div className="picture">
        <img src={data.imageURL} alt={`Gambar Film ${data.title}`} />
      </div>
      <Space className="description" direction="vertical" size="middle">
        <p className="title">
          {data.title} ({data.year})
        </p>
        <p>
          <strong>Rating : </strong>
          <Rate value={data.rating / 2} disabled />
        </p>
        <p>
          <strong>Genre : </strong>
          {data.genre}
        </p>
        <p>
          <strong>Durasi : </strong>
          {data.duration} menit
        </p>
        <p>
          <strong>Deskripsi (Sinopsis) :</strong>
          <br />
          {data.description}
        </p>
        <p>
          <strong>Review :</strong>
          <br />
          {data.review}
        </p>
      </Space>
    </div>
  );
}

function ActionBar({ id, onDelete }) {
  const [isLoading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const { user } = useContext(UserContext);

  const deleteHandler = async () => {
    setLoading(true);
    setVisibility(false);
    if (await deleteMovie(user, id)) {
      message.success("Data berhasil dihapus");
    } else {
      message.error("Terjadi kesalahan saat menghapus data");
    }
    setLoading(false);
    onDelete();
  };

  const cancleHandler = () => {
    setVisibility(false);
  };

  const openConfirm = (e) => {
    e.preventDefault();
    setVisibility(true);
  };

  return (
    <Space size="middle">
      <Popconfirm
        title="Apakah anda yakin akan menghapus data ini?"
        visible={visibility}
        onConfirm={deleteHandler}
        okButtonProps={{ loading: isLoading }}
        onCancel={cancleHandler}
      >
        <Button onClick={openConfirm} type="text">
          <BsTrash />
        </Button>
      </Popconfirm>
      <Link to={`/movies/${id}/edit`} style={{ color: "white" }}>
        <BsPencil />
      </Link>
    </Space>
  );
}

ActionBar.propTypes = {
  id: PropTypes.number,
  onDelete: PropTypes.func,
};

ExpandTable.propTypes = {
  data: PropTypes.object,
};
