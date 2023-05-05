import React from 'react'
import { MdAccountCircle } from "react-icons/md";
import { logout } from '../../redux/action/userAction';
import { useDispatch } from 'react-redux';
const UserOptions = ({user}) => {
  const dispatch=useDispatch();
  const logoutHandler=(e)=>{
   e.preventDefault();
      dispatch(logout());
   
  }
  return (
  <>
 <MdAccountCircle  onClick={logoutHandler}></MdAccountCircle>
  </>
  )
}

export default UserOptions