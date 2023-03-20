import React from 'react'
import playstoremod from '../../../images/playstoremod.png'
import iosstore from '../../../images/iosstore.png'
import './Footer.css'

const footer = () => {
  return (
  <footer id='footer'>
      <div className='leftFooter'>
        <h4>Download Our App</h4>
        <p>Download App for Android and Ios Mobile Phone</p>
        <img src={playstoremod} alt="playstore" />
        <img src={iosstore} alt="appstore" />

</div>
<div className='midFooter'>
    <h1>FHC</h1>
    <p>High quality is our first priority</p>
    <p>Copyrights 2023 &copy; @Ecommerce</p>
    
</div>
<div className='rightFooter'>
    <h4>Follow Us</h4>
    <a href="www.instagram.com">Instagram</a>
    <a href="www.facebook.com">Facebook</a>
    <a href="www.youtube.com">Youtube</a>
    
</div>
  </footer>
  )
}

export default footer