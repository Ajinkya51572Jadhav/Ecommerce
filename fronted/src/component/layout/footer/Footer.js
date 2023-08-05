import {Fragment} from "react";

import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import "./Footer.css";


const Footer = () => {
  return (
    <Fragment>  
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; Ajinkya_Jadhav</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/Ajinkya51572Jadhav">Github</a>
        <a href="https://www.instagram.com/ajinkya_jadhav_77777/">Instagram</a>
        <a href="https://www.linkedin.com/in/ajinkya-jadhav-a2665623b">Linkdin</a>
      </div>
    </footer>
    </Fragment>
  );
};

export default Footer;
