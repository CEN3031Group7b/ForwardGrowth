import React from 'react';
import './Home.css'
import app from '../../assets/AppStore.svg';
import demo from '../../assets/ForwardGrowthDemo.png';
import demo1 from '../../assets/ForwardGrowthDemo-1.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


//Home Page: Sofia & Mark
//Mark: HTML
//Sofia: Boostrap and CSS

//npm install react-slick --save
//npm install slick-carousel

const newEmail = (name, email) => {
    return fetch("/api/add_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    }).then(response => response.json());

};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            payment: '',
            about: '',
            applink: '',
        };

    }
    componentDidMount() {

        fetch('/api/get_home')
            .then(res => {
                return res.text();
            })
            .then(res => {
                console.log('My data is:' + res);
                var obj = JSON.parse(res);
                this.setState({
                    company: obj.company,
                    payment: obj.payment,
                    about: obj.about,
                    applink: obj.applink
                })
            })
    }
    render() {
        this.inputRef = React.createRef();

        return (
            <div className="App">
            <h2 class="font_2">
                    Backpack Adventurers
            </h2>
            <br></br>
            {/* <p className="font_7">
            A gaming app that will teach about the fundamentals of budgeting and traveling
            </p> */}
                <Slider
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                infinite={true}
                dots={true}
                autoplay={true}
                autoplaySpeed={3000}
                cssEase={"linear"}
                >
                    <div>
                        <img className="graphics" src={demo} alt="Backpack Adventures Gaming App"></img>
                    </div>
                    <div>
                        <img className="graphics" src={demo1} alt="Backpack Adventures Gaming App"></img>
                    </div>
                </Slider>
                <div className="container-fluid bg-1 text-center">
                    <a target="_blank" rel="noopener noreferrer" href={this.state.applink}>
                        <img src ={app} width={'180 px'} height={'150 px'} alt = "App Store"></img>
                    </a>
                <div className="container-fluid bg-6 text-center">
                    <h1>Features</h1>
                    <h2> Company </h2>
                    <p>{this.state.company}</p>
                    <h2>Payment Methods</h2>
                    <p>{this.state.payment}</p>
                </div>
                <div className="container-fluid bg-6 text-center">
                    <h1>About</h1>
                    <p>{this.state.about}</p>
                </div>
                <div className="container-fluid bg-6 text-center">
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
                    <button className = "mybutton"
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
                
            </div>
            </div>
        );
    }
}

export default Home;
