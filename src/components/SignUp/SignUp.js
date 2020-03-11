import React, { Component } from 'react';
import Activities from '../Activities/Activities';
import './SignUp.css';

class SignUp extends Component {
    // constructor(props){
    //     super(props);
    // }
    state = {
        username: '',
        password: '',
        submit: false,
    };

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
        // console.log(this.state.username);
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
        //  console.log(this.state.password);
    }

    onSubmitHandler = (event) => {

        // if(localStorage.getItem((this.state.username).password) === this.state.password){

        // }
        // else{
        //     let user ={
        //         password:this.state.password,
        //     }
        //     localStorage.setItem(this.state.username , JSON.stringify(user));
        //  //   localStorage.setItem("password" , this.state.password);
        // }

        // if(!localStorage.getItem(this.state.username))
        // {
        //     localStorage.setItem(this.state.username,JSON.stringify(this.state))
        // }

        this.setState({
                // username:"",
                // password:"",
            submit: true,
        })

    }


    render() {

        return (
            <div className="SignUp">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.onSubmitHandler(e)
                }}>
                    <input className="Input" type="text" value={this.state.username} placeholder="USERNAME" onChange={this.usernameChangeHandler} />
                    <br />
                    <input className="Input" type="password" value={this.state.password} placeholder="PASSWORD" onChange={this.passwordChangeHandler} />
                    <br />
                    <button onClick={this.onSubmitHandler} >SIGNUP</button>
                </form>
                {this.state.submit ? <Activities username={this.state.username} password={this.state.password}> </Activities> : null} 
            </div>

        )
    }

}

export default SignUp;