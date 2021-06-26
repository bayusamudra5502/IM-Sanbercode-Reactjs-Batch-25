import React from "react";

export default function About() {
  return (
    <div className="about">
      <h1 style={{ textAlign: "center" }}>
        Data Peserta Sanbercode Bootcamp Reactjs
      </h1>
      <ol>
        <li>
          <strong>Nama : </strong>Bayu Samudra
        </li>
        <li>
          <strong>Email : </strong>bayusamudra.55.02.com@gmail.com
        </li>
        <li>
          <strong>Sistem Operasi yang dipakai : </strong>Ubuntu 20.04 (Linux)
        </li>
        <li>
          <strong>Akun Github : </strong>bayusamudra5502 (
          <a
            href="https://github.com/bayusamudra5502"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/bayusamudra5502
          </a>
          )
        </li>
        <li>
          <strong>Akun Telegram : </strong>@bayusamudra5502
        </li>
      </ol>
    </div>
  );
}
