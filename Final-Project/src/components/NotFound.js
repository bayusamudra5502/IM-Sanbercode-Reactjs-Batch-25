import React from "react";
import erro404 from "../assets/img/404.svg";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function NotFound() {
  return (
    <div className="error-container">
      <div className="error">
        <div className="img">
          <img src={erro404} alt="Error 404" />
        </div>
        <div className="message">
          <h1>Oops</h1>
          <p>Sepertinya kamu nyasar. Halaman yang kamu tuju tidak ada.</p>
          <Link to="/">
            <Button type="primary">Kembali ke Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
