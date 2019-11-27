import React from 'react';
import './Login.css';


const email = "";
const password = "";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

    }


    //Need to change the below function so that only client can login
    submit(email, password) {
         //console.log(email, password)
        if (email.length > 0 && password.length > 0) {
            //clear email,pass after login button clicked 
            this.setState({
                password: ""
            })
            this.setState({
                email: ""
            })
            //console.log(this.state.email, this.state.password,"empty")

            //Redirect
            this.props.history.push('/admin')

        }
    }

    render() {
        return (
            <div className="App" >
                <div className="Login">
                    <h1>Login to the Admin Dashboard</h1>
                    <form id="LoginForm">
                        <h3>Username:</h3> <input name="user"></input>
                        <h3>Password:</h3> <input name="pass"></input>
                    </form>
                    <br></br>
                    <button className="LoginButton" onClick={() => this.submit(
                        document.getElementById("LoginForm").elements["user"].value,
                        document.getElementById("LoginForm").elements["pass"].value
                    )}>Login</button>
                </div>
            </div>
        );
    }
}


export default Login;
