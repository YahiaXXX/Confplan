import "./Modal.css";
import "../conference/CreateConf.css";
import "../conference/Conf.css";
import "../conference/MainConf.css";

import ChatIcon from "@mui/icons-material/Chat";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";

import { notifications } from "../../data";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

function Modal({ setOpenModal }) {
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
  const [accepted, setAccepted] = useState(false);
  const [refused, setRefused] = useState(false);
  const host = "http://192.168.8.101:8000";
  const handleAccept = (conf_id, id) => {
    axios
      .post(host + "/conferences/accepte_to_review/" + id, {
        status: "accepted",
        // id: id,
      })
      .then((resp) => console.log("this is the resp " + resp));
    setAccepted(true);
    window.location.reload()
  };
  const handleRefuse = (conf_id, id) => {
    axios
      .post(host + "/conferences/accepte_to_review/" + id, {
        status: "refused",
        // id: id,
      })
      .then((resp) => console.log("this is the resp " + resp));
    setRefused(true);
    window.location.reload()

  };
  const [notif, setNotif] = useState(notifications);
  let navigate = useNavigate();

  const handleNotifications = (
    conference_id,
    id,
    invitation_status,
    request_to_edit_article_id,
    type
  ) => {
    if (type === "invitation") {
      navigate("../Conf/" + conference_id);
    } else if (type === "request_to_edit") {
      navigate("../EditFromRev/" + request_to_edit_article_id);
    }
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <CancelRoundedIcon
            fontSize="large"
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className="gg">
          {notif.map((nott) => {
            // const [acc, setAcc] = useState(false);
            // const [ref, setRef] = useState(false);
            const {
              conference_id,
              id,
              invitation_status,
              request_to_edit_article_id,
              type,
            } = nott;
            console.log(conference_id);
            console.log(id);
            return (
              <div
                
                className="notificationDiv"
              >
                <div className="icon">
                  <CircleNotificationsRoundedIcon
                    onClick={() => console.log("clicked")}
                    fontSize="large"
                  />
                </div>
                <div onClick={() => {
                  handleNotifications(
                    conference_id,
                    id,
                    invitation_status,
                    request_to_edit_article_id,
                    type
                  );
                }} className="subject">{nott.subject}</div>
                {nott.type === "request_to_edit" && (
                  <div className="icons">
                    <EditIcon fontSize="large" />
                  </div>
                )}
                {nott.type === "invitation" &&
                  nott.invitation_status === "pending" && (
                    <div className="icons">
                      {!refused && (
                        <div className="check">
                          <CheckCircleRoundedIcon
                            onClick={() => {
                              handleAccept(conference_id, id);
                              // console.log("clicked");
                            }}
                            color="red"
                            fontSize="large"
                          />
                        </div>
                      )}
                      {!accepted && (
                        <div className="uncheck">
                          <CancelRoundedIcon
                            onClick={() => {
                              handleRefuse(conference_id, id);
                            }}
                            fontSize="large"
                          />
                        </div>
                      )}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
        {/* <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      </div>
    </div>
  );
}

export default Modal;
