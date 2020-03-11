import React,{Component} from 'react';
import moment from 'moment';
import './Report.css';

class Report extends Component {
    render(){
        let date = (moment(this.props.object.date).format('MM/DD/YYYY'));
       let output = null
       if(moment(this.props.object.date).diff(moment(new Date()),'days')<=7){
            output = (
                <div className="Output">
                <p>ACTIVITY: {this.props.object.activity}</p>
                <p>DURATION: {this.props.object.duration}</p>
                <p>DATE: {date}</p>
            </div>
            )
       }
        return(
            {output}
                // <div className="Output">
                // <p>ACTIVITY: {this.props.object.activity}</p>
                // <p>DURATION: {this.props.object.duration}</p>
                // <p>DATE: {this.props.object.date}</p>
                // </div>
        )
    }
}

export default Report;
