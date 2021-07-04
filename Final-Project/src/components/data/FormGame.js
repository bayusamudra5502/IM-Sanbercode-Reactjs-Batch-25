import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Space,
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Tag,
  Select,
  Popover,
  notification,
  Skeleton,
} from "antd";
import { checkImage } from "../../lib/ContentChecker";
import { useHistory, useParams } from "react-router";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import UserContext from "../context/UserContext";
import moment from "moment";
import { fetchGame, addGame, editGame } from "../../lib/GameAPI";

function tagRender({ value, closable, onClose }) {
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (value === "singleplayer") {
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        <BsFillPersonFill /> Singleplayer
      </Tag>
    );
  } else {
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        <BsFillPeopleFill /> Multiplayer
      </Tag>
    );
  }
}

export default function FormGame({ isEditMode }) {
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [imgSrc, setImg] = useState("https://fakeimg.pl/300x500/");
  const { id } = useParams();
  const [isSending, setSending] = useState(false);
  const [imageFeedback, setImgFeedback] = useState({});
  const [loadingData, setLoading] = useState(false);

  useEffect(async () => {
    if (isEditMode) {
      setLoading(true);
      const data = await fetchGame(id);

      if (data) {
        const {
          release,
          genre,
          platform,
          singleplayer,
          multiplayer,
          ...other
        } = data;
        const mode = [];

        if (singleplayer) {
          mode.push("singleplayer");
        }

        if (multiplayer) {
          mode.push("multiplayer");
        }

        const arrGenre = genre.split(",").map((el) => el.trim());
        arrGenre.sort();

        const arrPlatform = platform.split(",").map((el) => el.trim());
        arrPlatform.sort();

        const yearMoment = moment(parseInt(release), "yyyy");
        form.setFieldsValue({
          ...other,
          release: yearMoment,
          mode,
          genre: arrGenre,
          platform: arrPlatform,
        });

        setImg(data.imageURL);
        setLoading(false);
      } else {
        notification.error({
          message: "Kesalahan",
          description: `Data dengan id ${id} tidak ditemukan di database.`,
        });
        setLoading(false);
        history.push("/movies/data");
      }
    } else {
      form.resetFields();
      setImg("https://fakeimg.pl/300x500/");
    }
  }, [isEditMode]);

  const submitHandler = async (e) => {
    setSending(true);
    const { release, genre, platform, mode, ...submittedData } = e;
    const singleplayer = mode.some((el) => el === "singleplayer");
    const multiplayer = mode.some((el) => el === "multiplayer");

    genre.sort();
    platform.sort();

    const strGenre = genre.join(", ");
    const strPlatform = platform.join(", ");

    const data = {
      ...submittedData,
      singleplayer,
      multiplayer,
      genre: strGenre,
      platform: strPlatform,
      release: release.format("YYYY"),
    };

    console.dir(data);
    console.dir(e);

    if (isEditMode) {
      if (
        await editGame(user, {
          ...data,
          id,
        })
      ) {
        message.success("Berhasil mengedit data");
        history.push("/games/data");
      } else {
        message.error("Gagal mengedit data");
      }
    } else {
      if (await addGame(user, data)) {
        message.success("Berhasil menambah data");
        history.push("/games/data");
      } else {
        message.error("Gagal menambahkan data");
      }
    }

    setSending(false);
  };

  return (
    <Space className="container-subfeature" direction="vertical">
      <Skeleton loading={loadingData}>
        <h1>{isEditMode ? "Edit Game" : "Tambah Game"}</h1>
        <Row>
          <Col flex="1 1 800px" className="form-inner">
            <Form onFinish={submitHandler} layout="vertical" form={form}>
              <Form.Item
                label="Nama Game"
                name="name"
                rules={[
                  { required: true, message: "Silahkan masukan nama game" },
                ]}
              >
                <Input placeholder="Masukkan judul game" />
              </Form.Item>
              <Popover
                content={
                  <div>
                    <p>
                      Tambahkan koma <code>,</code> untuk menambahkan item
                      lainnya.
                    </p>
                  </div>
                }
                title="Petunjuk"
                trigger="focus"
              >
                <Form.Item
                  label="Genre Game"
                  name="genre"
                  style={{ maxWidth: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Silahkan masukan genre game",
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    allowClear
                    placeholder="Masukkan Genre Game"
                    tokenSeparators={[","]}
                    optionLabelProp="label"
                  >
                    <Select.Option value="Fighting" key="fighting">
                      Fighting
                    </Select.Option>
                    <Select.Option
                      value="First Peson Shooter (FPS)"
                      label="FPS"
                      key="fps"
                    >
                      First Peson Shooter (FPS)
                    </Select.Option>
                    <Select.Option
                      value="Third Peson Shooter (TPS)"
                      label="TPS"
                      key="tps"
                    >
                      Third Peson Shooter (TPS)
                    </Select.Option>
                    <Select.Option
                      value="Real Time Strategy (RTS)"
                      label="RTS"
                      key="rts"
                    >
                      Real Time Strategy (RTS)
                    </Select.Option>
                    <Select.Option
                      value="Role Playing Game (RPG)"
                      label="RPG"
                      key="rpg"
                    >
                      Role Playing Game (RPG)
                    </Select.Option>
                    <Select.Option value="Adventure" key="adventure">
                      Adventure
                    </Select.Option>
                    <Select.Option value="Simulasi" key="simulasi">
                      Simulasi
                    </Select.Option>
                    <Select.Option value="Sport Game" key="sport">
                      Sport Game
                    </Select.Option>
                    <Select.Option value="Racing Game" key="racing">
                      Racing Game
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Popover>
              <Form.Item
                label="Mode Permainan"
                name="mode"
                rules={[
                  { required: true, message: "Silahkan masukan platform game" },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  tagRender={tagRender}
                  placeholder="Masukkan mode permainan yang didukung"
                >
                  <Select.Option value="singleplayer" key="singleplayer">
                    Singleplayer
                  </Select.Option>
                  <Select.Option value="multiplayer" key="multiplayer">
                    Multiplayer
                  </Select.Option>
                </Select>
              </Form.Item>
              <Popover
                content={
                  <div>
                    <p>
                      Tambahkan koma <code>,</code> untuk menambahkan item
                      custom.
                    </p>
                  </div>
                }
                title="Petunjuk"
                trigger="focus"
              >
                <Form.Item
                  label="Platform"
                  name="platform"
                  rules={[
                    {
                      required: true,
                      message: "Silahkan masukan platform game",
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    allowClear
                    placeholder="Masukkan Platform Game"
                    tokenSeparators={[","]}
                  >
                    <Select.Option value="Windows" key="windows">
                      Windows (PC)
                    </Select.Option>
                    <Select.Option value="Android" key="android">
                      Android
                    </Select.Option>
                    <Select.Option value="IOS" key="ios">
                      IOS
                    </Select.Option>
                    <Select.Option value="Mac OS" key="mac">
                      Mac OS
                    </Select.Option>
                    <Select.Option value="Linux" key="linux">
                      Linux
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Popover>

              <Form.Item
                label="URL Cover Game"
                name="imageURL"
                style={{ marginBottom: "20px" }}
                rules={[
                  {
                    required: true,
                    message: "Silahkan masukan URL cover game",
                  },
                  {
                    type: "url",
                    message: "Input harus merupakan URL yang sah",
                  },
                  () => ({
                    validator: async (_, value) => {
                      if (value === "") {
                        return Promise.resolve();
                      }
                      setImgFeedback({
                        validateStatus: "validating",
                        help: "Sedang memeriksa gambar...",
                      });
                      const result = await checkImage(value);
                      if (result.isImage) {
                        setImg(value);
                        setImgFeedback({
                          validateStatus: "success",
                          help: "Gambar valid",
                        });
                        return Promise.resolve();
                      } else {
                        setImgFeedback({});
                        if (result.isImage === false) {
                          setImg("https://fakeimg.pl/300x500/");
                          return Promise.reject("Masukkan hanya URL image");
                        } else if (result.status === 404) {
                          setImg("https://fakeimg.pl/300x500/");
                          return Promise.reject("Gambar tidak ditemukan");
                        } else if (result.status) {
                          setImg(value);
                          setImgFeedback({
                            validateStatus: "warning",
                            help: "Gambar tidak bisa diakses. Proses pemeriksaan diabaikan.",
                          });
                          return Promise.resolve();
                        } else {
                          setImg("https://fakeimg.pl/300x500/");
                          return Promise.reject(
                            "Terjadi kesalahan saat pemeriksaan"
                          );
                        }
                      }
                    },
                  }),
                ]}
                {...imageFeedback}
                hasFeedback
              >
                <Input placeholder="Masukkan URL Cover Film" />
              </Form.Item>

              <Form.Item
                label="Tahun Rilis"
                name="release"
                rules={[
                  { required: true, message: "Silahkan masukan genre film" },
                ]}
              >
                <DatePicker
                  placeholder="Masukkan tahun"
                  picker="year"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item style={{ marginTop: "20px" }}>
                <Button type="primary" htmlType="submit" loading={isSending}>
                  {isEditMode ? "Edit Data" : "Tambah Data"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col flex="350px">
            <img
              draggable={false}
              className="preview"
              src={imgSrc}
              alt="Preview"
            />
          </Col>
        </Row>
      </Skeleton>
    </Space>
  );
}

FormGame.defaultProps = {
  isEditMode: false,
};

FormGame.propTypes = {
  isEditMode: PropTypes.bool,
};
