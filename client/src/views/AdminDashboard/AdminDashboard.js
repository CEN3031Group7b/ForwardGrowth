import React from 'react';
import './AdminDashboard.css';


const updateyInsta = (instagramlink) => {
    return fetch("/api/update_insta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instagramlink })
    }).then(response => response.json());
};
const updateHome = (company, payment, about, applink) => {

    return fetch("/api/update_home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, payment, about, applink })
    }).then(response => response.json());
};  


    
class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            payment: '',
            about: '',
            instagramlink: '',
            applink:'',
        };


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
                    about: obj.about,
                    applink: obj.applink
                })
                console.log(obj.about);
            })
    }
    
    
    render() {
        return (
            <div className="App">
                <h1>Admin Dashboard</h1>
                <h4>Here you can edit the contents of your website. Make sure to save your changes once you're done editing!</h4>
                <br></br>
                <div className="colStyle">
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
                                    updateHome(this.refs.company.value, this.refs.payment.value, this.refs.about.value, this.refs.applink.value).then(({ message }) => {
                                        alert('Home page successfully updated.');
                                    });
                                }
                                else {
                                     alert("Make sure all entries are completed.");
                                     console.log(this.refs);
                                }
                            }}>
                            Update home

                  </button>
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

                                    addTile(formData).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                                else {
                                    alert("Make sure all entries are completed.");
                                }
                            }}
                        >
                            Add a team member

        </button>
                <form>
                    <textarea type="text" defaultValue={this.state.company} ref="company"/>

                </form>
                <form>
                    <textarea type="text" defaultValue={this.state.payment} ref="payment" />

                </form>
                <form>
                    <textarea type="text" defaultValue={this.state.about} ref="about" />

                </form>
                <button
                    onClick={() => {
                        if (this.refs.company.value && this.refs.payment.value && this.refs.about.value) {
                            updateyHome(this.refs.company.value , this.refs.payment.value , this.refs.about.value).then(({ message }) => {
                                alert(message);
                            });
                        }
                        else {
                            alert("Make sure all entries are completed.");
                        }
                    }}
                >
                    Update home
        </button>
            </div>

        );
    }
}
export default AdminDashboard;