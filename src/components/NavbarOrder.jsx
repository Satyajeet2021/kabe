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
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartButton from "./cartButton";

const NavbarOrder = ({ navigateTo }) => {
  const navigate = useNavigate();
  const [animationParent] = useAutoAnimate()
  const { loading, dark, setDark } = useConsumeContext();
  const [popUp, setPopUp] = useState(false)
  // console.log(loading);
  return (

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="/"><img src={logo4} /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="surprise-me foot-sur">
            <div class="surprise-me" style={{ paddingRight: "5px" }}>
              <Button onClick={() => navigate("/")} class="btn-login" style={{ marginRight: "5px" }}>Home</Button>
            </div>
            <div class="surprise-me" style={{ paddingRight: "5px" }}>
              <Button onClick={() => navigate(navigateTo)} class="btn-login" style={{ marginRight: "5px" }}>Back</Button>
            </div>
            {/* <Button title={{"Contact Us \n MakerDogKabe@gmail.com"}} class="btn-login" ></Button> */}
            <div class="surprise-me">
              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default NavbarOrder;
