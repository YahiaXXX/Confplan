import React, { useEffect, useState, useRef, useContext } from "react";
import "./account.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { saveAs } from "file-saver";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import image_down from "./../../img/pdf.png";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LogoutIcon from "@mui/icons-material/Logout";
import { SocketContext } from "../../socket";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Modal from "../Notification/Modal";
import { notifications } from "../../data";
import EditIcon from "@mui/icons-material/Edit";
import Modifier from "../modifier/Modifer";
import logo from "./ profile.png";
import conf_logo from "./conference.png";
import LoadingSpinner from "../LoadingSpinner"

function Account() {
  const [not, setNot] = useState(notifications);
  const socket = useContext(SocketContext);
  const [loading,setLoading]=useState(false)

  socket.onmessage = function (e) {
    const obj = JSON.parse(e["data"]);
    for (let i = 0; i < obj.notifications.length; i++) {
      notifications.push(obj.notifications[i]);
      console.log(obj.notifications[i]);
    }
    setNot(obj.notifications);
    console.log("done");
  };

  // console.log("this is the data " + data);
  let host = "http://127.0.0.1:8000";
  let navigate = useNavigate();
  let navigate_2 = useNavigate();
  let navigate_4 = useNavigate();
  let navigate_5 = useNavigate();
  let navigate_6 = useNavigate();

  const token = localStorage.getItem("token");
  const navigate2 = useNavigate();

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // for upload image

  const [data_profile, setdata_profile] = useState({});
  let path = "";
  const [bool, setbool] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [bool2, setbool2] = useState(false);
  const handleClickk = (event) => {
    hiddenFileInput.current.click();
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    // window.location.reload();
  };
  const [image, setImage] = useState(null);
  const [boool,setboool]=useState(true)
  const handleUpload = (event) => {
    // isImage = true;
    setImage(event.target.files[0]);
    // setLogo(event.target.files[0]);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const hiddenFileInput = React.useRef(null);

  // const uploadImage = (e) => {
  //   const data = new FormData();
  //   data.append("profile_picture", e.target.files[0]);
  //   console.log(data);
  //   path = e.target.path;
  //   axios.put(host + "/users/profile", data, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // };

  // useEffect(()=>{
  //  uploadImage()
  // },[bool])

  // const [file, setFile] = useState();
  // function handleChange(e) {
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  useEffect(() => {
    setLoading(true)
    axios
      .get(host + "/users/profile")
      .then((reponse) => {
        setdata_profile(reponse["data"]);
        setLoading(false)
      })
      .catch((err) => {});
  }, [bool2]);

  // const refreshPage = ()=>{
  //     window.location.reload();
  //  }
  //my articles
  const [article, setarticle] = useState([]);

  const upload = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("profile_picture", image);
    axios.put("http://127.0.0.1:8000/users/profile", data).then((resp) => {
      console.log(resp["data"]);
    });
  };
  useEffect(() => {
    // const socket = new WebSocket(
    //   "ws://192.168.8.101:8000/ws/socket-server/?token=" + token
    // );
    // socket.onmessage = function (e) {
    //   const obj = JSON.parse(e["data"]);
    //   console.log(obj.notifications.length);

    //   for (let i = 0; i < obj.notifications.length; i++) {
    //     notifications.push(obj.notifications[i]);
    //   }
    //   // console.log("all notifications");
    //   // for(let i = 0;i<obj.notifications.length-1;i++){
    //   //   for(let y = 0; y<obj.notifications)
    //   // }
    //   // if (notifications.length > 1) {
    //   //   for (let i = 0; i < notifications.length; i++) {
    //   //     for (let x = 0; x < obj.notifications.length; x++) {
    //   //       if (notifications[i].id === obj.notifications[x].id) {
    //   //         notifications.pop(obj.notifications[x]);
    //   //       }
    //   //     }
    //   //   }
    //   // }
    //   setNot(obj.notifications);

    //   console.log(not);
    // };
    axios
      .get(host + "/articles/list/path")
      .then((artc) => {
        setarticle(artc["data"]);
      })
      .catch((err) => {});
  }, [socket]);

  const saveFile = (urll) => {
    saveAs(urll, "article.pdf");
  };

  const Getartcl = ({ data }) => {
    const ref = useRef(null);
    return (
      <>
        {data.map((cle) => {
          return (
            <>
              <div
                onClick={() => {
                  navigate_5("/account/EditArticle/" + cle.id);
                }}
                className="confDiv_1"
                ref={ref}
                key={cle.conference_id}
              >
                <div className="info">
                  <div className="test_1">
                    <div className="title_1">{cle.title}</div>
                    <div className="host_1">
                      <h5>
                        {cle.conference_id.title} - {cle.date_of_creation}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="etat">
                  {cle.status === "pending" ? (
                    <HistoryIcon className="icon1" />
                  ) : cle.status === "accepted" ? (
                    <CheckCircleOutlineIcon className="icon2" />
                  ) : cle.status === "refused" ? (
                    <DoDisturbIcon className="icon3" />
                  ) : cle.status === "accepted to review" ? (
                    <HourglassBottomIcon className="icon4" />
                  ) : cle.status === "waiting for authors" ? (
                    <HourglassTopIcon className="icon5"/>
                  ):""}
                </div>
                <div className="downfile2">
                  <img
                    src={image_down}
                    alt=""
                    onClick={() => saveFile(cle.article_url)}
                    className="down22"
                  />
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  // my conferences
  const [confs, setconfs] = useState([]);
  useEffect(() => {
    axios
      .get(host + "/conferences/conferences_creator/list/path")
      .then((conf) => {
        setconfs(conf["data"]);
      });
  }, []);

  const Getconfs = ({ data }) => {
    const ref = useRef(null);
    return (
      <>
        {data.map((cle) => {
          return (
            <>
              <div className="confDiv_2" ref={ref} key={cle.id}>
                <div className="info_2">
                  <div className="test_2">
                    <div className="title_2">{cle.title}</div>
                    <div className="host_2">
                      <h5>
                        {cle.name_of_host},{cle.location} - {cle.start_date} ,{" "}
                        {cle.end_date}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="etat_2">
                  {cle.status === "pending" ? (
                    <HistoryIcon className="icon1" />
                  ) : cle.status === "accepted" ? (
                    <CheckCircleOutlineIcon className="icon2" />
                  ) : cle.status === "refused" ? (
                    <DoDisturbIcon className="icon3" />
                  ) : cle.status === "accepted to review" ? (
                    <HourglassBottomIcon className="icon4" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="downfile_2">
                  {cle.logo === "http://127.0.0.1:8000/media/hello" && (
                    <img src={conf_logo} alt={conf_logo} className="down" />
                  )}
                  {cle.logo !== "http://127.0.0.1:8000/media/hello" && (
                    <img src={cle.logo} alt={cle.logo} className="down" />
                  )}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  // waiting for reviewr
  const [waiting, setwaiting] = useState([]);
  useEffect(() => {
    axios.get(host + "/articles/listforreviewer/path").then((reslt) => {
      setwaiting(reslt["data"]);
    });
  }, []);

  const Getwait = ({ data }) => {
    const ref = useRef(null);
    return (
      <>
        {data.map((cle) => {
          const { id } = cle;
          return (
            <>
              <div
                className="confDiv_3"
               
              >
                <div className="info_3">
                  <div className="test_3">
                    <div className="title_3">{cle.title}</div>
                    <div className="host_3">
                      <h5>
                        {cle.conference_id.title} - {cle.start_date}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="downfile_3">
                
                  <button className="btnnn"  key={id}
                onClick={() => navigate_4("/Edit_art/" + id)}>Write report</button>
                  <img
                    src={image_down}
                    alt=""
                    onClick={() => saveFile(cle.article_url)}
                    className="down2"
                  />
                 
                 
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  //tableau (viewpager)
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div className="nnn">
      {loading && <div className="bb"><LoadingSpinner/><p>   Loading...</p></div>}
      {isOpen && (
        <Modifier
          setbool2={setbool2}
          bool2={bool2}
          objet={data_profile}
          handelclickclose={togglePopup}
        />
      )}
      {!isOpen && (
        <div className="account_page" id="account">
          {!isOpenModal && (
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
                <li
                  className="list_item_1"
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  <CircleNotificationsIcon
                    onClick={() => setOpenModal(true)}
                  ></CircleNotificationsIcon>
                </li>
              </ul>
            </nav>
          )}
            
          <div className="proff">
            {isOpenModal && <Modal setOpenModal={setOpenModal}></Modal>}

            {/* {isOpen && <Modifier handelclickclose={togglePopup} />} */}
            {!isOpenModal && (
              <div className="container_acc">
                <div className="container_acc_l">
                  {/*  ////////////////////////////// */}
                  <div className="container_acc_l_logo">
                    <div class="containerr">
                      {image !== null && (
                        <img
                          src={URL.createObjectURL(image)}
                          alt={URL.createObjectURL(image)}
                          className="profile_pic"
                        />
                      )}
                      {image === null &&
                        data_profile.profile_picture === null && (
                          <img
                            onClick={handleClick}
                            src={logo}
                            alt={logo}
                            className="profile_pic"
                          />
                        )}
                      {!image && data_profile.profile_picture !== null && (
                        <img
                          onClick={handleClick}
                          src={host + data_profile.profile_picture}
                          alt={host + data_profile.profile_picture}
                          className="profile_pic"
                        />
                      )}
                      <div class="middle">
                        <button class="text" onClick={handleClickk}>
                          {" "}
                          <input
                            style={{ display: "none" }}
                            ref={hiddenFileInput}
                            type="file"
                            onChange={handleUpload}
                            name="file_up"
                          />
                          Modifier
                        </button>
                      </div>
                    </div>
                    <div className="form-controll"></div>
                    <div className="ddd">
                      {image && (
                        <button
                          className="btn_upload"
                          onClick={(e) => {
                            upload(e);
                          }}
                        >
                          Upload photo
                        </button>
                      )}
                    </div>
                  </div>

                  {/* //////////////////////////////////////////////////// */}

                  <div className="container_acc_l_info">
                    <div className="profile_info_sta">
                      <h1 className="nom">
                        {data_profile.family_name} {data_profile.first_name}
                      </h1>
                      <h6 className="bioo">{data_profile.bio}</h6>
                    </div>
                    <div className="profile_info_det">
                      <div className="profile_info_det_div">
                        <LocationOnIcon className="icon"></LocationOnIcon>
                        <p> {data_profile.full_adress}</p>
                      </div>
                      <div className="profile_info_det_div">
                        <AlternateEmailIcon className="icon_p"></AlternateEmailIcon>
                        <p>{data_profile.email}</p>
                      </div>
                      <div className="profile_info_det_div">
                        <PhoneIcon className="icon_p"></PhoneIcon>
                        <p>{data_profile.phone_number}</p>
                      </div>
                      <div className="profile_info_det_div">
                        <LinkedInIcon className="icon_p"></LinkedInIcon>
                        <p>{data_profile.linked_in_username}</p>
                      </div>
                      <div className="profile_info_det_div">
                        <EditIcon className="icon_p"></EditIcon>
                        <p className="edit_p" onClick={togglePopup}>
                          Edit Profile
                        </p>
                      </div>
                      <div className="profile_info_det_div">
                        <LogoutIcon className="icon_p"></LogoutIcon>
                        <p
                          className="pppp"
                          onClick={() => {
                            localStorage.clear();
                            navigate_6("/login");
                            window.location.reload();
                          }}
                        >
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container_acc_r">
                  {/* {isOpen && <Modifier handelclickclose={togglePopup} />} */}
                  <div className="bloc-tabs">
                    <div
                      className={
                        toggleState === 1 ? "tabs active-tabs" : "tabs"
                      }
                      onClick={() => toggleTab(1)}
                    >
                      My Articles
                    </div>
                    <div
                      className={
                        toggleState === 2 ? "tabs active-tabs" : "tabs"
                      }
                      onClick={() => toggleTab(2)}
                    >
                      Conferences
                    </div>
                    <div
                      className={
                        toggleState === 3 ? "tabs active-tabs" : "tabs"
                      }
                      onClick={() => toggleTab(3)}
                    >
                      waiting for review
                    </div>
                  </div>
                  <div className="content-tabs">
                    <div
                      className={
                        toggleState === 1
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <Getartcl data={article} />
                    </div>

                    <div
                      className={
                        toggleState === 2
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <Getconfs data={confs} />
                    </div>

                    <div
                      className={
                        toggleState === 3
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <Getwait data={waiting} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
