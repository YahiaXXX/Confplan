import React, { useState } from "react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Main() {
  const [pop, setPop] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>

      <div>
        <NotificationsActiveOutlinedIcon
          className="icon"
          onClick={() => {
            setPop(!pop);
          }}
        />
        <PopUp trigger={pop} pop={pop} setPop={setPop}></PopUp>
      </div>
    </div>
  );
}

export default Main;
