import React, { Component } from 'react';
import TimePicker from 'react-time-picker';
//import TimeField from 'react-simple-timefield';
import './Activities.css';
import Report from '../Report/Report'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { TimePickerComponent} from '@syncfusion/ej2-react-calendars';

class Activities extends Component {
   
    constructor(props) {
        super(props)
        this.onStartTimeChange = this.onStartTimeChange.bind(this);
        this.onEndTimeChange = this.onEndTimeChange.bind(this);
    }

    state = {
        activity: '',
        temp:0,
        startTime: `${(new Date()).getHours()} : ${(new Date()).getMinutes()}`,
        endTime: '23:59',
        activityList: [{
            username: "",
            password: "",
            activities: [{ date: "", duration: "", activity: "" }],
        }],
        activityDate: new Date(),
    }


    inputChangeHandler = (event) => {
        //console.log(event.target.value);
        this.setState({
            activity: event.target.value,
        })
    }

    onEndTimeChange = (event) => {
        //console.log(event.target.value);
        this.setState({
            endTime:event.target.value
        })
    }

    onStartTimeChange = (event) => {
        // console.log(event.target.value);
        this.setState({
            startTime:event.target.value
        })
    }

    dateChangeHandler = date =>{
        this.setState({
            activityDate:date
        })
    }

    onAddActivityHandler = () => {
       
        // console.log(typeof this.state.startTime);
        // console.log(typeof this.state.endTime);3
        

        // let individualActivity = {
        //     activity: activity,
        //     activityDate:activityDate,
        //     timeDifference: Number(endTime) - Number(startTime),
        // }
        // data=JSON.parse(localStorage.getItem('root'))
        // for(let i=0;i<data.length;i++)
        // {
        //     if(data[i].userName===this.props.userName||data[i].password===this.props.password)
        //     {
        //         flag=1;
        //         index=i
        //         break;
        //     }
        //     else
        //     {
        //         index=data.length
        //  
        
        let localStorageData = null;
        if (localStorage.getItem('root') != null) {
            localStorageData = JSON.parse(localStorage.getItem('root'))
        }

        let flag = 0;
        if (localStorageData != null) {
            for (let i = 0; i < localStorageData.length; i++) {
                if (localStorageData[i].password === this.props.password && localStorageData[i].username === this.props.username) {
                    flag = 1;
                    this.setState({temp :i })
                    break;
                }
                else {
                    flag = 0;
                    this.setState({temp:localStorageData.length})
                }
            }
        }
        else {
            flag = 0;
            this.setState({temp : 0});
        }
        if (flag === 1) {
            let newArray = localStorageData;
            const obj = {
                date: this.state.activityDate,
                duration: (this.state.endTime - this.state.startTime)/60000 ,
                activity: this.state.activity

            }
            newArray[this.state.temp].activities.push(obj);
            this.setState({ activityList: newArray })
            localStorage.setItem('root', JSON.stringify(newArray))

        }
        else {
            let newArray = JSON.parse(localStorage.getItem('root')) ? JSON.parse(localStorage.getItem('root')) : [];
            const obj = {
                username: this.props.username,
                password: this.props.password,
                activities: [{
                    date: this.state.activityDate,
                    duration: (this.state.endTime - this.state.startTime)/60000,
                    activity: this.state.activity
                }]

            }
             newArray.push(obj)
            this.setState({ activityList: newArray })
            localStorage.setItem('root', JSON.stringify(newArray))

        }
        

    }

    componentDidMount() {
        console.log('activity props', this.props);
    }



    render() {
        let outputData = JSON.parse(localStorage.getItem('root'))
        return (
            <div className="Activities">
                {/* Inputting the activity and times from user */}
                <div className="InputActivityDiv">

                    <input className="InputActivity"
                        type="text"
                        placeholder="Add your Activity"
                        value={this.state.activity}
                        onChange={(event) => this.inputChangeHandler(event)} />

                    <div className="InputTime"> 
                    <label style={{ fontWeight: "bold" }}>Start Time  : </label>
                        <DatePicker
                            selected={this.state.activityDate}
                            onChange={this.dateChangeHandler}
                            value={this.state.activityDate}
                        />
                    </div>

                    <div className="InputTime">
                        <label style={{ fontWeight: "bold" }}>Start Time  : </label>
                        <TimePickerComponent
                            onChange={this.onStartTimeChange}
                            value={this.state.startTime}
                        />

                        {/* <input
                            type="time"
                            step="1"
                            value={this.state.startTime}
                            placeholder="Start Time"
                            onChange={this.onStartTimeChange} /> */}


                    </div>

                    <div className="InputTime">
                        <label style={{ fontWeight: "bold" }}>End Time  : </label>
                        <TimePickerComponent
                            onChange={this.onEndTimeChange}
                            value={this.state.endTime}
                        />
                        {/* <TimeField value={this.state.endTime} onChange={this.onEndTimeChange} /> */}
                    </div>

                    <button className="Button"
                        onClick={() => this.onAddActivityHandler()}>Add Activity</button>

                </div>
                {/* Outputting the content to the users */}
                <div className="outputContent">
                    {
                        outputData[this.state.temp].activities.map((object ,index) => {
                            return (<Report object={object} />) 
                        }
                        )
                    }

                </div>

            </div>
        )
    }
}

export default Activities;