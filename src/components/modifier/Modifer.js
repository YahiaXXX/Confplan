import { useEffect, useState,useRef } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import "./modifier.css";
import axios from "axios";

const Modifier = (props) => {
  let host = "http://192.168.8.101:8000";
  const [objettt,setobjettt]=useState(props.objet)
  const [image,setimage]=useState(null)
  const hiddenFileInput = useRef(null);
  const handleUpload = (event) => {
    setimage(event.target.files[0]);
  
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
    objettt.profile_picture=image;
  };


  const Edit_profile=()=>{

    delete objettt.profile_picture


     
    axios.put(host+"/users/profile",objettt)
    .then((response)=>{
      console.log(response)
    })

    props.setbool2(!props.bool2)
    props.handelclickclose()

     
  }

useEffect(()=>{
  console.log(objettt)
})
  return (
    <div className="popup-boxx">
      <div className="boxx">
        <div className="titleCloseBtnn">
          <CancelRoundedIcon
            fontSize="large"
            onClick={props.handelclickclose}
          />
        </div>
        <div className="editt">
          <p>Edit Profile</p>
          <div className="change">
            <input
            type="text"
            className="input_prof"
            value={objettt.first_name}
            onChange={(e)=>setobjettt({...objettt,first_name:e.target.value})}
            />
          </div>
          <div className="change">
          <input
            type="text"
            className="input_prof"
            value={objettt.family_name}
            onChange={(e)=>setobjettt({...objettt,family_name:e.target.value})}
            />
          </div>
          <div className="change">
          <input
            type="text"
            className="input_prof"
            value={objettt.phone_number}
            onChange={(e)=>setobjettt({...objettt,phone_number:e.target.value})}
            />
          </div>
          <div className="change">
          <input
            type="text"
            className="input_prof"
            value={objettt.full_adress}
            onChange={(e)=>setobjettt({...objettt,full_adress:e.target.value})}
            />
          </div>
          <div className="change">
          <input
            type="text"
            className="input_prof"
            value={objettt.linked_in_username}
            onChange={(e)=>setobjettt({...objettt,linked_in_username:e.target.value})}
            />
          </div>
          <div className="change">
          <input
            type="text"
            className="input_prof"
            value={objettt.bio}
            onChange={(e)=>setobjettt({...objettt,bio:e.target.value})}
            />
          </div>
          {/* <div className="change">
          <button className="inp2" onClick={handleClick}>
            <p className="upload">
              Conference logo (image) <span></span>{" "}
              {<CloudUploadOutlinedIcon fontSize="large" />}
            </p>
          </button>
          <input
            ref={hiddenFileInput}
            type="file"
            onChange={handleUpload}
            style={{ display: "none" }}
          ></input>
          </div> */}
          <div className="change">
            <button className="edit_btn" onClick={Edit_profile}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modifier;
