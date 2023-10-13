import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import PopUp from "./PopUp"
import { useNavigate } from "react-router-dom";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useConsumeContext } from "../context/ContextFile";
import { Button } from "@mui/material";
import axios from "axios"

import logo2 from "../assets/images/logo3.png";
import Input from "../components/Input";
import logo4 from "../assets/images/SearchLogo2.png";
import googlesearch from "../assets/images/googlesearch.png";
import googleglass from "../assets/images/paint.png";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import AxiosInstance from "../helper/AxiosInstance";
import CartButton from "./cartButton";

const NavbarResult = ({ generateImageOnResult, historySentence, startLoader }) => {
  const [animationParent] = useAutoAnimate()
  const { dark, setDark } = useConsumeContext();
  const [popUp, setPopUp] = useState(false)
  // const voiceInoutRef = useRef(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript
  } = useSpeechRecognition();

  const navigate = useNavigate()
  const {
    data,
    setData,
    loading,
    setLoading,
    getDataFromApi,
    searchValue,
    setSearchValue,
  } = useConsumeContext();

  const navRef = React.useRef(null);

  const myRef = useRef();
  // console.log(searchValue);

  var verbs, nouns, adjectives, adverbs, style;
  nouns = ["bird", "elephant", "boy", "duck", "cat", "monkey", "hamster", "dog"];
  verbs = ["running", "playing", "walking", "dancing", "laughing"];
  style = ["digital art", "Van Gogh style", "Cartoon", "Anime", "painting"];

  function randGen() {
    return Math.floor(Math.random() * 5);
  }

  const startListen = () => {
    navRef.current.focus();
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  }

  // console.log("speechRecognition", SpeechRecognition);
  // console.log("resp", SpeechRecognition.getRecognition);
  // console.log("listening", listening);
  // console.log("transcript", transcript);

  const sentence = async (e) => {
    // debugger;
    if(listening){
      SpeechRecognition.stopListening();
    }
    var rand1 = Math.floor(Math.random() * 8);
    var rand2 = Math.floor(Math.random() * 5);
    var rand3 = Math.floor(Math.random() * 5);
    var rand4 = Math.floor(Math.random() * 8);
    //                var randCol = [rand1,rand2,rand3,rand4,rand5];
    //                var i = randGen();
    var content = "A " + nouns[rand1] + " is " + verbs[rand2] + " with a " + nouns[rand4] + "," + " " + style[rand3] + ".";

    // document.getElementById('sentence').innerHTML = "&quot;" + content + "&quot;";

    // alert(content);

    navRef.current.value = content;
    var searchValue = navRef.current.value;

    setSearchValue(content);

    // genImage();
    startLoader(true);
    const response = await AxiosInstance.post("/api/v1/search/generateImage", { text: content });
    console.log("imgResp", response);
    generateImageOnResult(response, true, content);

  };

  const genImage = async () => {    
    if(listening){
      SpeechRecognition.stopListening();
    }
    startLoader(true);
    const response = await AxiosInstance.post("/api/v1/search/generateImage", { text: searchValue });
    console.log("imgResp", response);
    generateImageOnResult(response, true);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // console.log('do validate');
      genImage();
    }
  }

  useEffect(() => {    
    if (listening) {
      navRef.current.value = transcript;
      setSearchValue(transcript);
    }
    if(finalTranscript){
      setTimeout(() => {
        // SpeechRecognition.stopListening();
        genImage();
        // setSearchValue(navRef.current.value);
      }, 2000);
    }
  }, [transcript, listening, finalTranscript]);

  return (

    <nav class="navbar bg-body-tertiary result-navbar">
      <div class="container">
        <div className="col-md-3">
          <a class="navbar-brand search-logo" href="/"><img src={logo4} /></a>
        </div>

        <div className="col-md-9 result-search" style={{ marginRight: "-100px" }}>
          <div className="input-search">
            {/* <input type="search" placeholder="Please enter text"/> */}
            <input
              type="text"
              className="form-control rounded-5"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              ref={navRef}//navRef
              value={searchValue}//|| searchValue
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyDown}
            />
            <button onClick={(e) => {
              // e.preventDefault();
              SpeechRecognition.stopListening();
              resetTranscript();
            }} style={{
              border: "transparent",
              backgroundColor: "transparent"
            }} > <i class="fa fa-times"></i> </button>
            <a
              onClick={startListen}
              class="magnify-iconn"><img src={googlesearch} /></a>
            {/* <a onClick={genImage} class="search-icon" ><img src={googleglass} /></a> */}
          </div>
          <div class="nav-search-btn">
            <div class="surprise-me" style={{ paddingRight: "5px" }}>
              <Button class="btn-login" onClick={genImage} >Create</Button>
            </div>
            <div class="surprise-me" style={{ paddingRight: "5px" }}>
              <Button class="btn-login" onClick={sentence}>Surprise Me</Button>
            </div>
            <div class="surprise-me">
              <CartButton />
            </div>
          </div>
          {/* <Input /> */}
        </div>

      </div>
    </nav>

  );
};

export default NavbarResult;
