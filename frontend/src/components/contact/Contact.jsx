import React from 'react'
import "./contact.css"
import { useState } from 'react';

import axios from 'axios';

const Contact = () => {
    

      const [enteredName , setName]=useState('');
      const [enteredEmail , setEmail]=useState('');
      const [enteredMessage , setMessage]=useState('');
      const nameHandler =(event)=>
      {
              setName(event.target.value);
      }
      const emailHandler = (event) =>
      {
              setEmail(event.target.value);
      }
      const messageHandler = (event) =>
      {
              setMessage(event.target.value);
      }
      
      const submitHandler = (event)=>{
        event.preventDefault();
        const data = {
          name : enteredName,
          email : enteredEmail,
         message : enteredMessage,
        }
         axios.post(`api/v1/contact`,data,{
          withCredentials : true,
         });
         setName('');
      
         setEmail('');
         setMessage('');
        alert("Thank For Contacting Us...");
      }

  return (
<section className='contact'>

 <form onSubmit={submitHandler}>
    <h2 className='heading'>Contact Us</h2>
    
    <input className="input" type="text" placeholder='Name' 
     value={enteredName}
     onChange={nameHandler}
    />
    <input className="input" type= "email" placeholder='Email'
      value={enteredEmail}
      onChange={emailHandler}
    />
    <textarea className='textArea' placeholder='Message' cols="30" rows="10" 
      value={enteredMessage}
      onChange={messageHandler}
    />
    <button className="button" type="submit" >SEND US</button>
  
 </form>

</section>
  )
}

export default Contact