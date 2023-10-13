import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import logo3 from "../assets/images/SearchLogo2.png";

const Footer = () => {
  // const [state, setState] = useState({
  //   countryName: "",
  //   city: "",
  // });

  // const getGeoInfo = () => {
  //   axios
  //     .get("https://ipapi.co/json/")
  //     .then((response) => {
  //       let data = response.data;
  //       setState({
  //         ...state,

  //         countryName: data.country_name,

  //         city: data.city,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getGeoInfo();
  // }, []);

  return (
    <div className="blog-section">
      <div class="container">
        <div className="logo">
          <img src={logo3} alt="" width="215px" />
        </div>
        <p>Want to know more about MakerDog?</p>
        <div class="surprise-me foot-sur">
          <a href="/about-us">
            <Button class="btn-login">About Us</Button>
          </a>
        </div>
        <div class="surprise-me foot-sur" id="makerDogEmail" data-tooltip-content="makerdogkabe@gmail.com">
          <Tooltip anchorId="makerDogEmail" />
          <Button class="btn-login">Contact Us</Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
