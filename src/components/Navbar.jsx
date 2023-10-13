import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import PopUp from "./PopUp"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useConsumeContext } from "../context/ContextFile";

import logo2 from "../assets/images/logo3.png";
import logo4 from "../assets/images/SearchLogo2.png";

const Navbar = () => {
  const [animationParent] = useAutoAnimate()
  const { loading, dark , setDark } = useConsumeContext();
  const [popUp , setPopUp] = useState(false)
  // console.log(loading);
  return (

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="/"><img src={logo4} /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" aria-current="page" href="/">Home</a>
            <a class="nav-link" href="/about-us">About</a>
            <a class="nav-link" href="/cart">Cart</a>
            {/* <a class="nav-link" href="/">Recent</a>
            <a class="nav-link" href="/">Premium</a>
            <a class="nav-link btn-login" href="/">Login</a> */}
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
