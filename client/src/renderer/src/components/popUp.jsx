import React from "react"
import { useState } from "react"
import Glob from "./Glob" 
import "../assets/styles/Ipop.css"
function PopUp(){

return(Glob.Ipop&&<div className="info">
    <div className="editbutton">Edit</div>

<h1 className="title">the things</h1>

<h1 className="time">10:00-11:00</h1>
<p className="description">I like cheese</p>
<button className="closeButton" onClick={()=>Glob.Ipop=false}>Close</button>
</div>);
}
export default PopUp;