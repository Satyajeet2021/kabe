import React from "react";
import { useEffect, useState } from "react";
import { useConsumeContext } from "../context/ContextFile";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/Loding-spancer";
import Infos from "../components/Infos";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Images from "../components/Images";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavbarResult from "../components/NavbarResult";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import LazyLoad from 'react-lazy-load';
import { Tooltip } from 'react-tooltip'
import Popup from 'reactjs-popup';
// import Carousel from 'react-bootstrap/Carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// import ResultCrousal from '../components/ResultCrousal';
import Carousel2 from 'carousel-react-rcdev';

import submit from "../assets/images/submit.png";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
import toy1 from "../assets/images/toy1.jpg";
import toy2 from "../assets/images/toy2.jpg";
import toy3 from "../assets/images/toy3.jpg";
import toy4 from "../assets/images/toy4.jpg";
import toy5 from "../assets/images/toy5.jpg";
import toy6 from "../assets/images/toy6.jpg";
import toy7 from "../assets/images/toy7.jpg";
import toy8 from "../assets/images/toy8.jpg";
import toy9 from "../assets/images/toy9.jpg";
import toy10 from "../assets/images/toy10.jpg";
import toy11 from "../assets/images/toy11.jpg";
import toy12 from "../assets/images/toy12.jpg";

import img6 from "../assets/images/img6.png";
import img7 from "../assets/images/img7.png";
import img8 from "../assets/images/img8.png";
import img9 from "../assets/images/img9.png";
import recent1 from "../assets/images/recent1.png";
import recent2 from "../assets/images/recent2.png";
import recent3 from "../assets/images/recent3.png";
import recent4 from "../assets/images/recent4.png";
import recent5 from "../assets/images/recent5.png";
import recent6 from "../assets/images/recent6.png";
import logo3 from "../assets/images/SearchLogo2.png";

import crousal1 from "../assets/images/crousal1.png";
import crousal2 from "../assets/images/crousal2.png";
import crousal3 from "../assets/images/crousal3.png";
import crousal4 from "../assets/images/crousal4.png";
import crousal5 from "../assets/images/crousal5.png";
import crousal6 from "../assets/images/crousal6.png";
import crousal7 from "../assets/images/crousal1.png";
import rainbow from "../assets/images/rainbow.png";
import WhiteTshirt from "../assets/images/white-tshirt.png";
import photoFrame from "../assets/images/photoFrame.png";
import { v4 as uuidv4 } from 'uuid';

import { saveAs } from "file-saver";
import AxiosInstance from "../helper/AxiosInstance";
import Watermark from '@uiw/react-watermark';
import mug from "../assets/images/mug.png";
import postcard from "../assets/images/postcard.png"

const Results = () => {

  const {
    data,
    setData,

    // getImageFromApi,
    // getDataFromApi,
    searchValue,
    img, setImg,
    userHistory,
    setUserHistory,
    loading, setLoading,
    favImg,
    setFavImg
  } = useConsumeContext();
  const dispatch = useDispatch()
  // const loading = useSelector(state => state.loading);
  // console.log(loading);
  // const [loading, setLoading] = useState(true);
  // const [userHistory, setUserHistory] = useState(userHistoryCtx);
  const [renderHistory, setRenderHistory] = useState([]);
  const [productImage, setProductImage] = useState();
  const [adsArr, setAdsArr] = useState([img1, img2, img3, img4, toy1, toy2, toy3, toy4, toy5, toy6, toy7, toy8, toy9, toy10, toy11, toy12]);
  const [adOne, setAdOne] = useState();
  const [adTwo, setAdTwo] = useState();
  const [adThree, setAdThree] = useState();
  const [adFour, setAdFour] = useState();
  const [selectFrame, setSelectFrame] = useState();
  const [mugImage, setMugImage] = useState();
  const [postcardImage, setPostcardImage] = useState();
  const navigate = useNavigate();
  const displayWidth = window.innerWidth;
  // const [data, setData] = useState();
  let promptOne = userHistory.length > 4 && userHistory?.[4]?.prompt
  let promptTwo = userHistory.length > 8 && userHistory?.[8]?.prompt
  let promptThree = userHistory.length > 12 && userHistory?.[12]?.prompt
  let imgOne = userHistory.length > 4 && userHistory?.[4]?.url
  let imgTwo = userHistory.length > 5 && userHistory?.[5]?.url
  let imgThree = userHistory.length > 6 && userHistory?.[6]?.url
  let imgFour = userHistory.length > 7 && userHistory?.[7]?.url
  let imgFive = userHistory.length > 8 && userHistory?.[8]?.url
  let imgSix = userHistory.length > 9 && userHistory?.[9]?.url
  let imgSeven = userHistory.length > 10 && userHistory?.[10]?.url
  let imgEight = userHistory.length > 11 && userHistory?.[11]?.url
  let imgNine = userHistory.length > 12 && userHistory?.[12]?.url
  let imgTen = userHistory.length > 13 && userHistory?.[13]?.url
  let imgEleven = userHistory.length > 14 && userHistory?.[14]?.url
  let imgTwilve = userHistory.length > 15 && userHistory?.[15]?.url

  let showAdOne, showAdTwo, showAdThree, showAdFour;

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // useEffect(() => {
  //   setUserHistory(userHistoryCtx);
  //   console.log("userHistoryCtx", { userHistoryCtx, userHistory })
  // }, [userHistoryCtx]);

  useEffect(() => {
    const adOneIndex = randomIntFromInterval(0, 3);
    const adTwoIndex = randomIntFromInterval(4, 7);
    const adThreeIndex = randomIntFromInterval(8, 11);
    const adFourIndex = randomIntFromInterval(12, 15);
    // console.log("randomImg", { adOneIndex, adTwoIndex, adThreeIndex, adFourIndex })
    setAdOne(adsArr[adOneIndex]);
    setAdTwo(adsArr[adTwoIndex]);
    setAdThree(adsArr[adThreeIndex]);
    setAdFour(adsArr[adFourIndex]);
  }, []);

  // useEffect(() => {    
  //   // getDataFromApi();
  //   // getImageFromApi();
  //   console.log("searchValue", searchValue)
  //   const genImage = async () => {
  //     const currentTime = new Date(Date.now());
  //     const response = await axios.post("http://34.204.95.208:5000/api/v1/search/generateImage", { text: searchValue });
  //     console.log("imgResp", response);
  //     setData(response);
  //     setLoading(false);
  //     // setRenderHistory(response?.data?.result?.data);
  //     // console.log("renderHistoryOnEffect", renderHistory);
  //     setUserHistory(prevHistory => {
  //       const history = [...prevHistory];
  //       history.unshift({ url: response?.data?.result?.data[0]?.url, createdAt: currentTime, prompt: `Prompt used to display the image "${searchValue}"` },
  //         { url: response?.data?.result?.data[1]?.url, createdAt: currentTime, prompt: `Prompt used to display the image "${searchValue}"` },
  //         { url: response?.data?.result?.data[2]?.url, createdAt: currentTime, prompt: `Prompt used to display the image "${searchValue}"` },
  //         { url: response?.data?.result?.data[3]?.url, createdAt: currentTime, prompt: `Prompt used to display the image "${searchValue}"` });
  //       // if (history.length > 6) {
  //       //   history.splice(6);
  //       // }
  //       localStorage.setItem("userHistory", JSON.stringify(history));
  //       return history;
  //     })
  //     console.log("userHistoryEffect", userHistory);
  //   }
  //   if (searchValue) {
  //     genImage();
  //   }
  // }, []);

  useEffect(() => {
    // debugger;
    const currentTime = new Date(Date.now());
    if (userHistory?.length < 16) {
      setUserHistory([
        { url: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1524481905007-ea072534b820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1633466876697-1eb9c820028d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1610568781018-995405522539?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1531214159280-079b95d26139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1533518463841-d62e1fc91373?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1109&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1624628639856-100bf817fd35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1439436556258-1f7fab1bfd4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1479740030693-66ad10f3a7b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1613750651512-d65ce96dff55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1456082902841-3335005c3082?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
        { url: "https://images.unsplash.com/photo-1641314560038-efffa6e4404e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
      ]);
    }
  }, [userHistory]);

  useEffect(() => {
    printimage(data?.data?.data?.output[0]);
    selectedImage(data?.data?.data?.output[1]);
    setMugImage(data?.data?.data?.output[2]);
    setPostcardImage(data?.data?.data?.output[3]);
  }, [data]);

  const startLoader = (value) => {
    setLoading(value);
  }
  const generateImageOnResult = (data, value, searchString) => {
    // debugger;
    let storedSearchString = searchString;
    const currentTime = new Date(Date.now());
    // console.log("-------log", data?.data?.result?.data?.length);
    // console.log("data---1111-----------", data);
    setLoading(value);
    setData();
    // console.log("data------2222222--------", data);
    // setUserHistory(prevHistory => {
    //   const history = [...prevHistory];
    //   history.unshift({ url: renderHistory[0].url },
    //     { url: renderHistory[1].url },
    //     { url: renderHistory[2].url },
    //     { url: renderHistory[3].url });
    //   localStorage.setItem("userHistory", JSON.stringify(history));
    //   return history;
    // })
    // console.log("history", userHistory);
    setTimeout(() => {
      if (data?.data?.data?.output?.length > 0) {
        setLoading(false);
        setData(data);
        // console.log("data--------------", data);
        // setRenderHistory(data?.data?.result?.data);
        // console.log("renderHistory", renderHistory);
        // setLoading(value);       
        setUserHistory(prevHistory => {
          const history = [...prevHistory];
          history.unshift({ url: data?.data?.data?.output[0], createdAt: currentTime, prompt: `Prompt used to display the image "${storedSearchString}"` },
            { url: data?.data?.data?.output[1], createdAt: currentTime, prompt: `Prompt used to display the image "${storedSearchString}"` },
            { url: data?.data?.data?.output[2], createdAt: currentTime, prompt: `Prompt used to display the image "${storedSearchString}"` },
            { url: data?.data?.data?.output[3], createdAt: currentTime, prompt: `Prompt used to display the image "${storedSearchString}"` });
          // if (history.length > 6) {
          //   history.splice(6);
          // }
          localStorage.setItem("userHistory", JSON.stringify(history));
          return history;
        })
        // localStorage.setItem("userHistory", userHistory);
        // console.log("userHistory", userHistory);
      }
    }, 1000

    )

    // else {
    //   setLoading(value);
    // }
    // setData(data);
    // console.log("data--------------", data);
    // setLoading(false);

  }

  // console.log(img);

  // if (loading) {
  //   return <Loading />;
  // }

  const changeimg = () => {
    // console.log("---changeimg----------");
  }

  // const handleClick = (dt)=>{
  //   let url = dt;
  //   saveAs(url, "image.jpg");
  //  }

  const shareOnFacebook = async (url) => {
    // debugger;
    const id = uuidv4();
    const data = await AxiosInstance.post("/api/facebookShare", { id, url });
    console.log("facebookShare", data);
    if (data) {
      const sharerUrl = "https://www.facebook.com/sharer/sharer.php?u=";
      const postUrl = data?.data?.url;
      const navUrl = `${sharerUrl}${postUrl}`;
      console.log("navUrl", navUrl);
      window.open(navUrl, "_blank");
    }
  }
  // const wallOfFameHandler = async (url) => {
  //   console.log("args[args", { url, searchValue });
  //   const currentTime = new Date(Date.now());
  //   const id = uuidv4();
  //   const filePath = `http://localhost:5000/public/wallOfFame/${id}.png`;
  //   const storeImg = await axios.post('http://localhost:5000/api/wallOfFame', { id, url });
  //   console.log("storeImg", storeImg);
  //   if(storeImg.status == 201){
  //     setFavImg(prevImg => {
  //       const storedImgs = [...prevImg];
  //       storedImgs.unshift({ promptText: `Prompt used to display the image "${searchValue}"`, id, filePath, createdAt: currentTime });
  //       localStorage.setItem("wallOfFame", JSON.stringify(storedImgs));
  //       return storedImgs;
  //     });
  //   }
  // }

  const getimgBase64 = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      var reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  const wallOfFameHandler = async (url) => {
    // console.log("args[args", { url, searchValue });
    const id = uuidv4();
    const storeImg = await AxiosInstance.post('/api/convertUrlToBase64', { id, url, promptText: `Prompt used to display the image "${searchValue}"` });
    // getimgBase64(url, (dataUrl) => {
    //   console.log('RESULT:', dataUrl);
    // });
    console.log("storeImg", storeImg);
  }

  const downloadImage = async (url) => {
    const id = uuidv4();
    const data = await AxiosInstance.post("/api/downloadImage", { id, url });
    console.log("downloadImage", data);
  }

  const popup = data?.data?.data?.output?.map((data, index) => {
    return (
      <>
        <div className="list-view2" key={index} onClick={changeimg()} renderArrowPrev>
          <img src={data} width="600px" height="600px" />

        </div>
        <div>
          <a href={data} download target="_blank" className="download">
            <p>Download Image
              <span><i className="fa fa-download" /></span>
            </p>
          </a>
          <button onClick={() => wallOfFameHandler(data)} class="form-submit-button submit-button jf-form-buttons jsTest-submitField">
            Add to Wall of Fame
          </button>

          {/* <Link to="/walloffame" > wall of fame </Link> */}

          {/* <a onClick={() => wallOfFameHandler(data)} className="download">
            <p>Add to Wall of Fame <span> * </span> </p>
          </a> */}
          <button onClick={() => shareOnFacebook(data)} class="form-submit-button submit-button jf-form-buttons jsTest-submitField" >
            <p>Share Image
              {/* <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
              </span> */}
            </p>
          </button>
        </div>

        {/* <a href="https://www.printful.com/a/6825984:219f20034032bcd2fcab9c182f0591af" target="_blank">
          Printful
        </a> */}

        {/* <Carousel.Item>
            <img
                className="d-block w-100"
                src={data}
                alt="First slide"
                width="400px" height="400px"
              />
            <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item> */}

      </>
    )
  })

  const printimage = (image) => {
    // alert("test");
    // console.log("---imgage----------", image);
    setProductImage(image);
  }

  const selectedImage = (img) => {
    setSelectFrame(img);
  }

  const tshirt = data?.data?.data?.output?.map((data, index) => {
    return (
      <>
        <div className="list-view2 tshirt" key={index} onClick={(e) => printimage(data)} >
          <img src={data} width="600px" height="600px" />
          {/* onClick={(e) => setProductImage(data?.images)} */}
        </div>
      </>
    )
  });

  const frame = data?.data?.data?.output?.map((data, index) => {
    return (
      <>
        <div className="list-view2 tshirt" key={index} onClick={(e) => selectedImage(data)} >
          <img src={data} width="600px" height="600px" />
          {/* onClick={(e) => setProductImage(data?.images)} */}
        </div>
      </>
    )
  });

  const selectedMugImage = data?.data?.data?.output?.map((data, index) => {
    return (
      <>
        <div className="list-view2 tshirt" key={index} onClick={(e) => setMugImage(data)} >
          <img src={data} width="600px" height="600px" />
          {/* onClick={(e) => setProductImage(data?.images)} */}
        </div>
      </>
    )
  });

  const selectedPostcardImage = data?.data?.data?.output?.map((data, index) => {
    return (
      <>
        <div className="list-view2 tshirt" key={index} onClick={(e) => setPostcardImage(data)} >
          <img src={data} width="600px" height="600px" />
          {/* onClick={(e) => setProductImage(data?.images)} */}
        </div>
      </>
    )
  });

  // const download = (dt) => {
  //   alert(dt);
  //   var element = document.createElement("a");
  //   var file = new Blob(
  //     [
  //       dt
  //     ],
  //     { type: "image/*" }
  //   );
  //   element.href = URL.createObjectURL(file);
  //   element.download = "image.jpg";
  //   element.click();
  // };

  // console.log("displayWidth", displayWidth);

  useEffect(() => {
    showAdOne = <input type="hidden" name="IL_IN_ARTICLE" />;
    showAdTwo = <input type="hidden" name="IL_IN_ARTICLE" />;
    showAdThree = <input type="hidden" name="IL_IN_ARTICLE" />;
    showAdFour = <input type="hidden" name="IL_IN_ARTICLE" />;
  }, []);

  return (
    <div>
      <NavbarResult
        // historySentence={searchValue} 
        generateImageOnResult={generateImageOnResult} startLoader={startLoader} />



      <div className="adds">
        <div class="container">
          <h3 className="">Check Out Our Sponsors</h3>
          {/* <input type="hidden" name="IL_IN_TAG" value="2"/> */}

          <ul className="list-group">

            <li className="list-view ani-left">
              {/* <img src={adOne} /> */}
              <input type="hidden" name="IL_IN_ARTICLE" />
              {/* {showAdOne} */}
            </li>
            <li className="list-view ani-left">
              {/* <img src={adTwo} /> */}
              <input type="hidden" name="IL_IN_ARTICLE" />
              {/* {showAdTwo} */}
            </li>
            <li className="list-view ani-right">
              {/* <img src={adThree} /> */}
              <input type="hidden" name="IL_IN_ARTICLE" />
              {/* {showAdThree} */}
            </li>
            <li className="list-view ani-right">
              {/* <img src={adFour} /> */}
              <input type="hidden" name="IL_IN_ARTICLE" />
              {/* {showAdFour} */}
            </li>
          </ul>
        </div>
      </div>
      <div className="result-section">
        <div class="container">
          <h2 className="result-head">Your Result</h2>
          <p> Good going kid, you just created original Art!</p>


          {loading ? < LoadingSpinner /> :

            <div className="">
              {
                displayWidth < 767 ? (
                  <p>Press and hold to download the photos</p>
                ) : null
              }
              <ul className="list-group">
                <>

                  {
                    data?.data?.data?.output?.map((data, index) => {
                      console.log("renderdata", data)
                      return (
                        <>
                          {/* <li className="list-view">
                  <img src={data.url} width="200px" height="200px"/>
                </li> */}


                          <Popup
                            // trigger={<button className="button"> Open Modal </button>}
                            trigger={
                              <li className="list-view ani-left main-slider" key={index}>

                                {/* <button onClick={() => wallOfFameHandler(data.url)}>
                                  <span>*</span>
                                </button> */}

                                {/* <Watermark
                                  content="created by makerdog.ai"
                                  rotate={20}
                                  gapX={5}
                                  width={100}
                                  gapY={80}
                                  height={5}
                                  fontSize={12}
                                  fontColor="rgb(255 0 0 / 25%)"
                                  style={{ background: '#fff' }}
                                > */}

                                {
                                  displayWidth > 767 ? (
                                    <><a href={data} download target="_blank" className="download">
                                      <i className="fa fa-download" />
                                    </a><br /></>
                                  ) : null
                                }
                                < button onClick={() => shareOnFacebook(data)} className="download">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                  </svg>
                                </button>
                                <img src={data} width="200px" height="200px" />
                                {/* </Watermark> */}
                              </li>
                            }
                            modal
                            nested
                          >
                            {close => (
                              <div className="modal1">
                                <div className="cls">
                                  <button className="close" onClick={close}>
                                    &times;
                                  </button>
                                </div>
                                <Carousel selectedItem={index} >
                                  {popup}
                                </Carousel>
                              </div>
                            )}
                          </Popup>

                        </>
                      )
                    })
                  }
                </>
              </ul>

              <div className="tshirt-modify">

                <div className="main-tshirt">
                  <div onClick={() => {
                    navigate("/order", {
                      state: {
                        imgUrl: productImage,
                        orderUrl: WhiteTshirt,
                        orderType: "t-shirt",
                        backPath: "/results"
                      }
                    })
                  }}>
                    <div className="name">Create custom T-Shirt with MakerDog</div>

                    <img src={WhiteTshirt} alt="test" className="h-10 w-10 maint" />
                  </div>
                  <div className="img"
                    onClick={() => {
                      navigate("/order", {
                        state: {
                          imgUrl: productImage,
                          orderUrl: WhiteTshirt,
                          orderType: "t-shirt",
                          backPath: "/results"
                        }
                      })
                    }}>
                    <img src={productImage} alt="Select your image" className="h-10 w-10" />
                  </div>

                  {loading ? < LoadingSpinner /> :
                    <>
                      <div className="t-st">
                        {tshirt}
                      </div>
                    </>
                  }
                </div>

                <div className="main-tshirt frame">
                  <div
                    onClick={() => {
                      navigate("/order", {
                        state: {
                          imgUrl: selectFrame,
                          orderUrl: photoFrame,
                          orderType: "frame",
                          backPath: "/results"
                        }
                      })
                    }}>
                    <div className="name">Create custom Framed Poster with MakerDog</div>

                    <img src={photoFrame} alt="test" className="h-10 w-10 maint framephoto" />
                  </div>
                  {/* <button onClick={() => {
                    navigate("/order", {
                      state: {
                        imgUrl: productImage
                      }
                    })
                  }} >Create custom Photo frame with MakerDog
                  </button> */}
                  <div className="img"
                    onClick={() => {
                      navigate("/order", {
                        state: {
                          imgUrl: selectFrame,
                          orderUrl: photoFrame,
                          orderType: "frame",
                          backPath: "/results"
                        }
                      })
                    }}>
                    <img src={selectFrame} alt="Select your image" className="h-10 w-10" />
                  </div>

                  {loading ? < LoadingSpinner /> :
                    <>
                      <div className="t-st">
                        {frame}
                      </div>
                    </>
                  }
                </div>

              </div><br /><br /> <br /> <br />
              <div className="tshirt-modify">

                <div className="main-tshirt">
                  <div onClick={() => {
                    navigate("/order", {
                      state: {
                        imgUrl: mugImage,
                        orderUrl: mug,
                        orderType: "mug",
                        backPath: "/results"
                      }
                    })
                  }}>
                    <div className="name">Create custom Mug with MakerDog</div>

                    <img src={mug} alt="test" className="h-10 w-10 maint" />
                  </div>
                  <div
                    onClick={() => {
                      navigate("/order", {
                        state: {
                          imgUrl: mugImage,
                          orderUrl: mug,
                          orderType: "mug",
                          backPath: "/results"
                        }
                      })
                    }}>
                    <img src={mugImage} alt="Select your image" style={{
                      width: "95px",
                      height: "auto",
                      position: "absolute",
                      top: "57%",
                      transform: "translate(-50%, -50%)",
                      left: "57%",
                      width: "120px",
                      height: "120px"
                    }} />
                  </div>

                  {loading ? < LoadingSpinner /> :
                    <>
                      <div className="t-st">
                        {selectedMugImage}
                      </div>
                    </>
                  }
                </div>

                <div className="main-tshirt frame">
                  <div onClick={() => {
                    navigate("/order", {
                      state: {
                        imgUrl: postcardImage,
                        orderUrl: postcard,
                        orderType: "postcard",
                        backPath: "/results"
                      }
                    })
                  }}>
                    <div className="name">Create custom Postcard with MakerDog</div>

                    <img src={postcard} alt="test" className="h-10 w-10 maint" />
                  </div>
                  <div
                    onClick={() => {
                      navigate("/order", {
                        state: {
                          imgUrl: postcardImage,
                          orderUrl: postcard,
                          orderType: "postcard",
                          backPath: "/results"
                        }
                      })
                    }}>
                    <img src={postcardImage} alt="Select your image" style={{
                      width: "95px",
                      height: "auto",
                      position: "absolute",
                      top: "57%",
                      transform: "translate(-50%, -50%)",
                      left: "25%",
                      width: "120px",
                      height: "120px"
                    }} />
                  </div>

                  {loading ? < LoadingSpinner /> :
                    <>
                      <div className="t-st">
                        {selectedPostcardImage}
                      </div>
                    </>
                  }
                </div>

                {/* {loading ? < LoadingSpinner /> :
                  <>
                  <div className="t-st">
                    {tshirt}
                  </div>
                  </>
                } */}




              </div>
            </div>
          }



        </div>

        {/* <div className="name"><a href="/order">Create custom T-Shirt with MakerDog</a></div> */}

      </div>




      <div className="recent-section">
        <div className="first-fish">

        </div>
        <div className="fisherbg">
          <div class="container recent1">
            <h2 className="result-head pb-2">Recent Art Work</h2>
            {/* <h5>{promptOne}</h5> */}
            <ul className="list-group">
              {
                imgOne && <li className="list-view-recent " >
                  <p id="imgOne" data-tooltip-content={promptOne}>
                    <Tooltip anchorId="imgOne" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgOne,
                        }
                      });
                    }} ><img src={imgOne} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgTwo && <li className="list-view-recent">
                  <p id="imgTwo" data-tooltip-content={promptOne}>
                    <Tooltip anchorId="imgTwo" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgTwo,
                        }
                      });
                    }} ><img src={imgTwo} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgThree && <li className="list-view-recent">
                  <p id="imgThree" data-tooltip-content={promptOne}>
                    <Tooltip anchorId="imgThree" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgThree,
                        }
                      });
                    }} ><img src={imgThree} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgFour && <li className="list-view-recent ">
                  <p id="imgFour" data-tooltip-content={promptOne}>
                    <Tooltip anchorId="imgFour" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgFour,
                        }
                      });
                    }} ><img src={imgFour} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
            </ul>
            {/* <h5>{promptTwo}</h5> */}
            <ul className="list-group">
              {
                imgFive && <li className="list-view-recent ">
                  <p id="imgFive" data-tooltip-content={promptTwo}>
                    <Tooltip anchorId="imgFive" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgFive,
                        }
                      });
                    }} ><img src={imgFive} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgSix && <li className="list-view-recent ">
                  <p id="imgSix" data-tooltip-content={promptTwo}>
                    <Tooltip anchorId="imgSix" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgSix,
                        }
                      });
                    }} ><img src={imgSix} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgSeven && <li className="list-view-recent ">
                  <p id="imgSeven" data-tooltip-content={promptTwo}>
                    <Tooltip anchorId="imgSeven" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgSeven,
                        }
                      });
                    }} ><img src={imgSeven} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgEight && <li className="list-view-recent ">
                  <p id="imgEight" data-tooltip-content={promptTwo}>
                    <Tooltip anchorId="imgEight" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgEight,
                        }
                      });
                    }} ><img src={imgEight} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
            </ul>
            {/* <h5>{promptThree}</h5> */}
            <ul className="list-group">
              {
                imgNine && <li className="list-view-recent ">
                  <p id="imgNine" data-tooltip-content={promptThree}>
                    <Tooltip anchorId="imgNine" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgNine,
                        }
                      });
                    }} ><img src={imgNine} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgTen && <li className="list-view-recent ">
                  <p id="imgTen" data-tooltip-content={promptThree}>
                    <Tooltip anchorId="imgTen" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgTen,
                        }
                      });
                    }} ><img src={imgTen} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgEleven && <li className="list-view-recent ">
                  <p id="imgEleven" data-tooltip-content={promptThree}>
                    <Tooltip anchorId="imgEleven" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgEleven,
                        }
                      });
                    }} ><img src={imgEleven} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
              {
                imgTwilve && <li className="list-view-recent ">
                  <p id="imgTwilve" data-tooltip-content={promptThree}>
                    <Tooltip anchorId="imgTwilve" />
                    <a onClick={() => {
                      navigate("/recent-art", {
                        state: {
                          imgUrl: imgTwilve,
                        }
                      });
                    }} ><img src={imgTwilve} width="300px" height="300px" /></a>
                  </p>
                </li>
              }
            </ul>
            {/* <div class="load-more">
              <a href="/">
                <Button class="btn-login">Start over</Button>
              </a>
            </div> */}

            <div class="load-more">
              <a href="/">
                <img src={rainbow} alt="" width="100%" />
              </a>
            </div>
          </div>
        </div>


      </div>
      {/* <div className="explore-section">
        <div class="container">
          <h2 className="pb-2">Explore Images Created By Friends</h2>
          <div className="slider">
            <Carousel2>
              <img src={crousal1} alt='imagem' title='imagem' />
              <img src={crousal2} alt='imagem' title='imagem' />
              <img src={crousal3} alt='imagem' title='imagem' />
              <img src={crousal4} alt='imagem' title='imagem' />
              <img src={crousal5} alt='imagem' title='imagem' />
              <img src={crousal6} alt='imagem' title='imagem' />
              <img src={crousal7} alt='imagem' title='imagem' />
            </Carousel2>
          </div>
        </div>
      </div> */}
      <div className="blog-section">
        <div class="container">
          <div className="logo">
            <img src={logo3} alt="" width="215px" />
          </div>
          <p>Want to know more about MakerDog?</p>
          {/* <form action="">
            <div className="email-post">
              <input
                type="email"
                className="form-control rounded-5"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Enter Your Email"
              />
              <a href="" class="submit-icon"><img src={submit} /></a>
            </div>
          </form> */}
          <div class="surprise-me foot-sur">
            <a href="/about-us">
              <Button class="btn-login">About Us</Button>
            </a>
          </div>
          <div class="surprise-me foot-sur" id="makerDogEmail" data-tooltip-content="makerdogkabe@gmail.com">

            <Tooltip anchorId="makerDogEmail" />
            <Button class="btn-login">Contact Us</Button>
            {/* <p id="makerDogEmail" data-tooltip-content="makerdogkabe@gmail.com">
                <Tooltip anchorId="makerDogEmail" />
                <a href="">MakerDogKabe@gmail.com</a>
              </p> */}
            <Button onClick={() => {
              navigate("/walloffame")
            }} class="btn-login">Wall of Fame</Button>
            {/* <Button title={{"Contact Us \n MakerDogKabe@gmail.com"}} class="btn-login" ></Button> */}
          </div>
          {/* <p><a href="">MakerDogKabe@gmail.com</a></p> */}
        </div>
      </div>
      {/* {<Footer />} */}

    </div>
  );
};

export default Results;
