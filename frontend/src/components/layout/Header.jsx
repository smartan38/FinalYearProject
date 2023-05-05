import React from 'react'
import { Link } from 'react-router-dom'
import { BiCart,BiSearch,BiLogIn } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Header.css"
const Header = () => {
  const navigate=useNavigate()
  const {isAuthenticated} = useSelector(state=>state.user)
  const acountHandler=(e)=>{
    e.preventDefault();
    navigate("/acount")
  }
  return (
    <section className='header'>
        <div className='logo'>MYApp</div>
        <div className='atag'>
            <Link className ="a1" to="/">HOME</Link>
            <Link className ="a1" to="/products">PRODUCT</Link>
            <Link className ="a1" to="/about">ABOUT</Link>
            <Link className ="a1" to="/contact">CONTACT</Link>
            <Link className ="a2" to="/cart"><BiCart/></Link>
            <Link className ="a2" to="/login">{isAuthenticated?<MdAccountCircle onClick={acountHandler}/>:<BiLogIn/>}</Link>
            <Link className ="a2" to="/search"><BiSearch/></Link>
           
            
        </div>
    </section>
  )
}

export default Header