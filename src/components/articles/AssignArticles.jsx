import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./Articles.css";
import PopUp from "../PopUp";
import ClearIcon from "@mui/icons-material/Clear";
import { useParams } from "react-router-dom";


function AssignArticles() {
  const [refresh, setRefresh] = useState(false);
  const [pop, setPop] = useState(false);
  const [data, setData] = useState([]);
  let [index, setIndex] = useState(-1);

  const handleIndex = (thisindex) => {
    setIndex(thisindex);
    setPop(!pop);
  };
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

  // const getData =  () => {
    
  // };

  useEffect(() => {
    axios
    .get(
      "http://127.0.0.1:8000/articles/listforchairman/path/?conference_id="+id+"&status=accepted to review"
    )
    .then((response) => {
      setData(response["data"]);
    });
  }, [refresh]);
  const {id} = useParams();


  const handleDeleteRev = (id1, id2) => {
     axios
      .post(
        "http://127.0.0.1:8000/articles/remove_reviewer_from_article_reviewers",
        {
          article: id1,
          user: id2,
        }
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="page">
      <div className="text-pend" ><h2 className="title">Assign Articles</h2></div>  
      <div className="table-pend" >
      <table className="table-content">
        <thead>
          <tr>
            <th> <div>Articles</div> </th>
            <th><div>Author name</div></th>
            <th><div>Accept/Decline</div></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr  key={i}>
              
              
              <td className="acteur"> <div>{row.title}</div> </td>

              { row.reviewers.length!==0 
                ? <td className="column_reviewer">
                  {row.reviewers.map((reviewer, key) => (
                    <div key={key} className="xrev">
                      <div className="rev" >
                        {reviewer.first_name} {reviewer.family_name}
                      </div>
                    
                      <ClearIcon
                        className="x"
                        onClick={() => {
                          setRefresh(!refresh);
                          handleDeleteRev(row.id, reviewer.id);
                        }}
                      />
                      </div>
                      
                  ))}
                </td>
                : <td> <div></div> </td>}

                 <td className="icons-td">
                 <div>                
                   <AddCircleOutlineIcon
                  className="icon-add"
                  onClick={() => handleIndex(i)}
                /></div>  

                {index === i && (
                  <PopUp
                    refresh={refresh}
                    setRefresh={setRefresh}
                    articleN={row.id}
                    className="pop"
                    trigger={pop}
                    pop={pop}
                    setPop={setPop}
                    id={id}
                  ></PopUp>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
}

export default AssignArticles;
