import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Datatable2({ data, setData }) {
  const [bool2, setBool2] = useState(false);
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
  // const handleColor= (id)=>{
  //     const element=document.getElementById(id)
  //    if (element.classlist.contains('green')){element.classlist.remove('green')}
  //    else {element.classlist.add('green')}

  // }
  const handleAccept = (id) => {
    axios
      .put("http://127.0.0.1:8000/conferences/admin/" + id, {
        status: "accepted",
      })
      .then((response) => {
        console.log(response);
        setBool2(!bool2);
      });
  };
  
  const handleRefuse = (id) => {
    axios
      .put("http://127.0.0.1:8000/conferences/admin/" + id, {
        status: "refused",
      })
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/conferences/admin/list/path")
      .then((response) => setData(response["data"]));
  }, [bool2]);

  return (
    <table className="tb">
      <thead>
        <tr>
          <th>Pending Conferences</th>
          <th>Chairman</th>
          <th>Actions</th>
          <th>Page</th>
        </tr>
      </thead>

      <tbody>
        {data.map((column, i) => (
          <tr key={i}>
            <td> {column.title}</td>
            <td>{column.name_of_host}</td>
            <td className="icons">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="icon-check"
                onClick={() => handleAccept(column.id)}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="icon-refuse"
                onClick={() => handleRefuse(column.id)}
              />

            </td>
            <td>lien vers conference</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Datatable2;
