import './styles/day.css'
import React,{Component} from "react";
import { useState } from "react";

class Day extends Component<{day:string,date:string},{}>{
    constructor(props){
        super(props);
    }
    render(){
      return (<div className="dayRapper" id="day1"><h1 className="daytitle">{this.props.day}</h1><div className="day"><h1>{this.props.date}</h1></div></div>)  
    }
    
}
export default Day;