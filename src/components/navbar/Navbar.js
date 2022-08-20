import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

import { HashLink as Link } from "react-router-hash-link";

function Navbar() {
  let navigate = useNavigate();
  let navigate_2 = useNavigate();

  const handle = () => {
    navigate("/account");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <ul className="navbar_list">
        <Link to="/" className="link">
          <li className="list_item">Home</li>
        </Link>

        <li
          className="list_item"
          onClick={() => {
            navigate_2("/MainConf");
          }}
        >
          Conferences
        </li>

        <Link to="/#footer" smooth className="link">
          <li className="list_item">About us</li>
        </Link>
        <Link to="/#footer" smooth className="link">
          <li className="list_item">Contact us</li>{" "}
        </Link>

        <li className="list_item" onClick={handle}>
          Account
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
