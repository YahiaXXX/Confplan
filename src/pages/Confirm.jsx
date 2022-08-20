import React from "react";
import "../components/Signup/Form.css";

function Confirm() {
  return (
    <div className="form">
      <div className="form-container">
        <div className="leftSide">
          <div className="header">
            <h3>CREATE NEW ACCOUNT</h3>
          </div>

          <div className="para-lien">
            <div className="paragraphe">
              <p>
                thank you for choosing ConfPlan!
                <br /> your account is activated successfully <br /> have a nice
                day!
              </p>
              
            </div>

            <div className="login_text">
              <a href="./login">Login</a>
            </div>
          </div>
        </div>
        <div className="rightSide"></div>
      </div>
    </div>
  );
}

export default Confirm;
