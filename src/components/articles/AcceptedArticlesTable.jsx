import React from 'react'
import { useState, useEffect } from "react";
import "./Articles.css";
import axios from "axios";
import dateFormat from "dateformat";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import uzCyrl from 'date-fns/locale/uz-Cyrl/index';
import { saveAs } from "file-saver";


function AcceptedArticlesTable() {
  const [state, setState] = useState({});
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
  const {id} = useParams();

  const handleDelete = (id) => {
    axios
      .put("http://127.0.0.1:8000/articles/" + id, { status: "refused" })
      .then((response) => {
        setBool(!bool)
      });
  };

  useEffect(() => {
    let url ="http://127.0.0.1:8000/articles/listforchairman/path/?conference_id="+id+"&status=accepted"; 
    console.log(url)
    axios
      .get(url)
      .then((response) => {setData(response["data"])})

  }, [bool]);

  const saveFile = (urll,title) => {
    saveAs(urll, title);
  };



  return (


    <div className="page" >
     <div className='text-pend' > <h2 className="title" >Accepted articles</h2></div> 
     <div className='table-pend' >
     <table className="table-content">
      <thead>
        <tr>
          <th><div>Articles</div> </th>
          <th> <div>Author name</div> </th>
          <th><div>Score</div></th>
          <th><div>Upload date</div></th>
        </tr>
      </thead>

      <tbody>
        {data.map((column, i) => (
          <tr key={i}>
            <td> <div className="telecharger" onDoubleClick={()=>saveFile(column.article_url,column.title)} >{column.title}</div>  </td>
            <td><div>{column.user_id}</div>  </td>


            <td>
              <div>
              {column.report_set.map(rep=>rep.score).reduce((prev,curr)=>prev+curr  ,0)}/100 
              </div>
            
              
  




            </td>
            <td className="decision" >
              <div className='decline-accept' >
              <div onClick={()=>{handleDelete(column.id)}} >Decline</div>
              </div>
            
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     </div>
    
    </div>

    
  )
}

export default AcceptedArticlesTable