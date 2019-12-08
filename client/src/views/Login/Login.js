import './Login.css';
import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";


class Login extends React.Component {
    submit(username, password) {
        var boolie = false;
        //console.log(email, password)
        if (username.length > 0 && password.length > 0) {
            //clear email,pass after login button clicked 
            this.setState({
                password: ""
            })
            this.setState({
                username: ""
            })
            //console.log(this.state.email, this.state.password,"empty")

            //Redirect
            //this.props.history.push('/admin')

        }
        fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        }).then((response) => {
            return response.text()
        })
            .then(result => {
                //console.log(result.status);

                if (!(result === "incorrect")) {
                    localStorage.setItem('token', result);

                    this.props.tokenUpdate(result);
                    boolie = true;
                }
                else {
                    //this.state.setIsError = true;
                    //alert("incorrect password or username")
                }

                if (boolie) {
                    return this.props.history.push('/admin')


                }
                else {
                    alert("Incorrect login info.");
                    this.props.history.push('/login')
                }

            })
    }
    //form for the client to login to the admin dashboard. the username and password submitted is sent to the backend to be verified
    render() {
        //const {  } = this.props;
        return (
            <div className="App" >
                <div className="Login">
                    <h1>Login to the Admin Dashboard</h1>
                    <form id="LoginForm">
                        <h3>Username:</h3> <input name="user"></input>
                        <h3>Password:</h3> <input type="password" name="pass"></input>
                    </form>
                    <br></br>
                    <button className="LoginButton" onClick={() => this.submit(
                        document.getElementById("LoginForm").elements["user"].value,
                        document.getElementById("LoginForm").elements["pass"].value
                    )
                    }> Login</button> {/*Pulls user entry and submits to be checked by backend*/}
                </div>
            </div>
        );
    }
}


export default Login;
