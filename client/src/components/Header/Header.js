import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { slide as Menu } from 'react-burger-menu' //https://www.npmjs.com/package/react-burger-menu
import logo from '../../assets/OrchardGroveLogo.png';
import menuButton from '../../assets/Hamburger_icon.png';
import { Redirect } from 'react-router-dom';

//Changing the upper right corner button for users that are logged in versus users that are not 
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
    //This state has the current header image to be displayed
    this.state = {
      logo: null,

    };
  }
  componentDidMount() {
    //Header is stored in DB, this code pulls the file once the page is loaded. 
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
      <div class="wrapper">
        <div class="header" align="center">
          <a href="/Home"><img src={this.state.logo} width={'100 px'} alt="logo"></img></a>
          {(localStorage.getItem('token') !== 'blah' && localStorage.getItem('token') !== null) ?
          //Changing the upper right corner button for users that are logged in versus users that are not 
            <a class="button" align="right" href="/Admin">Admin Dashboard</a>
            :
            <a class="button" align="right" href="/Login">Login</a>
          }

        </div>
        {/* Rendering hamburger menu as a part of the header */}
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
