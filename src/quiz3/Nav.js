import React from "react"
import { Link } from "react-router-dom";
import "./Style.css"
import Logo from './img/logo.png'

const Nav = () =>{

  return(
    <nav>
      <img src={Logo} width='200px' alt='logo'></img>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/mle">Movie List Editor</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
