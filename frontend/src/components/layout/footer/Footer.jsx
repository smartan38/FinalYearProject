import React from 'react'
import { FaInstagram,FaFacebook,FaTwitter } from "react-icons/fa";
import "./Footer.css"

const Foooter = () => {
  return (
   <footer id="footer">
    <div className='rightFooter'>
      <h4>
        Welcome To MyApp
      </h4>
    </div>
    <div className='midFooter'>
      <p>Service is our Worship</p>
      <p>Copyrights 2023 &copy; dropOut</p>
    </div>
    <div className='leftFooter'>
    <h3>Social Media</h3>
      <div className='socialMedia'>
     
        <h2 className='icon'><FaInstagram/></h2>
        <h2 className='icon'><FaFacebook/></h2>
        <h2 className='icon'><FaTwitter/></h2>

      </div>

    </div>

   </footer>
  )
}

export default Foooter