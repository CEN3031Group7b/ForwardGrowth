import React from 'react';
import logo from '../../assets/OrchardGroveLogo.png';
import './About.css';
import avatar from './img_avatar.png';


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
            <div>
                <div className="App">
                    <h1>About the Team Page</h1>
                </div>
                {/* <div class="card">
                <img src="img_avatar.png" alt="Avatar" />
                <div class="container">
                    <h4><b>John Doe</b></h4>
                    <p>Architect &#38; Engineer</p>
                </div>
            </div> */}
                <div class="card-row">
                    <table>
                        <tr>
                            <td>
                                <div class="flip-card">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <img src={avatar} alt="Avatar" />
                                            <div class="container">
                                                <h4><b>John Doe</b></h4>
                                                <p>Architect &#38; Engineer</p>
                                            </div>
                                        </div>
                                        <div class="flip-card-back">
                                            <h1>John Doe</h1>
                                            <p>Architect &#38; Engineer</p>
                                            <p>We love that guy</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flip-card">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <img src={avatar} alt="Avatar" />
                                            <div class="container">
                                                <h4><b>John Doe</b></h4>
                                                <p>Architect &#38; Engineer</p>
                                            </div>
                                        </div>
                                        <div class="flip-card-back">
                                            <h1>John Doe</h1>
                                            <p>Architect &#38; Engineer</p>
                                            <p>We love that guy</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <form>
                    <input type="text" placeholder="Your Name" ref="sender" />
                </form>
                <form>
                    <input type="text" placeholder="Subject" ref="subject" />
                </form>
                <form>
                    <textarea type="text" placeholder="body" ref="body" />

                </form>
                <button
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
        );
    }
}
export default About;

