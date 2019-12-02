import React from 'react';
import './AdminDashboard.css';
import Collapsible from 'react-collapsible';
import {Redirect } from 'react-router-dom';
import TeamCardsAdmin from '../../components/TeamCard/TeamCardsAdmin';



const homeTrigger = <h1>Home Page</h1>
const aboutTrigger = <h1>About the Team Page</h1>
const blogTrigger = <h1>Blog Page</h1>
const serveTrigger = <h1>Mailing Page</h1>
const passwordTrigger = <h1>Change your password</h1>
const headerTrigger = <h1>Header</h1>



const updateInsta = (instagramlink, token) => {
    return fetch("/api/update_insta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instagramlink, token })
    }).then(response => response.json());
};
const updateHome = (company, payment, about, applink, token) => {
    return fetch("/api/update_home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, payment, about, applink, token })
    }).then(response => response.json());
};

// const updateTile = (name, position, photo) => {
//     return fetch("/api/update_tile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, position, photo })
//     }).then(response => response.json());
// };
// const deleteTile = (name) => {
//     return fetch("/api/delete_tile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name })
//     }).then(response => response.json());
// };

const addTile = (form) => {
    return fetch("/api/add_tile", {
        method: "POST",
        body: form
    }).then(response => response.json());
};
const listServe = (subject, body,token) => {
    return fetch("/api/list_serve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body, token })
    }).then(response => response.json());

};
const logout = (token) => {
    return fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
    }).then(response => response.json());
   
    
   

}

const passUpdate = (password, token) => {
    return fetch("/api/passyBoi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token})
    }).then(response => response.json());

};
const addHeader = (form) => {
    return fetch("/api/add_header", {
        method: "POST",
        body: form
    }).then(response => response.json());
};

const deleteEmailee = (email, token) => {
    return fetch("/api/removeEmailee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token })
    }).then(response => response.json());

};


class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: null,
            company: '',
            payment: '',
            about: '',
            instagramlink: '',
            applink: '',
            header: null,
        };

    }
    componentDidMount() {
        

        fetch('/api/get_home')
            .then(res => {
                return res.text();
            })
            .then(res => {
                //console.log('My data is' + res)
                var obj = JSON.parse(res);

                this.setState({
                    company: obj.company,
                    payment: obj.payment,
                    about: obj.about,
                    applink: obj.applink
                })
            }).catch(err => { console.log(err) })

        fetch('/api/instagramlink')
            .then(res => {
                return res.text();
            })
            .then(res => {
                if (this.state.instagramlink !== res) {
                    this.setState({
                        instagramlink: res
                    })
                }
            })
    }

    onChange = e => {

        this.setState({
            photo: e.target.files,
        })
    }
    onChange2 = e => {
        this.setState({
            header: e.target.files,
        })
    }
    render() {
        
    if(!(localStorage.getItem('token') === 'blah')) {

        return (
            <div className="App">
                <h1>Admin Dashboard</h1>
                <h4>Here you can edit the contents of your website. Make sure to save your changes once you're done editing!</h4>
                <br></br>
                <div className="colStyle">
                    <Collapsible trigger={headerTrigger} className="headerStyle" transitionTime="10" transitionCloseTime="10">
                        <h4>Update the header of the website:</h4>
                        <input type="file" onChange={this.onChange2} ref="header" />
                        <button
                            onClick={() => {
                                var headerForm = new FormData();
                                headerForm.append('file', this.state.header[0]);
                                console.log("Header" + this.state.header[0]); //Object
                                console.log("Header Form" + headerForm ) //Object
                                addHeader(headerForm).then(({ message }) => {
                                    alert(message);
                                });
                            }}
                        >Update Header</button>
                    </Collapsible>
                    <Collapsible trigger={homeTrigger} className="headerStyle" transitionTime="10" transitionCloseTime="10">
                        <form className="formStyle" id="homePage">
                            <h3><u>Features: </u></h3>
                            <h4>Company: </h4> <textarea type="text" defaultValue={this.state.company} ref="company"></textarea>
                            <h4>Payment Methods: </h4> <textarea type="text" defaultValue={this.state.payment} ref="payment"></textarea>
                            <br></br>
                            <h3><u>About: </u></h3>
                            <br></br>
                            <textarea type="text" defaultValue={this.state.about} ref="about"></textarea>
                            <br></br>
                            <h3><u>Link to application: </u></h3>
                            <br></br>
                            <input type="text" defaultValue={this.state.applink} ref="applink"></input>
                            <br></br>
                        </form>
                        <button
                            onClick={() => {
                                if (this.refs.company.value && this.refs.payment.value && this.refs.about.value && this.refs.applink.value) {
                                    updateHome(this.refs.company.value, this.refs.payment.value, this.refs.about.value, this.refs.applink.value, localStorage.getItem('token')).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                    console.log(this.refs);
                                }
                            }}>Update home</button>
                    </Collapsible>
                    <Collapsible trigger={aboutTrigger} className="headerStyle" transitionTime="10" transitionCloseTime="10">
                        <h2>Add a team member:</h2>
                        <form>
                            <input type="text" placeholder="Name of member" ref="name"></input>
                        </form>
                        <form>
                            <input type="text" placeholder="Position" ref="position"></input>

                        </form>
                        <div>
                            <h4>Upload a photo of the team member:</h4>
                            <input type="file" onChange={this.onChange} />
                        </div>
                        <button
                            onClick={() => {
                                if (this.refs.name.value && this.refs.position.value) {
                                    var formData = new FormData();
                                    formData.append('name', this.refs.name.value);
                                    formData.append('position', this.refs.position.value);
                                    formData.append('file', this.state.photo[0]);
                                    formData.append('token',localStorage.getItem('token'))
                                    //console.log(this.state.photo[0]); //File JSON
                                    addTile(formData).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                }
                            }}
///*                        >
//                            Add a team member
//        </button>

//                        <h2>Delete a team member:</h2>
//                        <form>
//                            <input type="text" placeholder="Name of member" ref="deleteName" />

//                        </form>

//                        <button
//                            onClick={() => {
//                                if (this.refs.deleteName.value) {
//                                    deleteTile(this.refs.deleteName.value, localStorage.getItem('token')).then(({ message }) => {
//                                        alert(message);
//                                    });
//                                }
//                                else {
//                                    alert("Make sure all entries are completed.");
//                                }
//                            }}
//                        >
//                            Delete a team member
//        </button>
//*/
//DO NOT DELETE COMMENT BLOCK ABOVE FOR ANY REASON
                        >Add a team member</button>
                        <h2>Edit team members:</h2>
                        <TeamCardsAdmin token={localStorage.getItem('token')} />

                    </Collapsible>
                    <Collapsible trigger={blogTrigger} className="headerStyle" transitionTime="10" transitionCloseTime="10">
                        <form className="formStyle" id="socialMedia">
                            <h3>Link to an Instagram post: </h3> <input type="text" defaultValue={this.state.instagramlink} ref="body"></input>
                        </form>
                        <button className="myButton" type="button"
                            onClick={() => {
                                if (this.refs.body.value) {
                                    updateInsta(this.refs.body.value, localStorage.getItem('token')).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                }
                            }}
                        >Update Instagram</button>
                    </Collapsible>
                    <Collapsible trigger={serveTrigger} className="headerStyle" transitionTime="10" transitionCloseTime="10">
                        <form className="formStyle" id="socialMedia">
                            <h3>Send mail to email subscribers </h3>
                            <input type="text" placeholder="Subject of email" ref="subject"></input>
                            <textarea type="text" placeholder="Body of email" ref="emailBody"></textarea>

                        </form>
                        <button className="myButton" type="button"
                            onClick={() => {
                                if (this.refs.subject.value && this.refs.emailBody.value) {
                                    listServe(this.refs.subject.value, this.refs.emailBody.value, localStorage.getItem('token')).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                }
                            }}
                        >
                            List Serve
                     </button>
                        <h3>Enter email of who you want to unsubscribe </h3>
                        <input type="text" placeholder="Email" ref="emailee"></input>
                        <button className="myButton" type="button"
                            onClick={() => {
                                if (this.refs.emailee.value ) {
                                    deleteEmailee(this.refs.emailee.value, localStorage.getItem('token')).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                }
                            }}
                        >
                            List Serve
                     </button>

                    </Collapsible>
                    <Collapsible trigger={passwordTrigger} className="headerStyle" transitionTime="10" transitionCloseTime="10">
                        <form className="formStyle" id="socialMedia">
                            <h3>Enter new password</h3>
                            <input type="text" placeholder="New Password" ref="passy"></input>
                            

                        </form>
                        <button className="myButton" type="button"
                            onClick={() => {
                                if (this.refs.passy.value) {
                                    passUpdate(this.refs.passy.value, localStorage.getItem('token')).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                }
                            }}
                        >
                            Update Password
                     </button>

                    </Collapsible>
                    <div>
                        <button onClick={() => {
                            logout(localStorage.getItem('token'))
                            localStorage.setItem('token', 'blah');

                            this.props.history.push('/login')
                        }}>Logout</button>
                    </div>
                </div>
            </div>
            );
        }
        else {
            //console.log(localStorage.getItem('token'))
            this.props.history.push('/login')
            return null; 

        }
    };

}
export default AdminDashboard;