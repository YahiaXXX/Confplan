import React, { useEffect, useState, useRef } from "react";
import "./edit_art.css";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { saveAs } from "file-saver";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import Popup from "../popup/Popup";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
var idd = "x";

var objett = {};

function Edit_art() {
  let navigate_100 = useNavigate();
  var [dics, setDics] = useState([]);
  const [dic, setDic] = useState([
    //   {
    //   question:"",
    //   answer:null,
    // }
  ]);
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
  const { id } = useParams();
  let host = "http://192.168.8.101:8000";
  let navigate = useNavigate();
  let navigate_2 = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  ////////first part righ

  const [item, setartt] = useState({});
  useEffect(() => {
    let url2 = host + "/articles/" + id;
    axios
      .get(url2)
      .then((artts) => {
        idd = artts["data"].conference_id;
        setartt(artts["data"]);
        let url = host + "/report/question/" + idd;
        axios.get(url).then((resp) => {
          setqst(resp["data"]);
          console.log(resp["data"]);
          for (let i = 0; i < resp["data"].length; i++) {
            let x = {};
            dic.push({ question: resp["data"][i].id, answer: null });
            console.log(dic);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveFile = (urlll) => {
    saveAs(urlll, "article.pdf");
  };

  const [qst, setqst] = useState([]);
  const [valeur, setvaleur] = useState(false);

  const changeetat = (e, i) => {
    dic[i].answer = e;
    setDics(dic);

    //  console.log(valeur);
  };

  const Question = ({ data }) => {
    return (
      <div>
        {data.map((q, i) => {
          return (
            <form>
              <div className="qst_box">
                <div className="qs">
                  <p>. {q.question}</p>
                </div>
                <div className="chek">
                  <input
                    type="radio"
                    id="html"
                    name="answer"
                    value="true"
                    onChange={() => changeetat(true, i)}
                  />
                    <label for="html">YES</label> {" "}
                  <input
                    type="radio"
                    id="css"
                    name="answer"
                    value="false"
                    onChange={() => changeetat(false, i)}
                  />
                    <label for="css">NO</label>
                </div>
              </div>
            </form>
          );
        })}
      </div>
    );
  };

  const tabletri = () => {
    let x = dics.filter((item) => item.answer != null);
    setDics(x);
    console.log(x);
    objett = dics;
    console.log(objett);
    return x;
  };

  const [cmnt, setcmnt] = useState("");
  const [score, setscore] = useState(0);
  const [done, setdone] = useState(false);
  const  [bool,setbool]=useState(false)

  const hh = (e) => {
    setdone(!done);
  };

  const putscor = (e) => {
    // e.preventDefault();

    setscore(e);
  };

  const changecmnt = (e) => {
    // e.preventDefault();
    setcmnt(e);
  };

  useEffect(() => {
    let objet = {
      remark: cmnt.toString(),
      score: score,
      review_done: done,
      article: id,
      answers: tabletri(),
    };
    console.log(objet);
    axios.post(host + "/report/report/", objet).then((rr) => {
      // navigate_100("/account");
      setbool(!bool)
      console.log(rr);
    });
  }, [done]);

  return (
    <div className="edit_page">
      {isOpen && <Popup handelclickclose={togglePopup} />}
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
              <p>{item.title}</p>
            </div>
            <div className="down_art">
              <div className="down_f">
                <DownloadIcon id="hh" />
              </div>
              <div className="pp">
                <p onClick={() => saveFile(item.article_url)}>
                  Download article
                </p>{" "}
              </div>
            </div>
            <div className="descrep_part">
              <p>{item.description}</p>
            </div>

            <div className="catego">
              <p>{item.categories}</p>
            </div>
          </div>
        </div>
        <div className="edit_l">
          <div className="qsss">
            <div className="give_qst">
              <Question data={qst} />
              <div className="scr_50">
                <div className="scr_p">
                  <p>. From 0 to 100 whats your rating for the article ?</p>
                </div>
                <div className="scr_inp">
                  <div className="scr_inp_inp">
                    <form>
                      <input
                        type="number"
                        max={100}
                        min={0}
                        className="innp"
                        onChange={(event) => putscor(event.target.value)}
                      />
                    </form>
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
                onChange={(e) => changecmnt(e.target.value)}
                placeholder="Comment"
              />
            </div>
            <div className="space_btn">
              <div className="Submit_div">
                <button className="Submit_btn" onClick={hh}>
                  <p>Submit result</p>
                </button>
              </div>
              <div className="Edit_div">
                <button className="Edit_btn" onClick={togglePopup}>
                  <p>Ask Edit article</p>
                </button>
                {isOpen && <Popup handelclickclose={togglePopup} />}
              </div>
              {bool&&(
              <div class="alert">
                <span
                  class="closebtn"
                  // onclick="this.parentElement.style.display='none';"
                >
                  &times;
                </span>
                <strong>Success!</strong> your report is submited
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit_art;
