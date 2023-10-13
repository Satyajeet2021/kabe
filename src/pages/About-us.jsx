import { Button } from "@mui/material";
import React, { useRef, useEffect } from "react";
import { useConsumeContext } from "../context/ContextFile";
import googleImage from "../utils/google.webp";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

import logo2 from "../assets/images/logo3.png";
import logo3 from "../assets/images/SearchLogo.png";
import logo4 from "../assets/images/SearchLogo2.png";
import googlesearch from "../assets/images/googlesearch.png";
import about_2 from "../assets/images/about-2.png";
import about_3 from "../assets/images/about-3.png";
import about_4 from "../assets/images/about-4.png";
import about_5 from "../assets/images/about-5.png";
import rainbow from "../assets/images/rainbow.png";


import Navbar from '../components/Navbar'

const About = () => {
    
  

  return (
    <div className='about-us'>
      <div className='light about-cover col-md-12'>
        <Navbar />
        <h1>About</h1>           
      </div>
      <div className="about-1">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="left">
                <a href="#"><img src={logo4} alt="" /></a>
                <h2>A Safe Place For Kids To Create</h2>
                <p>On The Internet, Children Mostly Consume.  And The Vast Majority Of What They Consume Is Mind-Numbing Clickbait Like Unboxing Videos Or Watching Other Kids Play Roblox And Minecraft. <br />
                  <br/> Here Kids Create Instead Of Consuming.  They Use Their Imaginations To Paint Beautiful Original Images That They Can Save And Share With Friends And Family.
                </p>
              </div>
            </div>
            <div className="col-md-6">
               <div className="right">
                  <div className="about-img"><img src={about_2} alt="" /></div>
                  <div className="about-img"><img src={about_3} alt="" /></div>
                  <div className="about-img"><img src={about_4} alt="" /></div>
               </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-2">
        <div className="container"><div className="fish-section"></div></div>
      </div>
      <div className="about-3">
        <div className="container">
        <div className="row">
          <div className="col-md-4">
              <div className="left-3">
                <h2>At Makerdog We Value Creation Over Consumption.</h2>
                <p>We Are Unified Around The Common Enemy Of Mindless Consumption.  We Are Parents That Want To Help Tease Out The Creativity In All Of Our Kids.  This Is A Safe And Fun Place To Create, Learn, And Share.</p>
              </div>
          </div>
          <div className="col-md-8">
             <div className="right-3">
              <img src={about_5} alt=""  width="100%" />
             </div>
          </div>
        </div>
        </div>
      </div>
      <div className="about-4">
        <div className="container">
        <h2>Kids Are The Stars Here.  We Are Not Creating The Content, They Are.  At Maker Dog Kids Are Makers And Artists.  </h2>
        </div>
        
      </div>

    <div className="container">
      <div class="load-more">
            <a href="/">
               <img src={rainbow} alt="" width="100%" />
            </a>
      </div>
    </div>
        
      {/* {<Footer />} */}
    </div>
    
  );
};

export default About;
