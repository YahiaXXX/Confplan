import React, { useEffect, useState } from "react";
import Form1 from "../components/Signup/Form1";
import Form2 from "../components/Signup/Form2";
import Check from "../components/Signup/Check";
import "../components/Signup/Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function Form() {

  const navigate=useNavigate()
  const [loading,setLoading]= useState(false)
  const [page, setPage] = useState(0);
  // const [isPrevious,setIsPrevious]= useState(false)
  const [isNext, setIsNext] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    familyname: "",
    email: "",
    password: "",
    passwordconfirmation: "",
    phonenumber: "",
    address: "",
    linkedin: "",
    interests: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [bool,setBool]=useState(false)

  const DisplayComponent = () => {
    if (page === 0) {
      return (
        <Form1
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      );
    } else if (page == 1)
      return (
        <Form2
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      );
  };

  const handleNext = () => {
    setFormErrors(validate(formData));
    setIsNext(true);
  };


  useEffect(()=>{
    if(Object.keys(formErrors).length!=0){setLoading(false)}
    if(Object.keys(formErrors).length==0){
      axios
      .post("http://127.0.0.1:8000/users/register/", {
        first_name: formData.firstname,
        family_name: formData.familyname,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phonenumber,
        full_adress: formData.address,
        linked_in_username: formData.linkedin,
        fields_of_interssts: formData.interests,
      })
      .then((response) => {
           console.log(response)
           setLoading(false)
           navigate('/check')
      
      }).catch(err=>{
        setLoading(false)
        console.log("err")
  
  
      });


    }
   



  },[bool])



  const handleSubmit = () => {
    setFormErrors(validate(formData));
    setBool(!bool)
    //request
  }
   

  useEffect(() => {
    console.log(isNext)
    console.log(formErrors)
    if (Object.keys(formErrors).length == 4 && isNext && page == 0) {
      setPage((currPage) => currPage + 1);
      setFormErrors({
        avoid_render: "",
      });
    }
    // if (Object.keys(formErrors).length == 0 && page == 1 && isSubmitted) {
    //   setPage((currPage) => currPage + 1);
    // }
  });

  const validate = (values) => {
    let errors = {};
    if (!values.firstname.trim()) {
      errors.firstname = "Required";
    }
    if (!values.familyname.trim()) {
      errors.familyname = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email invalid";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "Required";
    }

    if (!values.address) {
      errors.address = "Required";
    }
    if (!values.linkedin) {
      errors.linkedin = "Required";
    }
    if (!values.interests) {
      errors.interests = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "password invalid";
    }

    if (!values.passwordconfirmation) {
      errors.passwordconfirmation = "Required";
    } else if (values.password !== values.passwordconfirmation) {
      errors.passwordconfirmation = "password do not match";
    }

    return errors;
  };





  return (
    <div className="form">
      <div className="form-container">
        <div className="leftSide">
          <div className="header">
            <h3>CREATE NEW ACCOUNT</h3>
          </div>
          <div className="body">{DisplayComponent()}</div>

          {page == 0 || page == 1 ? (
            <div className="footer">
              <div className="buttons">
                <button
                  className="btn_next"
                  onClick={() => {
                    if (page == 0) {
                      handleNext();
                    } else {
                      handleSubmit();
                      setLoading(true)
                    }
                  }}
                >
                  {page == 0 ? <p>next</p> : <p>signIn</p>}
                </button>
              </div>
              <div className="loading-bar" >

              { loading &&  <LoadingSpinner/>}
              </div>
              

              <span className="login_text">
                <a href="./login">
                  Already have an account?
                </a>
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="rightSide"></div>
      </div>
    </div>
  );
}

export default Form;
