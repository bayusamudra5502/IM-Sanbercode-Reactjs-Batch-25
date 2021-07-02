import React, { useContext, useState } from "react";

import { Form, Input, Button, message, notification } from "antd";
import { FiMail } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import { register } from "../../lib/UserAPI";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import MessageContext from "../context/MessageContext";
import UserContext from "../context/UserContext";
import Jumbotron from "../Jumbotron";
import formBackground from "../../assets/img/form-background.jpg";

export default function Register() {
  const history = useHistory();
  const { setMessage } = useContext(MessageContext);
  const { user } = useContext(UserContext);
  const [isAvailable, setAvailable] = useState(false);
  const [isLoading, setLoading] = useState(false);

  if (user) {
    setMessage({
      type: "info",
      message: "Informasi",
      description: `Anda sudah login sebagai ${user.name}`,
    });
    history.push("/");
    return null;
  } else {
    const sucessNotif = () => {
      notification.success({
        message: "Pendaftaran Berhasil",
        description: "Silahkan lakukan login untuk menggunakan aplikasi ini.",
      });
    };

    const submitHandler = async (data) => {
      setLoading(true);
      const respondObj = await register(data);
      setLoading(false);

      if (respondObj && respondObj.status !== 1) {
        message.info("Berhasil daftar");
        sucessNotif();
        history.push("/login");
      } else if (respondObj?.status === 1) {
        setAvailable(true);
      } else {
        message.error("Terjadi kesalahan saat registrasi");
      }
    };

    const emailChange = () => setAvailable(false);
    const errorMsg = isAvailable
      ? {
          validateStatus: "error",
          help: "Email sudah terdaftar",
        }
      : null;

    return (
      <>
        <Jumbotron
          src={formBackground}
          alt="Register Page"
          imgStyle={{ bottom: "-20%" }}
        />
        <div className="form-container">
          <h1>Register</h1>

          <Form onFinish={submitHandler} layout="vertical">
            <Form.Item
              label="Nama"
              name="name"
              rules={[
                { required: true, message: "Silahkan masukan nama anda" },
              ]}
            >
              <Input prefix={<BsPerson />} placeholder="Masukkan Nama" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Masukkan Email yang Valid" },
                { required: true, message: "Silahkan masukan email anda" },
              ]}
              style={{ marginTop: "5px" }}
              {...errorMsg}
            >
              <Input
                onChange={emailChange}
                prefix={<FiMail />}
                placeholder="Masukkan Email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Silahkan masukkan password anda" },
              ]}
              style={{ marginTop: "5px" }}
              hasFeedback
            >
              <Input.Password
                prefix={<AiOutlineLock />}
                placeholder="Masukkan Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Konfirmasi Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Konfirmasi Password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Password tidak sama"));
                  },
                }),
              ]}
              style={{ marginTop: "5px" }}
            >
              <Input.Password
                prefix={<AiOutlineLock />}
                placeholder="Masukkan Konfirmasi Password"
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "20px" }}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Register
              </Button>
            </Form.Item>
          </Form>
          <p>
            Sudah punya akun? <Link to="/login">Login disini</Link>
          </p>
        </div>
      </>
    );
  }
}
