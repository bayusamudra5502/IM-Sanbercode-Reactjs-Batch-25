import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Space,
  Form,
  Input,
  Button,
  Rate,
  InputNumber,
  DatePicker,
  Select,
  Popover,
  message,
  notification,
  Skeleton,
} from "antd";
import { checkImage } from "../../lib/ContentChecker";
import { useHistory, useParams } from "react-router";
import { destroySession } from "../../lib";
import UserContext from "../context/UserContext";
import moment from "moment";
import { fetchMovie, editMovie, addMovie } from "../../lib/MovieAPI";

export default function FormMovie({ isEditMode }) {
  const [form] = Form.useForm();
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [imgSrc, setImg] = useState("https://fakeimg.pl/300x500/");
  const { id } = useParams();
  const [isSending, setSending] = useState(false);
  const [imageFeedback, setImgFeedback] = useState({});
  const [ratingNum, setRating] = useState(0);
  const [loadingData, setLoading] = useState(false);

  if (isEditMode) {
    document.title = "Edit Film - Movigempedia";
  } else {
    document.title = "Tambah Film - Movigempedia";
  }

  useEffect(async () => {
    if (isEditMode) {
      setLoading(true);
      const data = await fetchMovie(id);

      if (data) {
        const { year, genre } = data;

        const arrGenre = genre.split(",").map((el) => el.trim());
        arrGenre.sort();

        const yearMoment = moment(year, "yyyy");
        form.setFieldsValue({ ...data, year: yearMoment, genre: arrGenre });
        setImg(data.imageURL);
        setRating((data.rating + 1) / 2);
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
      setRating(0);
    }
  }, [isEditMode]);

  const submitHandler = async (e) => {
    setSending(true);
    const { year, genre, ...submittedData } = e;
    const strGenre = genre.join(", ");
    const data = {
      ...submittedData,
      genre: strGenre,
      year: parseInt(year.format("YYYY")),
    };
    if (isEditMode) {
      const result = await editMovie(user, {
        ...data,
        id,
      });

      if (result.status) {
        message.success("Berhasil mengedit data");
        history.push("/movies/data");
      } else if (result.data === "Token Error") {
        message.error("Sesi anda telah habis");
        setUser(null);
        destroySession();
        history.push("/");
      } else {
        message.error("Gagal mengedit data");
      }
    } else {
      const result = await addMovie(user, data);
      if (result.status) {
        message.success("Berhasil menambah data");
        history.push("/movies/data");
      } else if (result.data === "Token Error") {
        message.error("Sesi anda telah habis");
        history.push("/");
        setUser(null);
        destroySession();
      } else {
        message.error("Gagal menambahkan data");
      }
    }
    setSending(false);
  };

  return (
    <Space className="container-subfeature" direction="vertical">
      <Skeleton loading={loadingData}>
        <h1>{isEditMode ? "Edit Film" : "Tambah Film"}</h1>
        <Row>
          <Col flex="1 1 800px" className="form-inner">
            <Form onFinish={submitHandler} layout="vertical" form={form}>
              <Form.Item
                label="Judul Film"
                name="title"
                rules={[
                  { required: true, message: "Silahkan masukan judul film" },
                ]}
              >
                <Input placeholder="Masukkan Judul Film" />
              </Form.Item>
              <Form.Item
                label="Durasi (menit)"
                name="duration"
                rules={[
                  { required: true, message: "Silahkan masukan durasi film" },
                  () => ({
                    validator(_, value) {
                      if (value > 0) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Nilai harus lebih besar daripada 0"
                        );
                      }
                    },
                  }),
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Masukkan Durasi Film"
                  min={1}
                />
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
                  label="Genre"
                  name="genre"
                  style={{ maxWidth: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Silahkan masukan genre film",
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
                    <Select.Option value="Drama" key="drama">
                      Drama
                    </Select.Option>
                    <Select.Option value="Horror" key="horror">
                      Horror
                    </Select.Option>
                    <Select.Option value="Petualangan" key="petualangan">
                      Petualangan
                    </Select.Option>
                    <Select.Option value="Aksi" key="aksi">
                      Aksi
                    </Select.Option>
                    <Select.Option value="Animasi" key="animasi">
                      Animasi
                    </Select.Option>
                    <Select.Option value="Dokumenter" key="dokumenter">
                      Dokumenter
                    </Select.Option>
                    <Select.Option value="Keluarga" key="keluarga">
                      Keluarga
                    </Select.Option>
                    <Select.Option value="Persahabatan" key="persahabatan">
                      Persahabatan
                    </Select.Option>
                    <Select.Option value="Romantis" key="romantis">
                      Romantis
                    </Select.Option>
                    <Select.Option value="Fiksi Ilmiah" key="fiksi">
                      Fiksi Ilmiah
                    </Select.Option>
                    <Select.Option value="Thriller" key="thriller">
                      Thriller
                    </Select.Option>
                    <Select.Option value="Misteri" key="misteri">
                      Misteri
                    </Select.Option>
                    <Select.Option value="Biografi" key="biografi">
                      Biografi
                    </Select.Option>
                    <Select.Option value="Musikal" key="musikal">
                      Musikal
                    </Select.Option>
                    <Select.Option value="Noir" key="noir">
                      Noir
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Popover>
              <Form.Item
                label="URL Cover"
                name="imageURL"
                rules={[
                  {
                    required: true,
                    message: "Silahkan masukan URL cover film",
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
              <Row>
                <Col flex={1}>
                  <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[
                      {
                        required: true,
                        message: "Silahkan masukan rating film",
                      },
                      () => ({
                        validator(_, value) {
                          if (0 <= value && value <= 10) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(
                              "Rating harus bernilai 0 s.d. 10"
                            );
                          }
                        },
                      }),
                    ]}
                  >
                    <InputNumber
                      placeholder="Masukkan Rating Film"
                      min={0}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        const number = parseInt(e);
                        setRating(Number.isNaN(number) ? 0 : (number + 1) / 2);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col
                  flex="150px"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Rate value={ratingNum} disabled />
                </Col>
              </Row>
              <Form.Item
                label="Tahun"
                name="year"
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
              <Form.Item
                label="Alur Film (Deskripsi)"
                name="description"
                rules={[
                  { required: true, message: "Silahkan masukan genre film" },
                ]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
              <Form.Item
                label="Review Film"
                name="review"
                rules={[
                  { required: true, message: "Silahkan masukan genre film" },
                ]}
              >
                <Input.TextArea rows={5} />
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

FormMovie.defaultProps = {
  isEditMode: false,
};

FormMovie.propTypes = {
  isEditMode: PropTypes.bool,
};
