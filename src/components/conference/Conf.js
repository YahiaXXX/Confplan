import { HashLink as Link } from "react-router-hash-link";
import { useNavigate, useParams } from "react-router-dom";
import "./Conf.css";
import "./MainConf.css";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

import { conferences } from "./data";
import { useEffect, useState } from "react";
import axios from "axios";
import imageee from "./../account/conference.png"

function Conf() {
  const [loading, setLoading] = useState(true);
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
  const userId = localStorage.getItem("id");
  console.log("this is" + userId);

  const [conf, setConf] = useState({
    // categories: "Nature,earth,forests",
    // creator: "3e42babc-b7a5-4fcd-a55e-c6b676abdb56",
    // date_of_creation: "2022-06-15T17:36:50.479870Z",
    // description:
    //   "The Associate and Affiliate Members of EFI meet on annual basis at the Annual Conferences. The Associate Members have a right of vote at the Conference and they thus approve matters such as audited financial materials and work plans, and make decisions on the future plans and activities of EFI. (The only difference of the EFI member organisations is that the Affiliate Members do not have a right of vote.)",
    // end_date: "2022-07-02T12:00:00Z",
    // id: 63,
    // location: "Barcelona, Spain",
    // logo: "/media/logos/conf1.jpg",
    // name_of_host: "EFI",
    // reviewers: [],
    // site: "https://efi.int/membership/ac",
    // start_date: "2022-06-26T12:00:00Z",
    // start_submition_date: "2022-06-12T12:00:00Z",
    // status: "accepted",
    // submition_deadline: "2022-06-17T12:00:00Z",
    // title: "EFI 2022 Annual Conference",
  });

  const { id } = useParams();
  const host = "http://192.168.8.101:8000";
  const url = "http://127.0.0.1:8000/conferences/" + id;

  useEffect(() => {
    axios.get(url).then((resp) => {
      // if (resp.statusText === 200) {
      setConf(resp["data"]);
      console.log(resp["data"])
      setLoading(false);
      if (userId === id) {
        console.log("yes");
      }
      // }
    });
  }, []);
  console.log(conf.creator);
  let navigate_2 = useNavigate();
  let navigate = useNavigate();

  return (
    <main>
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
      {loading && <div className="loading">Loading...</div>}
      {!loading && (
        <div className="origDiv">
          <div className="confInfos">
          {conf.logo === "/media/hello" && (
                    <img src={imageee} alt={imageee} className="downn" />
                  )}
                  {conf.logo !== "/media/hello" && (
                    <img src={"http://192.168.8.101:8000"+conf.logo} alt={"http://192.168.8.101:8000"+conf.logo} className="downn" />
                  )}
            {/* <img src={host + conf.logo} alt={host + conf.logo} /> */}

            {userId === conf.creator && (
              <div
                className="editArticle"
                onClick={() => {
                  navigate("/EditConf/" + conf.id);
                }}
              >
                <EditIcon className="iconn"></EditIcon>
                <p>Edit Conference</p>
              </div>
            )}
            <div className="infoDetails">
              <LocationOnIcon className="iconn"></LocationOnIcon>
              <p>{conf.location}</p>
            </div>
            {/* <div className="infoDetails">
            <AlternateEmailIcon className="iconn"></AlternateEmailIcon>
            <p>{conf.adresse}</p>
          </div> */}
            <div className="infoDetails">
              <LanguageIcon className="iconn"></LanguageIcon>
              <p>{conf.site}</p>
            </div>
            <div className="infoDetails">
              <AccountBalanceIcon className="iconn"></AccountBalanceIcon>
              <p>{conf.name_of_host}</p>
            </div>
            <div className="infoDetails">
              <AccessTimeIcon className="iconn"></AccessTimeIcon>
              <p>Start date : {conf.start_date.substring(0, 10)}</p>
            </div>
            <div className="infoDetails">
              <AccessTimeFilledIcon className="iconn"></AccessTimeFilledIcon>
              <p>End date : {conf.end_date.substring(0, 10)}</p>
            </div>
            
            <div className="infoDetails">
              <AccessTimeFilledIcon className="iconn"></AccessTimeFilledIcon>
              <p>Submition date : {conf.start_submition_date.substring(0, 10)}</p>
            </div>
            <div className="infoDetails">
              <AccessTimeFilledIcon className="iconn"></AccessTimeFilledIcon>
              <p>Deadline : {conf.submition_deadline.substring(0, 10)}</p>
            </div>
            <hr></hr>
            {userId === conf.creator && (
              <div className="articles">
                <div className="pa" onClick={() => navigate("/pending/" + id)}>
                  Pending articles
                </div>
                <div
                  className="rr"
                  onClick={() => navigate("/reviewing/" + id)}
                >
                  Reviews results
                </div>
                <div className="aa" onClick={() => navigate("/accepted/" + id)}>
                  Accepted articles
                </div>
                <div className="asa" onClick={() => navigate("/table/" + id)}>
                  Assign articles
                </div>
              </div>
            )}

            {userId !== conf.creator && (
              <div className="btnparam">
                <button
                  className="apply-to-join"
                  onClick={() => navigate("/Conf/" + id + "/ApplyForm")}
                >
                  <p className="txt">Apply to join</p>
                </button>
              </div>
            )}
          </div>

          <div className="confdesc">
            <div className="confff">
            <h1>{conf.title}</h1>
            </div>
          
          <div className="conff">
            <p>{conf.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Conf;
