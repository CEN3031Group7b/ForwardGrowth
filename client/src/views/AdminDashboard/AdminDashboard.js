import React from 'react';
import './AdminDashboard.css';
import Collapsible from 'react-collapsible';

const homeTrigger = <h1>Home Page</h1>
const blogTrigger = <h1>Blog Page</h1>

const updateyInsta = (instagramlink) => {
    return fetch("/api/update_insta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instagramlink })
    }).then(response => response.json());
};
const updateyHome = (company, payment, about) => {
    return fetch("/api/update_home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, payment, about })
    }).then(response => response.json());
};

class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            company: '',
            payment: '',
            about: ''
        };
    }
    componentDidMount() {

        fetch('/api/get_home')
            .then(res => {
                return res.text();
            })
            .then(res => {
                var obj = JSON.parse(res);

                this.setState({
                    company: obj.company,
                    payment: obj.payment,
                    about: obj.about
                })
                console.log(obj.about);
            })
    }

    render() {
        return (
            <div className="App">
                <h1>Admin Dashboard</h1>
                <div className="colStyle">
                    <Collapsible trigger={homeTrigger} className="headerStyle" transitionTime="10" transitionCloseTime="10">
                        <form className="formStyle" id="homePage">
                            <h3>Features: </h3>
                            <h4>Company: </h4> <input type="text" defaultValue={this.state.company} ref="company"></input>
                            <h4>Payment Methods: </h4> <input type="text" defaultValue={this.state.payment} ref="payment"></input>
                            <h3>About: </h3> <input type="text" defaultValue={this.state.about} ref="about"></input>
                        </form>
                        <button
                            onClick={() => {
                                if (this.refs.company.value && this.refs.payment.value && this.refs.about.value) {
                                    updateyHome(this.refs.company.value, this.refs.payment.value, this.refs.about.value).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                }
                            }}>
                            Update home
                  </button>
                    </Collapsible>

                    <Collapsible trigger={blogTrigger} className="headerStyle" transitionTime="10" transitionCloseTime="10">
                        <form className="formStyle" id="socialMedia">
                            <h3>Instagram link: </h3> <input type="text" placeholder="body" ref="body"></input>
                        </form>
                        <button className="myButton" type="button"
                            onClick={() => {
                                if (this.refs.body.value) {
                                    updateyInsta(this.refs.body.value).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                }
                            }}
                        >
                            Update Instagram
        </button>
                    </Collapsible>
                </div>
                <footer>
                    <button className="myButton" type="button" margin-right="auto"></button>
                </footer>
            </div>
        );
    };
}
export default AdminDashboard;