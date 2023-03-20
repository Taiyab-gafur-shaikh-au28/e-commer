import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
const Navbar = () => {
    let activeStyle = {
        color:"#fff"
    }
    const [isMobile, setIsMobile] = useState(false);
  return (
    <nav className='navbar'>
        <h3 className='logo'>Ecommerce</h3>
        
        <ul className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}>
        <Link to="/" className='home' >
                <li >Home</li>
            </Link>
            <Link to="/products" className='product'>
                <li>Products</li>
            </Link>
            <Link to="/search" className='search'>
                <li>Search</li>
            </Link>
            <Link to="/about" className='about'>
                <li>About</li>
            </Link>
            <Link to="/contact" className='contact'>
                <li>Contact</li>
            </Link>
            <Link to="/login" className='login'>
                <li>Login</li>
            </Link>
        </ul>
        <button className='mobile-menu-icon' 
        onClick={()=> setIsMobile(!isMobile)}>
            {isMobile ? (<i className='fa fa-times'></i>) : (<i className='fa fa-bars'></i>) }
        </button>
    </nav>
  )
}

export default Navbar