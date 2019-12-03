import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { slide as Menu } from 'react-burger-menu' //https://www.npmjs.com/package/react-burger-menu
import logo from '../../assets/OrchardGroveLogo.png';
import menuButton from '../../assets/Hamburger_icon.png';
import { Redirect } from 'react-router-dom';

function loginShow() {
  if (localStorage.getItem('token') !== 'blah') {
    return <a href="Admin">Admin Dashboard</a>
  }
  else {
    return <a href="Login">Login </a>

  }
};
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: null,

    };
  }
  componentDidMount() {
    fetch('/api/get_header')
      .then(res => {
        return res.text();
      })
      .then(res => {
        var obj = JSON.parse(res);
        this.setState({
          logo: `data:${obj.img.contentType};base64,${Buffer.from(obj.img.data).toString('base64')}`
        })
      })
  }
  render() {
    return (
      // <div class="header" id="myHeader">
      //   <a href="/Home"><img src={logo} width={'50 px'} align = "center" alt="logo"></img></a>
      //   </div>
      <div class="wrapper">
        <div class="header" align="center">
          <a href="/Home"><img src={this.state.logo} width={'100 px'} alt="logo"></img></a>
          {(localStorage.getItem('token') !== 'blah' && localStorage.getItem('token') !== null) ?
            <div class="button" align="right">
              <button>
                <a href="/Admin">Admin Dashboard</a>
              </button>
            </div>

            :
            // <div class="button" align="right">
            //   <button>
            //     <a href="/Login">Login</a>
            //   </button>
            // </div>
            <a class="button" alight = "right" href="/Login">Login</a>


          }

        </div>



        <Menu width={'15rem'} customBurgerIcon={<img src={menuButton} />}>
          <a id="home" className="menu-item" href="/" style={{ textDecoration: 'none' }}>Home</a>
          <a id="about" className="menu-item" href="/about" style={{ textDecoration: 'none' }}>About the Team</a>
          <a id="contact" className="menu-item" href="/blog" style={{ textDecoration: 'none' }}>Blog</a>

        </Menu>



      </div>
    );
  };
}

export default Header;
