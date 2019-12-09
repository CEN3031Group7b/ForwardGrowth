import React, { useState } from "react"
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import About from "./views/About/About.js"
import Blog from "./views/Blog/Blog.js"
import Login from "./views/Login/Login.js"
import Header from "./components/Header/Header"
import AdminDashboard from './views/AdminDashboard/AdminDashboard';
import NotFound from "./views/NotFound"
import { withRouter } from "react-router-dom";

import { BrowserRouter as Router } from "react-router-dom";

//const App = () => {
class App extends React.Component {
    //const [authority, setAuthority] = useState();
    constructor(props) {
        super(props);
        this.state = {
            token:'blah'
        };
    }
    
    tokenUpdate(value) {
        this.setState({
            token: value
        })
    }
    //When opening this site for the first time token is set to 'blah'
    componentDidMount() {
        if (localStorage.getItem('token') === null) {
            localStorage.setItem('token', 'blah');
        }
    }
    render() {
       
        return (
            <div>
                    <Header />
                    <Switch>
                    <Route exact path="/home" render={(props) => <Home {...props} token={this.state.token} />}/>
                    <Route exact path="/"><Redirect to="/home" render={(props) => <Home {...props} token={this.state.token} />} /></Route>
                    <Route exact path="/about" render={(props) => <About {...props} token={this.state.token} />} />
                    <Route exact path="/blog" render={(props) => <Blog {...props} token={this.state.token} />}/>
                    <Route exact path="/login" 
                        render={(props) => <Login {...props} tokenUpdate={this.tokenUpdate.bind(this)} token={this.state.token} />}
                    />
                    <Route path="/admin" render={(props) => <AdminDashboard {...props} token={this.state.token} tokenUpdate={this.tokenUpdate.bind(this)} />} />
                    <Route component={NotFound} />
                    </Switch>

            </div>
        );
    }
}
export default withRouter(App);

