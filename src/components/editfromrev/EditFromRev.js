import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditFromRev.css";

function EditFromRev() {
  
  const handleUpload = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };
  const [article, setArticle] = useState({});
  const token = localStorage.getItem("token");

  const modify = () => {
    console.log("yahah");
    let urll = "http://127.0.0.1:8000/articles/edit_article/" + article.article;
    let data = new FormData();
    data.append("article_url", file);
    data.append("request_to_edit", id);
    axios.post(urll, data).then((resp) => {
      console.log("done");
    });
  };
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
  const [date, setDate] = useState("");
  useEffect(() => {
    let url = "http://127.0.0.1:8000/articles/get/request_to_edit/" + id;
    axios.get(url).then((resp) => {
      console.log(resp)
      if (resp.status === 200) {
        let newArticle = {
          modification: resp["data"].modification,
          deadline: resp["data"].deadline,
          article: resp["data"].article,
        };
        setArticle(newArticle);

        // let x = article.deadline
        // console.log(x);
        // x.subString(0, 10);
        // setDate(x);
      }
    });
  }, []);

  const hiddenFileInput = React.useRef(null);
  const handleClickk = (event) => {
    hiddenFileInput.current.click();
  };

  const [file, setFile] = useState(null);

  return (
    <div className="edit-from-rev-container">
      <h2>Edit your article</h2>
      <div className="modification">
        <h3>To modify :</h3>
          
          
           <p>
        {article.modification}
          
          </p> 
      </div>
      <div className="deadline">Deadline : {article.deadline}</div>
      <button className="text" onClick={handleClickk}>
        {" "}
        <input
          style={{ display: "none" }}
          ref={hiddenFileInput}
          type="file"
          onChange={handleUpload}
          name="file_up"
        />
        Upload new file
      </button>
      {file !== null && file.name}

      <button className="btnadd" onClick={modify}>Confirm</button>
    </div>
  );
}
export default EditFromRev;