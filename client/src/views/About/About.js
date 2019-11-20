import React from 'react';
import './About.css';
import TeamCards from '../../components/TeamCard/TeamCards';

const sendyEmail = (sender, subject, body) => {
    return fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender, subject, body })
    }).then(response => response.json());

};

class About extends React.Component {

    render() {
        return (
            <div className="App">
                <h1>About the Team</h1>
                <br></br>
                <TeamCards></TeamCards>
                <div className="email-container">
                    <h2>Contact us </h2>
                    <form>
                        <input type="text" placeholder="Your Name" ref="sender" />
                    </form>
                    <form>
                        <input type="text" placeholder="Subject" ref="subject" />
                    </form>
                    <form>
                        <textarea class="email-body" type="text" placeholder="Body" ref="body" />
                    </form>
                    <button class="email-button"
                        onClick={() => {
                            if (this.refs.sender.value && this.refs.subject.value && this.refs.body.value) {
                                sendyEmail(this.refs.sender.value, this.refs.subject.value, this.refs.body.value).then(({ message }) => {
                                    alert(message);
                                });
                            }
                            else {
                                alert("make sure all entries are completed");
                            }
                        }}
                    >
                        Send Email
                            </button>
                </div>
            </div>
        );
    }
}
export default About;

