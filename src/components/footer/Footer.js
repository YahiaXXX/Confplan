import React, {Component } from "react";
import "./footer.css"
import img from "./../../img/logo_final 1.png"



function Footer (){
    return(
        <div className="Footer" id="footer">
            <div className="footer_l">
            <h1 className="footer_about_us">About Us</h1>
            <div className="container_f">
                <div className="logo"><img src={img}/></div>
                <div className="description">
                    <h3>HAIKER-TECH</h3>
                    <h6>Haiker-tech, a group of students studying at the higher 
                        school of computer science ESI SBA (8 Mai 1945) made
                        projectname our 3rd year project, the members:
                           <ul>
                               <li>ALILI Ilyes</li>
                               <li>AOUAR Rabah</li>
                               <li>BOUKHAROUBA Yahia</li>
                               <li>CHERRAB Karim Mohammed</li>
                               <li>DJALLOULI Ahmed Ouehab</li>
                               <li>HAMOUCHE Adel</li>
                           </ul>
                    </h6>
                </div>
            </div>
            </div>
            <div className="footer_r">
            <h1 className="footer_about_us">Contact Us</h1>
            </div>
        </div>
    )
}

export default Footer