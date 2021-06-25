import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";
import "./header.css";

export default function Navbar() {
  const [darkTheme] = useContext(ThemeContext);

  return (
    <header className={darkTheme ? "dark" : "light"}>
      <nav>
        <ul>
          <li>
            <Link to="/">Tugas 9</Link>
          </li>
          <li>
            <Link to="/tugas10">Tugas 10</Link>
          </li>
          <li>
            <Link to="/tugas11">Tugas 11</Link>
          </li>
          <li>
            <Link to="/tugas12">Tugas 12</Link>
          </li>
          <li>
            <Link to="/tugas13">Tugas 13</Link>
          </li>
          <li>
            <Link to="/tugas14">Tugas 14</Link>
          </li>
          <li>
            <Link to="/tugas15">Tugas 15</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
