import React from 'react';
import './AdminDashboard.css';


const updateyInsta = (instagramlink) => {
    return fetch("/api/update_insta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instagramlink })
    }).then(response => response.json());
};   
const updateyHome = (company,payment,about) => {
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
                <form>
                    <textarea type="text" placeholder="body" ref="body" />

                </form>
                <button
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