import React from 'react'
import "./about.css"
import { Link } from 'react-router-dom'
const About = () => {
  return (
  <div className='main'>
   <div className='main2'>
  <h2 className='h2'>ABOUT MY JOURNEY</h2>
  <p className='para'>My Name Is Saurav Kumar , I am An Indian Entrepreneur & Full Stack MERN Deveoper</p>
   <h3 className='h3'>Please Contact me Through Contact Page! Thank You</h3>
  <Link to="/contact">
   <button className='buttons'>Contact</button>
   </Link>
  </div>
  </div>
  )
}

export default About