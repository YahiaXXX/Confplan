import React, { useEffect } from "react";
import Login_Form from "./Login_Form";
import { useState } from "react";
import "./Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
function Login() {
  const { setAuth } = useAuth();
  const [res, setRes] = useState();
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setFormErrors(validate(formInfo));
    axios
      .post("http://127.0.0.1:8000/users/login/token/", {
        email: formInfo.email,
        password: formInfo.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.access);

        if (response.status == 200) {
          setIsSubmitted(true);
        } else {
          setRes(response.status);
        }
      });
  };

  useEffect(() => {
    if (isSubmitted) {
      navigate("/account");
    }
  });

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email invalid";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 1) {
      errors.password = "password invalid";
    }
    return errors;
  };
  return (
    <div className="form-container">
      <div className="leftSide">
        <div className="header">
          <h3>SIGN IN TO YOUR ACCOUNT</h3>
        </div>
        <Login_Form
          formInfo={formInfo}
          setFormInfo={setFormInfo}
          formErrors={formErrors}
        />
        <button className="btn" onClick={handleSubmit}>
          {" "}
          <p>Sign in</p>{" "}
        </button>
        <span className="login_text">
          {" "}
          <a href="./">don't have an account?</a>{" "}
        </span>
      </div>
      <div className="rightSide"></div>
    </div>
  );
}

export default Login;
