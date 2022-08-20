import React from "react";
import './Nav.css'
import { Link } from "react-router-dom";


function Nav(){
    return(
       <nav className="nav_acc">
           <ul className="nav_acc_ul">
            <Link to="/" className="link">
                <li className="list">My Articales</li>
            </Link>
           <Link to="/#footer" smooth className="link">
                <li className="list">Conferences</li>
            </Link>
           <Link to="/#footer"  smooth className="link">
                <li className="list" >Waiting for review</li> 
           </Link>
           </ul>
       </nav>
    )
}

export default Nav