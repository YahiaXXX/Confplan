import React from "react";
import "./article_r.css";
import img from "../../img/Rectangle 5.png";

function ArticleR(props) {
  return (
    <div className="container_rr">
      <div className="left_item_r">
        <h4>{props.titre}</h4>
        <p className="left_item_text_r">{props.para}</p>
      </div>
      <div className="right_item_rr">
        <img src={props.image} className="photo_rr" />
      </div>
    </div>
  );
}

export default ArticleR;
