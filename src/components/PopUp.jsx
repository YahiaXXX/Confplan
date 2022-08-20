import React, { useState, useEffect } from "react";
import "./Notification.css";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function PopUp({ id, refresh, setRefresh, trigger, pop, setPop, articleN }) {
  const [data, setData] = useState([]);
  const article = articleN;
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/conferences/reviewers/list/" + id)
      .then((response) => {
        setData(response["data"]);
      });
  }, []);

  const handleAdd = (id) => {
    axios
      .post("http://127.0.0.1:8000/articles/affect_article_to_reviewer", {
        article: article,
        user: id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.data.detail);
      });
  };

  const handleClass = (i) => {
    const item = document.getElementById(i);
    item.classList.add("clicked");
    item.setAttribute("disabled", "");
  };

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/* <div className="div_input">
          <input type="text" className="input_noti" placeholder="Search" />
        </div> */}
        <div className="div_items">
          {data.map((item, i) => (
            <div className="plus-reviewer-complet" >
              

              <div
                className="row_noti"
                key={i}
                id={i}
                onClick={() => {
                  setRefresh(!refresh);
                  handleAdd(item.id);
                  handleClass(i);
                }}
              >
                <div className="name_email">
                  <div className="name">
                    User:  {item.first_name} {item.family_name}
                  </div>
                  <div className="email">Email:  {item.email}</div>
                </div>

                <div className="categories">{item.fields_of_interssts}</div>
              </div>
              <div className="plus-reviewer" >
                <AddCircleOutlineIcon className="xx"
                onClick={() => {
                  setRefresh(!refresh);
                  handleAdd(item.id);
                  handleClass(i);
                }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          className="close-btn"
          onClick={() => {
            setPop(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopUp;
