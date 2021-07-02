import React, { useState, useContext } from "react";
import { Form, Input, Button, message, notification } from "antd";
import { AiOutlineLock } from "react-icons/ai";

import { destroySession, changePassword } from "../../lib/UserAPI";
import { useHistory } from "react-router";

import { getSession } from "../../lib";
import MessageContext from "../context/MessageContext";
import UserContext from "../context/UserContext";
import Jumbotron from "../Jumbotron";
import formBackground from "../../assets/img/form-background.jpg";

export default function GantiPassword() {
  const { user, setUser } = useContext(UserContext);
  const { setMessage } = useContext(MessageContext);
  const history = useHistory();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const sucessNotif = () => {
    notification.success({
      message: "Sukses",
      description:
        "Silahkan lakukan login kembali untuk menggunakan aplikasi ini.",
    });
  };

  const submitHandler = async (data) => {
    setLoading(true);
    const respondObj = await changePassword(user, data);
    setLoading(false);

    if (respondObj && respondObj.status !== 1) {
      message.info("Kata sandi berhasil diubah.");
      setUser(null);
      destroySession();
      sucessNotif();
      history.push("/login");
    } else if (respondObj?.status === 1) {
      setError(true);
    } else {
      message.error("Terjadi kesalahan saat mengubah password.");
    }
  };

  const oldPassChangeHandler = () => setError(false);

  const errorMsg = isError
    ? {
        validateStatus: "error",
        help: "Password lama tidak sama.",
      }
    : null;

  if (!user && !getSession()) {
    setMessage({
      type: "warning",
      message: "Peringatan",
      description: `Anda harus login terlebih dahulu untuk mengakses fitur ini`,
    });
    history.push("/");
    return null;
  } else {
    return (
      <>
        <Jumbotron
          src={formBackground}
          alt="Register Page"
          imgStyle={{ bottom: "-20%" }}
        />
        <div className="form-container">
          <h1>Ubah Password</h1>
          <Form onFinish={submitHandler} layout="vertical">
            <Form.Item
              label="Password Lama"
              name="current_password"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan password lama anda",
                },
              ]}
              style={{ marginTop: "5px" }}
              {...errorMsg}
            >
              <Input.Password
                prefix={<AiOutlineLock />}
                placeholder="Masukkan Password Lama"
                onChange={oldPassChangeHandler}
              />
            </Form.Item>
            <Form.Item
              label="Password Baru"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan password baru anda",
                },
              ]}
              style={{ marginTop: "5px" }}
              hasFeedback
            >
              <Input.Password
                prefix={<AiOutlineLock />}
                placeholder="Masukkan Password Baru"
              />
            </Form.Item>
            <Form.Item
              name="new_confirm_password"
              label="Konfirmasi Password Baru"
              dependencies={["new_password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Silahkan Konfirmasi Password Baru anda",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
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
                Ubah Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}
