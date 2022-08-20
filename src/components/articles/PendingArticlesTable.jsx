import React, { useState, useEffect } from "react";
import "./Articles.css";
import axios from "axios";
import dateFormat from "dateformat";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

function PendingArticlesTable() {
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [bool, setBool] = useState(false);
  const accesToken = localStorage.getItem("token");
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${accesToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  useEffect(() => {
    let url = "http://127.0.0.1:8000/articles/listforchairman/path/?conference_id="+id+"&status=pending";
    console.log(url)
    axios
      .get(url)
      .then((response) => {setData(response["data"]);console.log("pending")})

  }, [bool]);

  // const getName = async (id) => {
  //   const res = await axios.get("http://127.0.0.1:8000/users/" + id);
  //   return res["data"].first_name;

    // .then((response)=>{
    //  name = response["data"].first_name + response["data"].family_name

    //  })
    // return await name
  // };
  

  const handleDecline = (id) => {
    axios
      .put("http://127.0.0.1:8000/articles/" + id, { status: "refused" })
      .then((response) => {
        setBool(!bool)
      });
  };
  const handleAccept = (id) => {
    axios
      .put("http://127.0.0.1:8000/articles/" + id, {
        status: "accepted to review",
      })
      .then((response) => {
        setBool(!bool)
      });
  };
  const saveFile = (urll,title) => {
    saveAs(urll, title);
  };

  return (
    <div className="page" >
     <div  className="text-pend" ><h2 className="title" >Pending articles</h2> </div> 
    <div className="table-pend" >
    <table className="table-content">
      <thead>
        <tr>
          <th> <div> Articles</div></th>
          <th> <div>Author name</div> </th>
          <th><div>Upload date</div></th>
          <th><div>Decision</div></th>
        </tr>
      </thead>

      <tbody>
        {data.map((column, i) => (
          <tr key={i}>
            <td> <div className="telecharger"  onDoubleClick={()=>saveFile(column.article_url,column.title)} >{column.title}</div>  </td>
            <td><div> {column.user_id}</div> </td>
            <td> <div>{dateFormat(column.date_of_creation, "mmmm dS, yyyy")}</div> </td>
            <td className="decision" >
              <div className="decline-accept" >

              <div  onClick={()=>{handleAccept(column.id)}} >pass to review</div> 
              <div onClick={()=>{handleDecline(column.id)}} >Decline</div>
              </div>
            
             
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );

}

export default PendingArticlesTable;
