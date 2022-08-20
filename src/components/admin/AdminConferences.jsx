import React, { useState, useEffect } from "react";
import "./Admin.css";
import Datatable2 from "./Datatable2";
import Datatable3 from "./Datatable3";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";

function AdminConferences({bool2,setBool2}) {
  const accesToken = localStorage.getItem("token");
  const [bool, setBool] = useState(false);
  // const [bool3,setBool3]= useState(false);
  const navigate=useNavigate();


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
  const [data2, setData2] = useState([]);
  const [q, setQ] = useState("");
  const [q2, setQ2] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/conferences/admin/list/path")
      .then((response) => {setData(response["data"])});
  }, [bool,bool2]);


  useEffect(() => {  
    axios.get("http://127.0.0.1:8000/conferences/list/path").then(response=>
      {setData2(response["data"])})
  }, [bool,bool2]);


  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/conferences/admin/list/path")
  //     .then((response) => setData(response["data"]));
  //   axios
  //     .get("http://127.0.0.1:8000/conferences/list/path")
  //     .then((response) => setData2(response["data"]));
  // }, []);





  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/conferences/admin/list/path?search=" + q)
      .then((response) => setData(response["data"]));
  }, [q]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/conferences/list/path?search=" + q2)
      .then((response) => setData2(response["data"]));
  }, [q2]);




  const handleAccept = (id) => {
    axios
      .put("http://127.0.0.1:8000/conferences/admin/" + id, {
        status: "accepted",
      })
      .then((response) => {
        setBool(!bool);
      });
  };
  
  const handleRefuse = (id) => {
    axios
      .put("http://127.0.0.1:8000/conferences/admin/" + id, {
        status: "refused",
      })
      .then((response) => {
        setBool(!bool);
        console.log(response);
      });
  };


  const handleDelete= (id)=>{
    axios.delete("http://127.0.0.1:8000/conferences/admin/"+id)
    .then(response=>{console.log(response);setBool(!bool)})
  
  
  }
  
  useEffect(()=>{
    console.log(accesToken)
  }) 




  return (
    <div className="screen">
      <div className="table1">
        <div className="filter1">
          <div className="inputcomplet">
            <input
              placeholder="Search"
              className="inputfilter"
              type="text"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
              }}
            />
          </div>
        </div>
          <table className="tb" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th> <div className="hdr" >Pending Conferences</div> </th>
                <th><div className="hdr" >Chairman </div> </th>
                <th><div className="hdr" >Actions</div></th>
                <th><div className="hdr" >Page</div></th>
              </tr>
            </thead>

            <tbody>
              {data.map((column, i) => (
                <tr key={i}>
                  <td> <div>{column.title}</div> </td>
                  <td> <div>{column.name_of_host}</div> </td>
                  <td className="icons">
                    <div className="actions" >
                      <div className="act" ><FontAwesomeIcon
                      icon={faCircleCheck}
                      className="icon-check"
                      onClick={() => {handleAccept(column.id)}}
                    /></div>
                    <div className="act" ><FontAwesomeIcon
                      icon={faTrashCan}
                      className="icon-refuse"
                      onClick={() => handleRefuse(column.id)}
                    /></div>
                    
                    </div>
                    
                  </td>
                  <td> <div className="lien-conf" onClick={()=>{
                    navigate('/Conf/'+column.id)
                  }} >lien vers conference</div> </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <div className="table2">
        <div className="filter2">
          <div className="inputcomplet">
            <input
              placeholder="Search"
              className="inputfilter"
              type="text"
              value={q2}
              onChange={(e) => {
                setQ2(e.target.value);
              }}
            />
          </div>
        </div>

        
          <table className="tb" cellPadding="0" cellSpacing="0" >
            <thead>
              <tr>
                <th><div className="hdr" >Accepted Conferences</div></th>
                <th><div className="hdr" >Chairman</div></th>
                <th><div className="hdr" >Actions</div></th>
                <th><div className="hdr" >Page</div></th>
              </tr>
            </thead>

            <tbody>
              {data2.map((column, i) => (
                <tr key={i}>
                  <td> <div>{column.title}</div> </td>
                  <td> <div>{column.name_of_host}</div> </td>
                  <td className="icons">
                    <div className="actions2" >
                    <div className="act2" >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="icon-refuse"
                      onClick={() => handleDelete(column.id)}
                    />
                    </div>
                    </div>
                   
                    
                  </td>
                  <td> <div className="lien-conf" onClick={()=>{
                     navigate('/Conf/'+column.id)
                  }} > lien vers conference</div> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default AdminConferences;
