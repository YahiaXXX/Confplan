import React, { useEffect } from "react";
import Login_Form from "../components/login/Login_Form";
import { useState } from "react";
import "../components/Signup/Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useIsMount } from "../hooks/UseIsMount";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

function Login2() {
  const [loading,setLoading]=useState(false)
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const navigate2 = useNavigate();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [bool, setBool] = useState(false);

  const isMount = useIsMount();

  // const [formInfo, setFormInfo] = useState({
  //   email: "",
  //   password: "",

  // })
  const [formErrors, setFormErrors] = useState({});

  // useEffect(()=>{

  //   if (localStorage.getItem('token')){
  //     const accessToken=localStorage.getItem('token')
  //     setAuth({accessToken});console.log('you are logged in');navigate2('/account');}
  //    else {console.log('you are not logged in')}
  // },[])

  // const verifyAdmin=()=>{
  //      axios.get('http://127.0.0.1:8000/users/profile').then((response)=>{
  //       if(response["data"]["is_admin"]==true) {navigate('/admin')}
  //       else {navigate('/account')}
  //   }
  //       )
  //   }
  useEffect(() => {
    if (!isMount) {
      // setLoading(false)
      if (Object.keys(formErrors).length !== 0){
        setLoading(false)
      }
      // if(Object.keys(formErrors)!=0){setLoading(false)}
      if (Object.keys(formErrors).length == 0) {
        axios
          .post("http://127.0.0.1:8000/users/login/token/", {
            email: user,
            password: pwd,
          })
          .then((response) => {
            const accessToken = response?.data?.access;
            const is_admin=response?.data?.is_admin
            setLoading(false)

            localStorage.setItem("is_admin", response.data.is_admin);
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("id", response.data.id);
            setAuth({accessToken,is_admin} );
            setUser("");
            setPwd("");
            if (response.data.is_admin === true) {
              navigate("/admin");
              window.location.reload()
            } else {
              navigate("/");
              window.location.reload()
            }
          }).catch(err=>{console.log(err.response.data.detail);
            setFormErrors({...formErrors,other:"invalid email or password"})
            setLoading(false)
          });
      }
    }
  }, [bool]);

   useEffect(()=>{

    if (localStorage.getItem("is_admin")==='true') {
      navigate2('/admin');
    }
    if(localStorage.getItem("is_admin")==='false'){
      navigate2('/')
    }
  

      },[])

  const handleSubmit = () => {
    setFormErrors(validate(user, pwd));
    setBool(!bool);
    console.log("submit")

  };

  const validate = (user, pwd) => {
    const errors = {};


    if (!user) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(user)) {
      errors.email = "Email invalid";
    }
    if (!pwd) {
      errors.password = "Required";
    } else if (pwd.length < 1) {
      errors.password = "password is too short";
    }
    return errors;
  };


  


  return (
    <div className="form-container">
      <div className="leftSide">
        <div className="header_login">
          <h3 className="title_login">SIGN IN TO YOUR ACCOUNT</h3>
        </div>
        <Login_Form
          user={user}
          pwd={pwd}
          setUser={setUser}
          setPwd={setPwd}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
         <div className="load" >
        {loading && <LoadingSpinner/>}
        </div>
        <button className="btn_login" onClick={()=>{handleSubmit();setLoading(true)}}>
          <p>Sign in</p>
          
        </button>
       
        

    
        
        
        <span className="login_text">
          <a href="./signup">don't have an account?</a>{" "}
        </span>
      </div>
      <div className="rightSide"></div>
    </div>
  );
}

export default Login2;
