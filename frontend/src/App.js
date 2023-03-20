import React from 'react';
import './App.css';
import Navbar from "./component/layout/Navbar/Navbar.js"
import { BrowserRouter as Router,Routes,Route, } from 'react-router-dom';
import Footer from "./component/layout/Footer/Footer.js"
import WebFont from 'webfontloader';
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js'
import Search  from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
// import Loader from './component/layout/Loader/Loader'
import UserOptions from "./component/layout/Navbar/UserOptions.js"
import { useSelector } from 'react-redux';


function App() {
  
  // const {isAuthenticated,user} = useSelector(state=>state.user)
    React.useEffect(()=>{
      WebFont.load({
        google:{
          families:["Macondo","Droid Sans","Chilanka"]
        },
      })
    
    },[])
  return <Router>
       <Navbar />
  
       <Routes><Route path="/" element={<Home />} /></Routes>
       <Routes><Route path="/product/:id" element={<ProductDetails />} /></Routes>
       <Routes><Route path="/products" element={<Products />}></Route></Routes>
       <Routes><Route path="/products/:keyword" element={<Products />}></Route></Routes>
       <Routes><Route path="/search" element={<Search />}></Route></Routes>
       <Routes><Route path="/login" element={<LoginSignUp />}></Route></Routes>
       <Footer />
    </Router>
}

export default App;
