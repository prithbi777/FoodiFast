import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div id='footer' className='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img id='footerimglogo' src={assets.logo} alt="" />
                <p>We are with a vision to feed the nation and bringing most loved offeres to the customers out there.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />

                </div>
            </div>

            


            <div className="footer-content-center">
                <h2>THE COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy</li>

                </ul>

            </div>



            <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91123456789</li>
                        <li>contact@tomato.com</li>
                    </ul>

            </div>


        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 @ Tomato.com - All Right Reserved.</p>


    </div>
  )
}

export default Footer