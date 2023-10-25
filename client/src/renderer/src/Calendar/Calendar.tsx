import React,{Component} from "react";
import { useState } from "react";
import './customstyle.css'
import Week from './week'

class Calendar extends React.Component<{startdate:string},{}>{
    start;
    constructor(props){
        super(props);
        this.start=Number(this.props.startdate);
    }
    render(){
        return(<div className="background" style={{backgroundColor:'plum'}}>
            <div className="inbox">
            <h1 className="inboxTitle">Inbox</h1>
            <div id="ibuttonwrap"><div id="addinbox"></div></div>
        </div>

                <div className="navbar">
                    <div id="burg">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <h2 id="month">September <span className="purple">2023</span></h2>

                </div>
                <div className="cal">
                    <Week date="2"/>
                    <div className="weekView"></div>
                </div>

                <div id="addbutton"></div>

            </div>);
    }
}
export default  Calendar;