import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BsTrash, BsPencil } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import {
  Tooltip,
  Space,
  message,
  Popconfirm,
  Button,
  Form,
  Input,
  Table,
} from "antd";
import { useHistory } from "react-router";
import { fetchGame, deleteGame } from "../../lib/GameAPI";
import { destroySession } from "../../lib";
import UserContext from "../context/UserContext";

export default function GameTable() {
  document.title = "Data Games - Movigempedia";

  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dataFilter, setDataFilter] = useState({
    genre: [],
    platform: [],
    release: [],
  });
  const [errorToken, setErrorToken] = useState(false);

  useEffect(() => {
    if (errorToken) {
      setUser(null);
      destroySession();
      history.push("/");
      message.error("Sesi anda telah habis");
    }
  }, [errorToken]);

  const errorTokenHandler = () => {
    setErrorToken(true);
  };

  const updateData = async () => {
    setLoading(true);

    const newData = (await fetchGame()).map((record) => ({
      ...record,
      key: record.id,
    }));

    setData(newData);
    setLoading(false);
  };

  useEffect(updateData, []);

  useEffect(() => {
    const filterGenre = filtersBuilder(data, "genre", ",");
    const filterPlatform = filtersBuilder(data, "platform", ",");
    const filterRelease = filtersBuilder(data, "release");

    setDataFilter({
      genre: filterGenre,
      platform: filterPlatform,
      release: filterRelease,
    });
  }, [data]);

  const columns = [
    {
      title: "Judul Game",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      filters: dataFilter.genre,
      sorter: (a, b) => a.genre.localeCompare(b.genre),
      onFilter(value, record) {
        const regex = new RegExp(value, "gi");
        return regex.test(record.genre);
      },
    },
    {
      title: "Platform",
      dataIndex: "platform",
      filters: dataFilter.platform,
      sorter: (a, b) => a.platform.localeCompare(b.platform),
      onFilter(value, record) {
        const regex = new RegExp(value, "gi");
        return regex.test(record.platform);
      },
    },
    {
      title: "Tahun Rilis",
      dataIndex: "release",
      filters: dataFilter.release,
      sorter: (a, b) => a.release.localeCompare(b.release),
      onFilter(value, record) {
        const regex = new RegExp(value, "gi");
        return regex.test(record.release);
      },
    },
    {
      title: "Mode",
      key: "mode",
      filters: [
        {
          text: "Singleplayer",
          value: 0,
        },
        {
          text: "Multiplayer",
          value: 1,
        },
        {
          text: "Keduanya",
          value: 2,
        },
      ],
      filterMultiple: false,
      onFilter(value, record) {
        if (value === 0) {
          return record.singleplayer && !record.multiplayer;
        } else if (value === 1) {
          return record.multiplayer && !record.singleplayer;
        } else {
          return record.singleplayer && record.multiplayer;
        }
      },
      render(_, { singleplayer, multiplayer }) {
        const singleplayerRender = singleplayer ? (
          <Tooltip title="Singleplayer">
            <BsFillPersonFill color="white" />
          </Tooltip>
        ) : null;

        const multiplayerRender = multiplayer ? (
          <Tooltip title="Multiplayer">
            <BsFillPeopleFill color="white" />
          </Tooltip>
        ) : null;

        return (
          <p>
            {singleplayerRender} {multiplayerRender}
          </p>
        );
      },
      sorter(a, b) {
        return (
          a.singleplayer +
          a.multiplayer * 2 -
          (b.singleplayer + b.multiplayer * 2)
        );
      },
    },
    {
      title: "Aksi",
      key: "action",
      render(_, data) {
        return (
          <ActionBar
            id={data.id}
            onDelete={updateData}
            onErrorToken={errorTokenHandler}
          />
        );
      },
    },
  ];

  const onChangeHandler = async (e) => {
    setLoading(true);
    const keyword = e.target.value;

    const newData = (await fetchGame()).filter(({ name }) => {
      const regex = new RegExp(keyword, "gi");
      return regex.test(name);
    });

    const newDataKeyAdded = newData.map((record) => ({
      key: record.id,
      ...record,
    }));

    setData(newDataKeyAdded);
    setLoading(false);
  };

  return (
    <div className="container-subfeature">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <h1>Tabel Games</h1>

        <div className="pencarian">
          <Form name="pencarian">
            <Form.Item>
              <Input
                prefix={<FiSearch />}
                placeholder="Masukkan Nama Game"
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
    </div>
  );
}

function ExpandTable({ data }) {
  const singleplayerRender = data.singleplayer ? (
    <Tooltip title="Singleplayer">
      <BsFillPersonFill color="white" />
    </Tooltip>
  ) : null;

  const multiplayerRender = data.multiplayer ? (
    <Tooltip title="Multiplayer">
      <BsFillPeopleFill color="white" />
    </Tooltip>
  ) : null;

  return (
    <div className="expand">
      <div className="picture">
        <img src={data.imageURL} alt={`Gambar Game ${data.name}`} />
      </div>
      <Space className="description" direction="vertical" size="small">
        <p className="title">
          {data.name} ({data.release})
        </p>
        <p>
          <strong>Mode Permainan :</strong>
          {singleplayerRender} {multiplayerRender}
        </p>
        <p>
          <strong>Genre : </strong>
          {data.genre}
        </p>
        <p>
          <strong>Platform : </strong>
          {data.platform}
        </p>
      </Space>
    </div>
  );
}

function ActionBar({ id, onDelete, onErrorToken }) {
  const [isLoading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const { user } = useContext(UserContext);

  const deleteHandler = async () => {
    setLoading(true);
    setVisibility(false);
    const result = await deleteGame(user, id);
    if (result.status) {
      message.success(`Game berhasil dihapus`);
    } else if (result.data === "Token Error") {
      onErrorToken();
    } else {
      message.error("Proses penghapusan gagal");
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
      <Link to={`/games/${id}/edit`} style={{ color: "white" }}>
        <BsPencil />
      </Link>
    </Space>
  );
}

function filtersBuilder(data, key, delimeter = null) {
  const filterData = data
    .map((el) => el[key])
    .map((el) => el.split(delimeter))
    .reduce((res, el) => {
      if (Array.isArray(el)) {
        return [...res, ...el];
      } else {
        return [...res, el];
      }
    }, [])
    .map((el) => el.trim());

  const filterUnique = [...new Set(filterData)];
  filterUnique.sort();

  return filterUnique.map((el) => ({
    text: el,
    value: el,
  }));
}

ActionBar.propTypes = {
  id: PropTypes.number,
  onDelete: PropTypes.func,
  onErrorToken: PropTypes.func,
};

ExpandTable.propTypes = {
  data: PropTypes.object,
};
