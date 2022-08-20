import React, { useEffect, useState } from "react";
import "./MainConf.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import ReorderIcon from "@mui/icons-material/Reorder";
import SearchIcon from "@mui/icons-material/Search";
import { conferences } from "./data";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import Conf from "./Conf";
import axios from "axios";
import imagg from "./../account/conference.png"

import { format } from "date-fns";

function MainConf() {
  const [loading, setLoading] = useState(true);
  const [confs, setConfs] = useState(conferences);
  const token = localStorage.getItem("token");
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  let navigate_2 = useNavigate();
  let navigate = useNavigate();
  let navigate_3 = useNavigate();
  const url = "http://127.0.0.1:8000/conferences/list/path";
  useEffect(() => {
    axios.get(url).then((resp) => {
      console.log(resp["data"]);
      setConfs(resp["data"]);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <nav className="navbar_1">
        <ul className="navbar_list_1">
          <Link to="/" className="link">
            <li className="list_item_1">Home</li>
          </Link>

          <li
            className="list_item_1"
            onClick={() => {
              navigate_2("/MainConf");
            }}
          >
            Conferences
          </li>

          <Link to="/#footer" smooth className="link">
            <li className="list_item_1">About us</li>
          </Link>
          <Link to="/#footer" smooth className="link">
            <li className="list_item_1">Contact us</li>{" "}
          </Link>

          <li
            className="list_item_1"
            onClick={() => {
              navigate("/account");
            }}
          >
            Account
          </li>
        </ul>
      </nav>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="dv">
          <button className="btnn" onClick={() => navigate("/CreateCOnf")}>
            {" "}
            <p className="txt">Create Conference</p>
          </button>
          <button className="search   ">
            <SearchIcon fontSize="large"></SearchIcon>
          </button>
          <input type="text" className="inp" placeholder="Search"></input>
          <button className="filter">
            <FilterListIcon fontSize="large"></FilterListIcon>
            {/* <ReorderIcon fontSize="large"></ReorderIcon> */}
          </button>
        </div>
      )}
      {!loading && (
        <div className="originalConf">
          {confs.map((conf) => {
            const { id } = conf;
            return (
              <div
                className="confDiv"
                key={id}
                onClick={() => navigate_3("/Conf/" + id)}
              >
                <div className="test">
                  <div className="title">{conf.title}</div>

                  <div className="host">Hosted by {conf.name_of_host}</div>

                  <div className="host">
                    Date : {conf.start_date.substring(0, 10)} to{" "}
                    {conf.end_date.substring(0, 10)}
                  </div>

                  <div className="host">Location : {conf.location}</div>

                  <div className="category"> Category : {conf.categories}</div>
                </div>
                <div className="imgDiv">
                {conf.logo === "http://127.0.0.1:8000/media/hello" && (
                    <img src={imagg} alt={imagg} className="downnn" />
                  )}
                  {conf.logo !== "http://127.0.0.1:8000/media/hello" && (
                    <img src={conf.logo} alt={conf.logo} className="downnn" />
                  )}
                  {/* <img className="image" src={conf.logo} alt={conf.logo} /> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default MainConf;
