import React, { useState, useEffect } from "react";
import "./Articles.css";
import axios from "axios";
import CommentIcon from '@mui/icons-material/Comment';
import RapportPop from './RapportPop';
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";


function ReviewResultTable() {
  const [pop,setPop]=useState(false)
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
        status: "accepted",
      })
      .then((response) => {
        setBool(!bool)
      });
  };


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/articles/listforchairman/path/?conference_id="+id+"&status=accepted to review")
      .then((response) => setData(response["data"]));
  }, [bool]);
  const saveFile = (urll,title) => {
    saveAs(urll, title);
  };

  return (
    <div className="page" >
      <div className="text-pend" ><h2 className="title" >Review results</h2></div> 
      <div className="table-pend" >
      <table className="table-content">
      <thead>
        <tr>
          <th> <div>Articles</div> </th>
          <th> <div>Author name</div> </th>
          <th> <div>Score</div> </th>
          <th> <div>Accept/Decline</div> </th>
        </tr>
      </thead>

      <tbody>
        {data.map((column, i) => (
          <tr key={i}>
            <td> <div className="telecharger" onDoubleClick={()=>saveFile(column.article_url,column.title)} >{column.title}</div>  </td>
            <td> <div>{column.user_id}</div>  </td>
             <td  >
              <div>
             
               {column.report_set.length===column.reviewers.length 
                ?  <div className="column_note" > 
                  {column.report_set.map(rep=>rep.score).reduce((prev,curr)=>prev+curr  ,0)}/100 
                  <CommentIcon className="rapport-x" onClick={()=>{setPop(true)}} />
                  <RapportPop data2={column.report_set}  data={column.reviewers} trigger={pop} pop={pop} setPop={setPop} />
                  </div>
                :  <div className="column_note" >
                  { column.report_set.length}/{column.reviewers.length}
                  <CommentIcon className="rapport-x" onClick={()=>{setPop(true)}}  />
                  <RapportPop data2={column.report_set} data={column.reviewers} trigger={pop} pop={pop} setPop={setPop} />
                </div>
              
              
               
                 }
                 </div>
  


            </td>
            <td className="decision" >
              <div className="decline-accept" >
              <div  onClick={ ()=> handleAccept(column.id)} >Accept</div> <div onClick={()=> handleDecline(column.id)} >Decline</div>
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

export default ReviewResultTable;
