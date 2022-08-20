import React, { useEffect, useState, useRef } from "react";
import "./raport.css";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { saveAs } from "file-saver";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
var idd = "x";

function Raport() {
  const { id } = useParams();
  console.log(id);
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

  let host = "http://192.168.8.101:8000";
  let navigate = useNavigate();
  let navigate_2 = useNavigate();

  const [raport, setraport] = useState({});
  const [art, setart] = useState({});
  const [state, setstate] = useState([]);

  useEffect(() => {
    // let url2 = host + "​/report​/report​/"+id ;
    // console.log(url2)
    axios
      .get("http://127.0.0.1:8000/report/report/" + id)
      .then((artts) => {
        idd = artts["data"].article;
        console.log("ggg" + idd);
        setraport(artts["data"]);
        setstate(artts["data"].answers);
        console.log(artts["data"]);
        let url = host + "/articles/" + idd;
        axios.get(url).then((resp) => {
          setart(resp["data"]);
          console.log(resp["data"]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveFile = (urlll) => {
    saveAs(urlll, "article.pdf");
  };

  const Question = ({ data }) => {
    return (
      <div>
        {data.map((q) => {
          return (
            <form>
              <div className="qst_box">
                <div className="qs">
                  <p>. {q.question.question}</p>
                </div>
                <div className="chek">
                  {q.answer === true && (
                    <input
                      type="radio"
                      id="html"
                      name="answer"
                      value=""
                      checked
                    />
                  )}
                    <label for="html">YES</label> {" "}
                  {q.answer === false && (
                    <input
                      type="radio"
                      id="css"
                      name="answer"
                      value="false"
                      checked
                    />
                  )}
                    <label for="css">NO</label>
                </div>
              </div>
            </form>
          );
        })}
      </div>
    );
  };

  return (
    <div className="edit_page">
      <div className="fornav">
        <nav className="navbar_11">
          <ul className="navbar_list_11">
            <Link to="/" className="link">
              <li className="list_item_11">Home</li>
            </Link>

            <li
              className="list_item_11"
              onClick={() => {
                navigate_2("/MainConf");
              }}
            >
              Conferences
            </li>

            <Link to="/#footer" smooth className="link">
              <li className="list_item_11">About us</li>
            </Link>
            <Link to="/#footer" smooth className="link">
              <li className="list_item_11">Contact us</li>{" "}
            </Link>

            <li
              className="list_item_11"
              onClick={() => {
                navigate("/account");
              }}
            >
              Account
            </li>
          </ul>
        </nav>
      </div>

      <div className="edit_content">
        <div className="edit_r">
          <div className="infoart">
            <div className="titre_art">
              <p>{art.title}</p>
            </div>
            <div className="down_art">
              <div className="down_f">
                <DownloadIcon id="hh" />
              </div>
              <div className="pp">
                <p onClick={() => saveFile(art.article_url)}>
                  Download article
                </p>{" "}
              </div>
            </div>
            <div className="descrep_part">
              <p>{art.description}</p>
            </div>

            <div className="catego">
              <p>{art.categories}</p>
            </div>
          </div>
        </div>
        <div className="edit_l">
          <div className="qsss">
            <div className="give_qst">
              <Question data={state} />
              <div className="scr_50">
                <div className="scr_p">
                  <p>. From 0 to 50 whats your rating for the article ?</p>
                </div>
                <div className="scr_inp">
                  <div className="scr_inp_inp">
                    <p
                      // value={raport.score}
                      className="innpp"
                    >
                      {raport.score}
                    </p>
                  </div>
                  <div className="scr_inp_50">/100</div>
                </div>
              </div>
            </div>
          </div>
          <div className="cmm">
            <div className="space_cmnt">
              <textarea
                name="description"
                className="spec_art"
                value={raport.remark}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Raport;
