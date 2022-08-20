import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Admin.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import {
  faLock,
  faLockOpen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function AdminUsers({setBool2,bool2}) {
  const navigate=useNavigate()
  const [bool, setBool] = useState(false);
  const accesToken = localStorage.getItem("token");


const VerifyToken=(token)=>{
   
    axios.post("http://127.0.0.1:8000/api/token/verify/",{token:token}).then(
        response=>{
          if (response.status===401){
            console.log('expired')
            
          }else {console.log('still valable')}
        
        
        }
    ).catch(err=>{
      localStorage.removeItem("token");
      localStorage.removeItem("is_admin");
      localStorage.removeItem("id");

      navigate("/login")
     

    }) 
  }







  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${accesToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/users/listforadmin/path")
      .then((response) => {setData(response["data"])})
    
  }, [bool,bool2]);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/users/listforadmin/path")
  //     .then((response) => setData(response["data"]));
  // }, []);



  useEffect(() => {
    if (q===""){
      axios
      .get("http://127.0.0.1:8000/users/listforadmin/path")
      .then((response) => setData(response["data"]));
      console.log('sans search')

    }
    else {
      axios
      .get("http://127.0.0.1:8000/users/listforadmin/path?search=" + q)
      .then((response) => setData(response["data"]));
      console.log('search')
    }
    // axios
    //   .get("http://127.0.0.1:8000/users/listforadmin/path?search=" + q)
    //   .then((response) => setData(response["data"]));
  }, [q]);


  
  const handleDelete = (id) => {
  
    axios.delete("http://127.0.0.1:8000/users/admin/" + id).then((response) => {
      if (response.status === 200) {
        setBool(!bool);
      }
    });
  };
  const handleBlock = (id) => {
    VerifyToken(accesToken)
    axios
      .put("http://127.0.0.1:8000/users/admin/" + id, { is_active: false })
      .then((response) => {
        if (response.status == 200) {
          setBool(!bool);
  
        }
      });
  };
  const handleDeblock = (id) => {
    VerifyToken(accesToken)
    axios
      .put("http://127.0.0.1:8000/users/admin/" + id, { is_active: true })
      .then((response) => {
        if (response.status == 200) {
          setBool(!bool);
        }
      });
  };

  
  // useEffect(()=>{
    
  //   // if (VerifyToken(accesToken)!==200){
  //   //   navigate("/login")

  //   // }
  //  VerifyToken(accesToken)

   
  //  },[verify])
   

  return (


 <div className="page-users">
     
        <div className="inputcomplet-users">
          <input
            placeholder="Search"
            className="inputfilter-users"
            type="text"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
          />
        </div>
   

     <div className="table-users" >
     <table className="sss" cellPadding="0" cellSpacing="0" >
      <thead>
        <tr>
          <th> <div className="hdr" >Username</div> </th>
          <th> <div className="hdr" >Actions</div> </th>
          <th> <div className="hdr" > Profile</div></th>
        </tr>
      </thead>

      <tbody>
        {data.map((column, i) => (
          <tr key={i}>
            <td>
              <div>{column.first_name} {column.family_name}</div>
              
            </td>
            <td className="icons">
              <div className="actions" >
              {column.is_active ? (
                <div className="act" ><FontAwesomeIcon
                icon={faLock}
                className="icon-close"
                onClick={() => handleBlock(column.id)}
              /></div>
                
              ) : (
                <div className="act" ><FontAwesomeIcon
                icon={faLockOpen}
                className="icon-open"
                onClick={() => handleDeblock(column.id)}
              /></div>
                
              )}
                <div className="act" > <FontAwesomeIcon
                icon={faTrashCan}
                className="icon-delete"
                onClick={() => {
                  handleDelete(column.id);
                }}
              />
              </div></div>
             
             
            </td>
            <td>  <div> lien vers profile</div></td>
          </tr>
        ))}
      </tbody>
    </table>







     </div>
     
    </div>
  );
}

export default AdminUsers;
