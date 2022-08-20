import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function Datatable({ data, setData }) {
  const [bool, setBool] = useState(false);
  const [isActive, setIsActive] = useState(true);
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
  const handleDelete = (id) => {
    axios.delete("http://127.0.0.1:8000/users/admin/" + id).then((response) => {
      if (response.status == 200) {
        setBool(!bool);
        console.log("done");
      }
    });
  };
  const handleBlock = (id) => {
    axios
      .put("http://127.0.0.1:8000/users/admin/" + id, { is_active: false })
      .then((response) => {
        if (response.status == 200) {
          setBool(!bool);
        }
      });
  };
  const handleDeblock = (id) => {
    axios
      .put("http://127.0.0.1:8000/users/admin/" + id, { is_active: true })
      .then((response) => {
        if (response.status == 200) {
          setBool(!bool);
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/listforadmin/path")
      .then((response) => setData(response["data"]));
  }, [bool]);

  return (
    <table className="tb">
      <thead>
        <tr>
          <th>Username</th>
          <th>Actions</th>
          <th>Profile</th>
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
                <FontAwesomeIcon
                  icon={faLock}
                  className="icon-close"
                  onClick={() => handleBlock(column.id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faLockOpen}
                  className="icon-open"
                  onClick={() => handleDeblock(column.id)}
                />
              )}

              <FontAwesomeIcon
                icon={faTrashCan}
                className="icon-delete"
                onClick={() => {
                  handleDelete(column.id);
                }}
              />
              </div>
             
            </td>
            <td>  <div> lien vers profile</div></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Datatable;
