import React, { useContext, useState } from "react";
import { Form, Input, Button, message, Alert } from "antd";
import { FiMail } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import { getSession, login } from "../../lib/UserAPI";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import MessageContext from "../context/MessageContext";
import Jumbotron from "../Jumbotron";
import formBackground from "../../assets/img/form-background.jpg";
import UserContext from "../context/UserContext";

export default function Login() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { setMessage } = useContext(MessageContext);
  const [isError, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [isLoading, setLoading] = useState(false);

  if (user || getSession()) {
    if (showMessage) {
      setMessage({
        type: "info",
        message: "Informasi",
        description: `Anda sudah login sebagai ${
          user?.name ?? getSession().name
        }`,
      });
    }

    history.push("/");
    return null;
  } else {
    const submitHandler = async (data) => {
      setLoading(true);
      const userObj = await login(data);
      setLoading(false);

      if (userObj && userObj.status !== 1) {
        message.success("Berhasil Login");
        setShowMessage(false);
        setUser(userObj);
        history.push("/");
      } else if (userObj?.status === 1) {
        setError(false);
        setError(true);
      } else {
        message.error("Terjadi kesalahan saat login.");
      }
    };

    const errorAlert = (
      <Alert
        message="Gagal Login"
        description="Pasangan Email dan Password tidak ditemukan"
        type="error"
        showIcon
        closable
        style={{ margin: "15px 0" }}
      />
    );

    return (
      <>
        <Jumbotron
          src={formBackground}
          alt="Login Page"
          imgStyle={{ bottom: "-20%" }}
        />
        <div className="form-container">
          <h1>Login</h1>
          {isError ? errorAlert : null}

          <Form onFinish={submitHandler} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Masukkan Email yang Valid" },
                { required: true, message: "Silahkan masukan email anda" },
              ]}
            >
              <Input prefix={<FiMail />} placeholder="Masukkan Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Silahkan masukkan password anda" },
              ]}
              style={{ marginTop: "10px" }}
            >
              <Input.Password
                prefix={<AiOutlineLock />}
                placeholder="Masukkan Password"
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "20px" }}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <p>
            Belum punya akun? <Link to="/register">Daftar disini</Link>
          </p>
        </div>
      </>
    );
  }
}
