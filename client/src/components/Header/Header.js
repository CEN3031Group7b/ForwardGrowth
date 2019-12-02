import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { slide as Menu } from 'react-burger-menu' //https://www.npmjs.com/package/react-burger-menu
import logo from '../../assets/OrchardGroveLogo.png';
import menuButton from '../../assets/Hamburger_icon.png';
import {Redirect } from 'react-router-dom';

function loginShow() {
    if (localStorage.getItem('token') !== 'blah') {
        return <a href="Admin">Admin Dashboard</a>
    }
    else {
        return <a href="Login">Login </a>
        
    }
};
const Header = () => {
    
  return (
    // <div class="header" id="myHeader">
    //   <a href="/Home"><img src={logo} width={'50 px'} align = "center" alt="logo"></img></a>
    //   </div>
    <div class="wrapper">
      <div class="header" align="center">
              <a href="/Home"><img src={logo} width={'100 px'} alt="logo"></img></a>
              {(localStorage.getItem('token') !== 'blah') ?
                  <div class="button" align="right">
                      <button>
                          <a href="/Admin">Admin Dashboard</a>
                      </button>
                  </div>

                  :
                  <div class="button" align="right">
                      <button>
                          <a href="/Login">Login</a>
                      </button>
                  </div>


                  }

        </div>
          
              
          
      <Menu width={'15rem'} customBurgerIcon={<img src={menuButton} />}>
        <a id="home" className="menu-item" href="/" style={{ textDecoration: 'none' }}>Home</a>
        <a id="about" className="menu-item" href="/about" style={{ textDecoration: 'none' }}>About the Team</a>
        <a id="contact" className="menu-item" href="/blog" style={{ textDecoration: 'none' }}>Blog</a>

          </Menu>
          

          
    </div>




    //Below is old code for the top navigation default from the MERN Template in case we want to switch back to this
    // <div className='topnav'>
    //         <Link className="topnav-link" to="/about">About</Link> */}

    //         <Link className="topnav-link" to='/Home'>Home</Link>
    //         <Link className="topnav-link" to='/About'>About the Team</Link>
    //         <Link className="topnav-link" to="/Blog">Blog Posts</Link>
    //     </div>
    // </div>
  )
}

export default Header;
