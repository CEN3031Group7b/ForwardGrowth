import React from 'react';
import './Home.css'
import app from '../../assets/AppStore.svg';
import og from '../../assets/OrchardGrove(1).png';
import demo from '../../assets/ForwardGrowthDemo.png';
import demo1 from '../../assets/ForwardGrowthDemo-1.png';
//import Image from 'react-bootstrap/Image'

//Home Page: Sofia & Mark
//Mark: Static
//Sofia: Boostrap and CSS

const newEmail = (name, email) => {
    return fetch("/api/add_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    }).then(response => response.json());

};
const listServe = (subject, body) => {
    return fetch("/api/list_serve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body })
    }).then(response => response.json());

};
class Home extends React.Component {
    render() {
        const getUser = (_name, _email) => {

        };
        this.inputRef = React.createRef();

        return (
            <div className="App">
                {/* <h1>Home Page</h1> */}
                <div className="container-fluid bg-1 text-center">
                    <h1>Backpack Adventures</h1>
                    <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/temple-run/id420009108?mt=8"><img src={app} width={'120 px'} height={'100 px'} alt="App Store"></img></a>
                </div>
                <div className="bg-2 text-center">
                    <h1>Features</h1>
                    <h2> Company </h2>
                    <p>
                        Forward Growth is company that focuses on providing
                        a service for educational applications to tutoring
                        and early learning resources. This company was created
                        to bridge the gap between financial literacy and youth.
                        Our commitment is to better serve lower income families
                        with the ability to learn about saving money.
                        </p>
                    <h2>Payment Methods</h2>
                    <p>
                        The payment method for this application is free to download
                        but Orchard Grove comes with in-app purchases.
                        </p>
                </div>
                <div className="bg-3 text-center">
                    <h1>About</h1>
                    <p>
                        Orchard will provide a service that will help the user
                        complete daily goals to save money. Each goal will have
                        a growth tree and every time you save up for the goal.
                        The tree will create an animation of your progress on the
                        goal. Daily friendly reminders to remember to save money.
                        A list that will hold all your goal names, deadlines, and
                        amounts. (It will act as a budget list for all your saving
                        goals.) Every time you aim to save money towards your
                        budgeting goals you can earn points each time you update it.
                         If you earn enough points, you can receive special badges
                         for the user as an incentive for saving. It’s operated
                         similarly to the mechanics of a video game.
                        </p>
                </div>
                <div className="bg-4 text-center">
                    <h1>Screenshots</h1>
                    {/* <div className="bg">
                        <img src={og} alt="Backpack Adventures Gaming App"></img>
                    </div> */}
                    <div className="bg">
                        <img className="graphics" src={demo} alt="Backpack Adventures Gaming App"></img>
                    </div>
                    <div className="bg">
                        <img className="graphics" src={demo1} alt="Backpack Adventures Gaming App"></img>
                    </div>
                </div>
                <div className="bg-5 text-center">
                    <h1>Be in touch</h1>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-ml">
                                <input className="form-control form-control-sm" ref="name" placeholder="Name" type="text" />
                            </div>
                            <div className="form-group col-mr">
                                <input className="form-control form-control-sm" ref="email" placeholder="EMusk@hotmail.com" type="text" />
                            </div>
                        </div>
                        <br></br>

                    </form>
                    <button
                        onClick={() => {
                            if (this.refs.name.value && this.refs.email.value) {
                                newEmail(this.refs.name.value, this.refs.email.value).then((message) => {
                                    alert(message);
                                });
                            }
                            else {
                                alert("make sure all entries are completed");
                            }
                        }}
                    >
                        Add Email
                    </button>
                </div>
                <button
                    onClick={() => {
                        listServe('testy', 'wazoo is an odd word').then(({ message }) => {
                            alert(message);
                        });
                    }}
                >
                    list serve test
                    </button>
            </div>
        );
    }
}

export default Home;
