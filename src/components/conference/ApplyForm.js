import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { authors } from "./data";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./CreateConf.css";
import "./MainConf.css";
import "./ApplyForm.css";
import { set } from "date-fns";
import { subMinutes } from "date-fns/fp";
import axios from "axios";
let SubmitIndex = 0;
let isSubmit = false;
let index = 0;
let submitError = false;
function ApplyForm() {
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
  let navigate = useNavigate();
  let navigate_2 = useNavigate();
  const initialValues = {
    title: "",
    categories: "",
  };
  const handle = (e, index) => {
    const { name, value } = e.target;
    const list = [...authorss];
    list[index][name] = value;
    setAuthorss(list);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [textarea, setTextarea] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [authorErrors, setauthorErrors] = useState([]);
  const validateAuthorErrors = (authorss) => {
    const errors = [];
    for (let index = 0; index < authorss.length; index++) {
      errors[index] = {};
      if (!authorss[index].first_name) {
        errors[index].first_name = "* First name is required";
      }
      if (!authorss[index].last_name) {
        errors[index].last_name = "* Last name is required";
      }
      if (!authorss[index].email) {
        errors[index].email = "* Email is required";
      }
    }
    return errors;
  };
  const [form, setForm] = useState(initialValues);
  const [descErrors, setDescErrors] = useState("");
  const [showAuthors, setShowAuthors] = useState(false);
  let [authorss, setAuthorss] = useState(authors);
  const [indexx, setIndexx] = useState(authors.length);
  const [submit, setSubmit] = useState(-1);
  const [formValues, setFormValues] = useState(initialValues);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const removeAuthor = (id) => {
    authorss = authorss.filter((author) => author.id !== id);
    setAuthorss(authorss);
    index--;
    setIndexx(index - 1);
    authorErrors.pop();
    if (authorss.length === 0) {
      setShowAuthors(false);
    }
  };
  const handleAdd = (e) => {
    e.preventDefault();
    index++;
    setIndexx(index - 1);

    let newAuthors = authorss;
    newAuthors.push({
      id: index,
      first_name: "",
      last_name: "",
      email: "",
    });

    let newError = authorErrors;
    newError.push({});
    setauthorErrors(newError);
    setAuthorss(newAuthors);
    setShowAuthors(true);
  };

  const handleChange = (event) => {
    setTextarea(event.target.value);
  };

  const validateDesc = (desc) => {
    let error = "";
    if (!desc) {
      error = "* Description is required";
    }
    if (desc.split(" ").length > 499) {
      error = "* Description should at most take 500 words";
    }

    return error;
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  const [file, setFile] = useState(null);

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "* Title is required";
    }
    if (!values.categories) {
      errors.categories = "* At least one category is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    isSubmit = true;

    e.preventDefault();
    setFormErrors(validateForm(formValues));
    setDescErrors(validateDesc(textarea));
    setauthorErrors(validateAuthorErrors(authorss));
    // setSubmit(-2);
  };

  useEffect(() => {
    // console.log(SubmitIndex);
    console.log(authorErrors);
    if (
      Object.keys(formErrors).length !== 0 ||
      descErrors.length !== 0
      //  ||
      // authorErrors.length !== 0
    ) {
      console.log("false");
      submitError = true;
      return;
    } else {
      submitError = false;
    }

    if (SubmitIndex > 0 && !submitError && isSubmit) {
      // setIsLoading(true);
      console.log("success");
      authorss.forEach((object) => delete object["id"]);
      setAuthorss(authorss);
      console.log(authorss);

      console.log("this is the id " + id);
      try {
        setIsLoading(true);
        console.log("isLoading should be true" + isLoading.toString());

        let bodyFormData = {
          title: formValues.title.toString(),
          description: textarea.toString(),
          categories: formValues.categories.toString(),
          conference_id: id,
          authors: authorss,
        };

        console.log(bodyFormData);

        axios
          .post("http://127.0.0.1:8000/articles/", bodyFormData)
          .then((res) => {
            let id = res.data["id"];
            let data = new FormData();
            data.append("article_url", file);
            console.log(data);
            axios
              .post("http://127.0.0.1:8000/articles/upload_article/" + id, data)
              .then((resp) => {
                console.log(resp.status);
              });
          });
      } catch (error) {
        console.log("this is " + error.toString());
      }
      setIsLoading(false);
      console.log("isLoading is " + isLoading.toString());
    } else if (submitError) {
      console.log("failure");
    }
    SubmitIndex++;
    isSubmit = false;
  }, [isSubmit]);

  const { id } = useParams();

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
      <div className="testDiv">
        <h1 className="crtext">Apply to a conference</h1>
        <form className="principalDiv" onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            className="inp2"
            placeholder="Article title"
            value={formValues.title}
            onChange={handleForm}
          ></input>
          <p className="pp">{formErrors.title}</p>
          <textarea
            name="description"
            className="spec"
            value={textarea}
            onChange={handleChange}
            placeholder="Description"
          />
          <p className="pp">{descErrors}</p>

          <input
            name="categories"
            type="text"
            className="inp2"
            placeholder="Categories"
            value={formValues.categories}
            onChange={handleForm}
          ></input>
          <p className="pp">{formErrors.categories}</p>

          <button className="inp2" onClick={handleClick}>
            <p className="upload">
              Article(docs, pdf)<span></span>{" "}
              {<CloudUploadOutlinedIcon fontSize="large" />}
            </p>
          </button>
          <input
            ref={hiddenFileInput}
            type="file"
            onChange={handleUpload}
            style={{ display: "none" }}
          ></input>

          <div className="originalReviewer">
            {indexx != index &&
              authorss.map((author, index) => {
                const { id } = author;
                return (
                  <div className="authorDiv" key={id}>
                    <div className="author-info">
                      <input
                        name="first_name"
                        type="text"
                        className="author-info-input"
                        placeholder="Author first name"
                        value={author.first_name}
                        onChange={(e) => handle(e, index)}
                      ></input>
                      <div className="errorDiv">
                        {authorErrors[index].first_name}
                      </div>
                      <input
                        name="last_name"
                        type="text"
                        className="author-info-input"
                        placeholder="Author last name"
                        value={author.last_name}
                        onChange={(e) => handle(e, index)}
                      ></input>
                      <div className="errorDiv">
                        {authorErrors[index].first_name}
                      </div>
                      <input
                        name="email"
                        type="text"
                        className="author-info-input"
                        placeholder="Author email"
                        value={author.email}
                        onChange={(e) => handle(e, index)}
                      ></input>
                      <div className="errorDiv">
                        {authorErrors[index].first_name}
                      </div>
                    </div>
                    <div className="logo">
                      <div className="logo2">
                        <AccountCircleIcon id="logo22" />
                      </div>
                      <button
                        className="removebtn2"
                        onClick={() => removeAuthor(id)}
                      >
                        <p>Remove</p>
                      </button>
                    </div>
                  </div>
                );
              })}
            {!showAuthors && <h3>Add authors here</h3>}
            <button className="add" onClick={handleAdd}>
              <AddOutlinedIcon fontSize="large" />
            </button>
          </div>

          {/* <p className="pp">{reviewerTotal}</p> */}

          <button type="submit" className="btnn" onClick={() => setSubmit(0)}>
            {!isLoading ? (
              <p className="txt">Submit</p>
            ) : (
              <p className="txt">Loading ...</p>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default ApplyForm;
