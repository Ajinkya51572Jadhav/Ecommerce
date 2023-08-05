import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import  LinkedinIcon from "@material-ui/icons/LinkedIn"  
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/Ajinkya_Jadhav_77777/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/duzvvywub/image/upload/v1690948483/clgajinkya_vmdzp5.jpg"
              alt="Founder"
            />
            
            <Typography>Ajinkya Jadhav</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @ajinkyaJadhav. Only with the
              purpose to teach MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://github.com/Ajinkya51572Jadhav"
              target="blank"
            >
              <GitHubIcon className="youtubeSvgIcon" />
            </a>
            
            <a href= "https://www.linkedin.com/in/ajinkya-jadhav-a2665623b/" target="blank">
            <LinkedinIcon  className="LinkedinSvgIcon" /></a>
            
            

            <a href="https://www.instagram.com/Ajinkya_Jadhav_77777/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />

            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
