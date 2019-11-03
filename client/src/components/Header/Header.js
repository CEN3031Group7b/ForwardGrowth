import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { slide as Menu } from 'react-burger-menu' //https://www.npmjs.com/package/react-burger-menu
import logo from '../../assets/OrchardGroveLogo.png';
import menuButton from '../../assets/Hamburger_icon.png';


const Header = () => {
    return (
        <Menu width = {'30%'} customBurgerIcon={ <img src= {menuButton} /> }>
        <a id="home" className="menu-item" href="/" style={{ textDecoration: 'none' }}>Home</a>
        <a id="about" className="menu-item" href="/about" style={{ textDecoration: 'none' }}>About</a>
        <a id="contact" className="menu-item" href="/blog" style={{ textDecoration: 'none' }}>Blog</a>
        
      </Menu>

      //Below is old code for the top navigation default from the MERN Template 
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
