import Day from "./day"
import React,{Component} from "react";
import "./styles/week.css"

class Week extends Component<{date:string},{}>{
    dates;
    constructor(props)
    {
        super(props);
        this.dates=Number(this.props.date);
    }
    render() {
        return(<div className="weekRapper">
        <Day day="Mon" date={this.dates}/>
        <Day day="Tue" date={this.dates+1}/>
        <Day day="Wed" date={this.dates+2}/>
        <Day day="Thu" date={this.dates+3}/>
        <Day day="Fri" date={this.dates+4}/>
        <Day day="Sat" date={this.dates+5}/>
        <Day day="Sun" date={this.dates+6}/>

    </div>);
    }
}
export default Week