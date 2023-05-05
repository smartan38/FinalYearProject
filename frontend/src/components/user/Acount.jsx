import React from 'react'
import { useSelector } from 'react-redux'
// import UserOptions from "../layout/UserOptions"
import { logout } from '../../redux/action/userAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./acount.css"
const Acount = () => {
    const navigate =useNavigate()
    const {isAuthenticated} = useSelector(state=>state.user)

    const dispatch=useDispatch();
    const logoutHandler=(e)=>{
     e.preventDefault();
        dispatch(logout());
   if(!isAuthenticated)
     navigate("/login")
     
    }
    const orderHandler=(e)=>{
        e.preventDefault();
        navigate("/order")
      }
      const profileHandler=(e)=>{
        e.preventDefault();
        navigate("/profile")
      }
      const dashboardHandler=(e)=>{
        e.preventDefault();
        navigate("/admin/dashboard")
      }
      const cartHandler=(e)=>{
        e.preventDefault();
        navigate("/cart")
      }
  return (
  <>
  <section className='acountBox'>
  

     <button className='btn' onClick={cartHandler}>Cart</button>
     <button className='btn' onClick={orderHandler}>Order</button>
     <button className='btn' onClick={profileHandler}>profile</button>
     <button className='btn' onClick={logoutHandler}>Logout</button>
    <button className='btn' onClick={dashboardHandler}>Dashboard</button>
     
    

 
  {/* {isAuthenticated && <UserOptions user={user}/>} */}
  </section>
  </>
  )
}

export default Acount