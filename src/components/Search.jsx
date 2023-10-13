import { Button } from "@mui/material";
import React, { useRef, useEffect } from "react";
import { useConsumeContext } from "../context/ContextFile";
import googleImage from "../utils/google.webp";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

import logo2 from "../assets/images/logo3.png";
import logo3 from "../assets/images/SearchLogo.png";
import googlesearch from "../assets/images/googlesearch.png";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import AxiosInstance from "../helper/AxiosInstance";

const Search = () => {
  const navigate = useNavigate()
  const {
    data,
    setData,
    loading,
    setLoading,
    getDataFromApi,
    searchValue,
    userHistory,
    setUserHistory,
    setSearchValue,
  } = useConsumeContext();
  // console.log("setSearchValue======================", searchValue)
  // const voiceInoutRef = useRef(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript
  } = useSpeechRecognition();

  const speech = useSpeechRecognition();

  const navRef = React.useRef(null);

  const myRef = useRef();
  // console.log(searchValue);

  const genImage = async (searchString) => {
    // console.log("searchValue", searchValue);
    let storedSearchString = searchString;
    const currentTime = new Date(Date.now());
    const response = await AxiosInstance.post("/api/v1/search/generateImage", { text: storedSearchString });
    console.log("imgResp", response);
    setData(response);
    setLoading(false);
    // setRenderHistory(response?.data?.result?.data);
    // console.log("renderHistoryOnEffect", renderHistory);
    setUserHistory(prevHistory => {
      const history = [...prevHistory];
      history.unshift({ url: response?.data?.data?.output[0], createdAt: currentTime, prompt: `Prompt used to display the image "${storedSearchString}"` },
        { url: response?.data?.data?.output[1], createdAt: currentTime, prompt: `Prompt used to display the image "${storedSearchString}"` },
        { url: response?.data?.data?.output[2], createdAt: currentTime, prompt: `Prompt used to display the image "${storedSearchString}"` },
        { url: response?.data?.data?.output[3], createdAt: currentTime, prompt: `Prompt used to display the image "${storedSearchString}"` });
      // if (history.length > 6) {
      //   history.splice(6);
      // }
      localStorage.setItem("userHistory", JSON.stringify(history));
      return history;
    })
    // console.log("userHistoryEffect", userHistory);
  }

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

  // console.log("speech", speech);
  // console.log("speechRecognition", SpeechRecognition);
  // console.log("resp", SpeechRecognition.getRecognition);
  // console.log("listening", listening);
  // console.log("transcript", transcript);

  useEffect(() => {
    if (listening) {
      navRef.current.value = transcript;
      setSearchValue(transcript);
    }
    if(finalTranscript){
      setTimeout(() => {
        SpeechRecognition.stopListening();
        genImage(transcript);
        // setSearchValue(navRef.current.value);
        setTimeout(() => {
          navigate("/results");
        }, 500);
      }, 1500);
    }
  }, [transcript, listening, finalTranscript]);

  const sentence = (event) => {
    if(listening){
      SpeechRecognition.stopListening();
    }
    var rand1 = Math.floor(Math.random() * 8);
    var rand2 = Math.floor(Math.random() * 5);
    var rand3 = Math.floor(Math.random() * 5);
    var rand4 = Math.floor(Math.random() * 8);
    if (!event || event === "") {
      var content = "A " + nouns[rand1] + " is " + verbs[rand2] + " with a " + nouns[rand4] + "," + " " + style[rand3] + ".";
    } else {
      var content = "A " + nouns[rand1] + " is " + verbs[rand2] + " with a " + nouns[rand4] + "," + " " + event + ".";
    }
    setTimeout(() => {
      genImage(content);
      navigate("/results");
    }, 500);
    navRef.current.value = content;
    // var searchValue = navRef.current.value;
    setSearchValue(content);
  };

  const appendUserSentence = (event) => {
    if (navRef.current.value == "") {
      sentence(event);
    } else {
      if(listening){
        SpeechRecognition.stopListening();
      }
      navRef.current.value = (navRef.current.value).split(',')[0]
      navRef.current.value = navRef.current.value + ", " + event;
      setSearchValue(navRef.current.value);
      setTimeout(() => {
        genImage(navRef.current.value);
        navigate("/results");
      }, 500);
    }

  }
  const appendUserSentenceenter = () => {
    // debugger;
    if(listening){
      SpeechRecognition.stopListening();
    }
    navRef.current.value = (navRef.current.value).split(',')[0]
    navRef.current.value = navRef.current.value;
    setSearchValue(navRef.current.value);
    setTimeout(() => {
      genImage(navRef.current.value);
      navigate("/results");
    }, 500);
  }


  const handleKeyDown = (event) => {
    debugger
    if (event.key === 'Enter') {
      // console.log('do validate');
      appendUserSentenceenter();
      if(listening){
        SpeechRecognition.stopListening();
        genImage(navRef.current.value);
        setSearchValue(navRef.current.value);
        setTimeout(() => {
          navigate("/results");
        }, 500);
      }
    }
  }


  return (
    <div className="form-search">
      {/* <div className="d-flex justify-content-center mt-5 search-logo">
        <img src={logo3} alt="" width="215px" />
      </div> */}

      <div className="search-input mob-wid">
        <div className="input-search search1">
          {/* <input type="search" placeholder="Please enter text"/> */}
          <input
            type="text"
            className="form-control rounded-5"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            ref={navRef}
            value={searchValue}
            placeholder="Speak or type a prompt like... Four monkeys in space suits playing ping pong on the moon"
            onChange={(e) => setSearchValue(e.target.value)}
            // onKeyPress={handleKeyDown}
            onKeyDown={handleKeyDown}
          />
          {/* <a href=""><img src={googlesearch} /></a> */}
          <button onClick={(e) => {
            // e.preventDefault();
            SpeechRecognition.stopListening();
            resetTranscript();
          }} > <i class="fa fa-times"></i> </button>
          <button
            onClick={(e) => { e.preventDefault(); startListen() }}
          ><img src={googlesearch} /></button>
        </div>
        {/* <Input  searchValue={searchValue} setSearchValue={setSearchValue} /> */}


        {/* <input ref={navRef} onChange={(e) => { navRef.current.value = e.target.value }} /> */}

        <div className="d-flex gap-3 justify-content-center mob-flex">
          {/* <Button 
          onClick={() =>  navigate("/results")}
          type="submit"  variant="contained" className="markerdog">Paint it makerdog</Button> */}
          {/* <Button  variant="contained" className="crazy markerdog" onClick={sentence} >
          Surprise Me
          </Button> */}
        </div>
        {/* <div className="d-flex gap-3 justify-content-center mob-flex" style={{ paddingBottom: "10px" }}>
          <Button variant="contained" className="crazy markerdog" onClick={() => {
            SpeechRecognition.stopListening();
            genImage(navRef.current.value);
            setSearchValue(navRef.current.value);
            setTimeout(() => {
              navigate("/results");
            }, 500);
          }} >
            <span className="btm-text"> Create </span>
          </Button>
        </div> */}
        <div className="d-flex gap-3 justify-content-center mob-flex" style={{ paddingBottom: "10px" }}>
          <Button variant="contained" className="crazy markerdog" onClick={(e) => appendUserSentence("Digital Art")} >
            <span className="btm-text"> Create Digital Art</span>
          </Button>
        </div>
        <div className="d-flex gap-3 justify-content-center mob-flex" style={{ paddingBottom: "10px" }}>
          <Button variant="contained" className="crazy markerdog" onClick={(e) => appendUserSentence("Cartoon Style")} >
            <span className="btm-text">Create Cartoon</span>
          </Button>
        </div>
        <div className="d-flex gap-3 justify-content-center mob-flex" style={{ paddingBottom: "10px" }}>
          <Button variant="contained" className="crazy markerdog" onClick={(e) => appendUserSentence("Photo-realistic")} >
            <span className="btm-text">Create Photo</span>
          </Button>
        </div>
        <div className="d-flex gap-3 justify-content-center mob-flex" style={{ paddingBottom: "10px" }}>
          <Button variant="contained" className="crazy markerdog" onClick={(e) => sentence()} >
            <span className="btm-text">Surprise Me</span>
          </Button>
        </div>

        {/* <div>
                      <button onClick={sentence} >Refresh<i class="fa fa-refresh" aria-hidden="true"></i></button>
                    </div>
                    <div className="container">
                      <p id="sentence"></p>
                    </div> */}

      </div>
    </div>
  );
};

export default Search;
