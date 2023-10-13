import React from "react";
import { useEffect, useState } from "react";
import { useConsumeContext } from "../context/ContextFile";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/Loding-spancer";
import Infos from "../components/Infos";
import Input from "../components/Input";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Images from "../components/Images";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavbarResult from "../components/NavbarResult";
import { Button } from "@mui/material";
import NavbarOrder from './NavbarOrder'
import LazyLoad from 'react-lazy-load';

import Popup from 'reactjs-popup';
// import Carousel from 'react-bootstrap/Carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// import ResultCrousal from '../components/ResultCrousal';
import Carousel2 from 'carousel-react-rcdev';

import rainbow from "../assets/images/rainbow.png";
import WhiteTshirt from "../assets/images/white-tshirt.png";
import photoFrame from "../assets/images/photoFrame.png";
import logo3 from "../assets/images/SearchLogo2.png";
import { useLocation } from "react-router-dom"
import { Email } from "@mui/icons-material";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { createOrder } from "redux/actions/checkoutSessionActions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import whiteFrame from "../assets/images/whiteFrame.png";
import poster from "../assets/images/poster.png";
import { addToCartAction } from "redux/actions/cartActions";
import { v4 as uuidv4 } from 'uuid';

const PlaceOrder = () => {

   const [selected, setSelected] = React.useState("Mens");
   const [selectedPersonSize, setSelectedPersonSize] = useState("MM");

   /** Function that will set different values to state variable
    * based on which dropdown is selected
    */
   const changeSelectOptionHandler = (targetValue) => {
      // console.log("changeSelectOptionHandler", targetValue);
      setSelected(targetValue);
   };

   /** Different arrays for different dropdowns */

   const male = [["MS", "S"], ["MM", "M"], ["ML", "L"], ["MXL", "XL"]];
   const womens = [["WS", "S"], ["WM", "M"], ["WL", "L"], ["WXL", "XL"]];
   const toddler = [["twoT", "2T"], ["threeT", "3T"], ["fourT", "4T"], ["fiveT", "5T"]];
   const youth = [["YS", "S"], ["YM", "M"], ["YL", "L"], ["YXL", "XL"]];

   /** Type variable to store different array for different dropdown */
   let type = null;

   /** This will be used to create set of options that user will see */
   let options = null;

   /** Setting Type variable according to dropdown */
   if (selected == "Mens") {
      type = male;
      // console.log("seelknk", male[0][0])
      // setSelectedPersonSize(male[0][0]);
   } else if (selected == "Womens") {
      type = womens;
      // setSelectedPersonSize(womens[0][0]);
   } else if (selected == "Toddler") {
      type = toddler;
      // setSelectedPersonSize(toddler[0][0]);
   } else if (selected == "Youth") {
      type = youth;
      // setSelectedPersonSize(youth[0][0]);
   }

   /** If "Type" is null or undefined then options will be null,
    * otherwise it will create a options iterable based on our array
    */
   if (type) {
      options = type.map((el, i) => {
         return <option value={el[0]} key={i}>{el[1]}</option>
      });
   }

   const stripe = useStripe();
   const location = useLocation();
   const orderimg = location.state.imgUrl;
   const orderUrl = location.state.orderUrl;
   const orderType = location.state.orderType;
   const backPath = location.state.backPath;

   const {
      // data,
      // setData,

      getImageFromApi,
      getDataFromApi,
      searchValue,
      img, setImg,
      // userHistoryCtx
   } = useConsumeContext();
   const dispatch = useDispatch()
   const checkoutSessionData = useSelector(data => data?.checkoutSession);
   // const loading = useSelector(state => state.loading);
   // console.log(loading);
   const [loading, setLoading] = useState(true);
   // const [userHistory, setUserHistory] = useState(userHistoryCtx);
   const [renderHistory, setRenderHistory] = useState([]);
   const [productImage, setProductImage] = useState();
   //   const [adsArr, setAdsArr] = useState([img1, img2, img3, img4, toy1, toy2, toy3, toy4, toy5, toy6, toy7, toy8]);
   const [adOne, setAdOne] = useState();
   const [adTwo, setAdTwo] = useState();
   const [adThree, setAdThree] = useState();
   const [adFour, setAdFour] = useState();
   const [qty, setQty] = useState("1");
   let defaultTtlPrc = orderType == "t-shirt" ? "14.95" : orderType == "mug" ? "12.75" : orderType == "postcard" ? "6.50" : "32.95"
   const [ttlPrc, setTtlPrc] = useState(defaultTtlPrc);
   const prdPriceObj = {
      twoT: 17.50,
      threeT: 17.50,
      fourT: 17.50,
      fiveT: 17.50,

      YS: 18.95,
      YM: 18.95,
      YL: 18.95,
      YXL: 18.95,

      MS: 14.95,
      MM: 14.95,
      ML: 14.95,
      MXL: 14.95,

      WS: 22.45,
      WM: 22.45,
      WL: 22.45,
      WXL: 22.45,
   }
   const posterPriceObj = {
      "12F": 32.95,
      "14F": 37.50,
      "16F": 41.25,
      "18F": 46.50,

      "12P": 14,
      "14P": 15,
      "16P": 16.75,
      "18P": 17.50
   }
   const mugPrices = {
      "11-oz": 12.75,
      "15-oz": 14.95
   }
   const postcardPrices = {
      "4x6": 6.50
   }
   const [prdPrice, setPrdPrice] = useState(defaultTtlPrc)
   const [prdSize, setPrdSize] = useState("YM");
   const [frmSize, setFrmSize] = useState("12");
   const [mugSize, setMugSize] = useState("11-oz");
   const [postcardSize, setPostcardSize] = useState("4x6");
   // const [fName, setFName] = useState("");
   // const [lName, setLName] = useState("");
   // const [eMail, setEMail] = useState("");
   const [contactNo, setContactNo] = useState("");
   const [addLineOne, setAddLineOne] = useState("");
   const [addLineTwo, setAddLineTwo] = useState("");
   const [addCity, setAddCity] = useState("");
   const [addState, setAddState] = useState("");
   const [zipCode, setZipCode] = useState("");
   const [frameType, setFrameType] = useState("framed");
   const [frameColor, setFrameColor] = useState("black");
   const displayWidth = window.innerWidth;
   const [submitBtnState, setSubmitBtnState] = useState("");
   const cartState = useSelector(state => state.addedToCart);

   // console.log("userHistoryCtx", { userHistoryCtx, userHistory })

   const [data, setData] = useState();
   // let imgOne = userHistory.length > 4 ? userHistory?.[4]?.url : userHistoryCtx?.[4]?.url;
   // let imgTwo = userHistory.length > 5 ? userHistory?.[5]?.url : userHistoryCtx?.[5]?.url;
   // let imgThree = userHistory.length > 6 ? userHistory?.[6]?.url : userHistoryCtx?.[6]?.url;
   // let imgFour = userHistory.length > 7 ? userHistory?.[7]?.url : userHistoryCtx?.[7]?.url;
   // let imgFive = userHistory.length > 8 ? userHistory?.[8]?.url : userHistoryCtx?.[8]?.url;
   // let imgSix = userHistory.length > 9 ? userHistory?.[9]?.url : userHistoryCtx?.[9]?.url;
   // let imgSeven = userHistory.length > 10 ? userHistory?.[10]?.url : userHistoryCtx?.[10]?.url;
   // let imgEight = userHistory.length > 11 ? userHistory?.[11]?.url : userHistoryCtx?.[11]?.url;
   // let imgNine = userHistory.length > 12 ? userHistory?.[12]?.url : userHistoryCtx?.[12]?.url;
   // let imgTen = userHistory.length > 13 ? userHistory?.[13]?.url : userHistoryCtx?.[13]?.url;
   // let imgEleven = userHistory.length > 14 ? userHistory?.[14]?.url : userHistoryCtx?.[14]?.url;
   // let imgTwilve = userHistory.length > 15 ? userHistory?.[15]?.url : userHistoryCtx?.[15]?.url;
   // console.log("imgUrl", location);

   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
   const usZipRegExp = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/

   const checkoutSchema = yup.object().shape({
      fName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      lName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      eMail: yup.string().email("invalid email").required("Required"),
      contactNo: yup.string().min(6, 'Please enter valid number').max(15, 'Please enter valid number').matches(phoneRegExp, 'Phone number is not valid').required("Required"),
      addLineOne: yup.string().min(10, "Minimum 10 characters").max(50, "Max 50 characters").required("Required"),
      addLineTwo: yup.string().min(10, "Minimum 10 characters").max(50, "Max 50 characters"),
      addCity: yup.string().required("Required"),
      addState: yup.string().required("Required"),
      zipCode: yup.string().matches(usZipRegExp, "Zip Code is not valid").required("Required")
   });

   const initialValues = {
      fName: "",
      lName: "",
      eMail: "",
      contactNo: "",
      addLineOne: "",
      addLineTwo: "",
      addCity: "",
      addState: "",
      zipCode: ""
   };

   function randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
   }


   useEffect(() => {
      const adOneIndex = randomIntFromInterval(0, 11);
      const adTwoIndex = randomIntFromInterval(0, 11);
      const adThreeIndex = randomIntFromInterval(0, 11);
      const adFourIndex = randomIntFromInterval(0, 11);
      // console.log("randomImg", { adOneIndex, adTwoIndex, adThreeIndex, adFourIndex })
      // setAdOne(adsArr[adOneIndex]);
      // setAdTwo(adsArr[adTwoIndex]);
      // setAdThree(adsArr[adThreeIndex]);
      // setAdFour(adsArr[adFourIndex]);
   }, []);

   // useEffect(() => {
   //    getDataFromApi();
   //    getImageFromApi();
   //    console.log("searchValue", searchValue)
   //    const genImage = async () => {
   //       const response = await axios.post("http://44.211.141.200:5000/api/v1/search/generateImage", { text: searchValue });
   //       console.log("imgResp", response);
   //       setData(response);
   //       setLoading(false);
   //       // setRenderHistory(response?.data?.result?.data);
   //       // console.log("renderHistoryOnEffect", renderHistory);
   //       setUserHistory(prevHistory => {
   //          const history = [...prevHistory];
   //          history.unshift({ url: response?.data?.result?.data[0]?.url },
   //             { url: response?.data?.result?.data[1]?.url },
   //             { url: response?.data?.result?.data[2]?.url },
   //             { url: response?.data?.result?.data[3]?.url });
   //          // if (history.length > 6) {
   //          //   history.splice(6);
   //          // }
   //          localStorage.setItem("userHistory", JSON.stringify(history));
   //          return history;
   //       })
   //       console.log("userHistoryEffect", userHistory);
   //    }
   //    // genImage();
   // }, []);

   const startLoader = (value) => {
      setLoading(value);
   }
   // const generateImageOnResult = (data, value) => {
   //    // debugger;
   //    console.log("-------log", data?.data?.result?.data?.length);
   //    console.log("data---1111-----------", data);
   //    setLoading(value);
   //    setData();
   //    console.log("data------2222222--------", data);
   //    // setUserHistory(prevHistory => {
   //    //   const history = [...prevHistory];
   //    //   history.unshift({ url: renderHistory[0].url },
   //    //     { url: renderHistory[1].url },
   //    //     { url: renderHistory[2].url },
   //    //     { url: renderHistory[3].url });
   //    //   localStorage.setItem("userHistory", JSON.stringify(history));
   //    //   return history;
   //    // })
   //    console.log("history", userHistory);
   //    setTimeout(() => {
   //       if (data?.data?.result?.data?.length > 0) {
   //          setLoading(false);
   //          setData(data);
   //          console.log("data--------------", data);
   //          // setRenderHistory(data?.data?.result?.data);
   //          // console.log("renderHistory", renderHistory);
   //          // setLoading(value);       
   //          setUserHistory(prevHistory => {
   //             const history = [...prevHistory];
   //             history.unshift({ url: data?.data?.result?.data[0].url },
   //                { url: data?.data?.result?.data[1].url },
   //                { url: data?.data?.result?.data[2].url },
   //                { url: data?.data?.result?.data[3].url });
   //             // if (history.length > 6) {
   //             //   history.splice(6);
   //             // }
   //             localStorage.setItem("userHistory", JSON.stringify(history));
   //             return history;
   //          })
   //          // localStorage.setItem("userHistory", userHistory);
   //          console.log("userHistory", userHistory);
   //       }
   //    }, 1000

   //    )
   // }


   const printimage = (image) => {
      // alert("test");
      // console.log("---imgage----------", image);
      setProductImage(image);
   }

   const tshirt = data?.data?.result?.data?.map((data, index) => {
      return (
         <>
            <div className="list-view2 tshirt" key={index} onClick={(e) => printimage(data.url)} >
               <img src={data.url} width="600px" height="600px" />
               {/* onClick={(e) => setProductImage(data?.images)} */}
            </div>
         </>
      )
   })

   const setSizesPrice = (selectedSizePrice) => {
      const qtyNumType = Number(qty);
      const totalPrice = ((qtyNumType * selectedSizePrice).toFixed(2)).toString();
      // console.log("product price according quantity", totalPrice);
      setTtlPrc(totalPrice);
   }

   const setQuantityPrice = (quantity) => {
      const qtyNumType = Number(quantity);
      const totalPrice = ((qtyNumType * prdPrice).toFixed(2)).toString();
      // console.log("product price according quantity", totalPrice);
      setTtlPrc(totalPrice);
   }

   const stripeCheckout = (values) => {
      // debugger;
      document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      let productName = orderType == "t-shirt" ? "t-shirt" : orderType == "frame" ? "frame" : orderType == "mug" ? "mug" : orderType == "postcard" ? "postcard" : null;
      // const checkoutSession = await axios.post(`http://34.204.95.208:5000/api/${checkoutType}`, { qty });      
      dispatch(createOrder({ productName, qty, price: Math.ceil(ttlPrc) }));
      // console.log("checkoutSession", checkoutSessionData);
      let sessionId = checkoutSessionData?.order?.session?.id;
      // console.log("sessionId", sessionId);
      if (sessionId) {
         stripe.redirectToCheckout({ sessionId });
      }
      document.cookie = `paymentSessionId=${checkoutSessionData?.order?.session?.id};`
      document.cookie = `quantity=${qty};`
      document.cookie = `price=${prdPrice};`
      document.cookie = `totalPrice=${ttlPrc};`
      document.cookie = `productName=${productName};`
      document.cookie = `name=${values.fName} ${values.lName}`
      document.cookie = `email=${values.eMail}`
      document.cookie = `contactNo=${values.contactNo}`
      document.cookie = `addLineOne=${values.addLineOne}`
      document.cookie = `addLineTwo=${values.addLineTwo}`
      document.cookie = `addCity=${values.addCity}`
      document.cookie = `addState=${values.addState}`
      document.cookie = `zipCode=${values.zipCode}`
   }


   const submitHandler = (values) => {
      debugger
      // e.preventDefault();
      // console.log("formData", {
      //    fName, lName, eMail, contactNo,
      //    addLineOne,
      //    addLineTwo,
      //    addCity,
      //    addState,
      //    zipCode,
      // });
      stripeCheckout(values);
      // setQty("1");
      // setTtlPrc("0");
      // setPrdSize("MM");
      // setFrmSize("12");
      // setFName("");
      // setLName("");
      // setEMail("");
      // setContactNo("");
      // setAddLineOne("");
      // setAddLineTwo("");
      // setAddCity("");
      // setAddState("");
      // setZipCode("");
   }

   const selectedFrameOption = frameColor == "black" ? (
      <div class="image_area form-product-image-with-options order-frame">
         <div>
            <img role="img" aria-label="T-Shirt" alt="T-Shirt Product Image" src={orderUrl} loading="lazy" />
         </div>
         <div className="orderimg">
            <img src={orderimg} alt="Select your image" className="h-100 w-100" />
         </div>
         <div class="image_zoom"></div>
      </div>
   ) : (
      <div class="image_area form-product-image-with-options order-frame">
         <div>
            <img role="img" aria-label="T-Shirt" alt="T-Shirt Product Image" src={whiteFrame} loading="lazy" />
         </div>
         <div className="orderimg">
            <img src={orderimg} alt="Select your image" className="h-100 w-100" />
         </div>
         <div class="image_zoom"></div>
      </div>
   )

   console.log("addedToCart", cartState);
   return (
      <div>
         {/* <NavbarResult historySentence={searchValue} generateImageOnResult={generateImageOnResult} startLoader={startLoader} /> */}

         <NavbarOrder navigateTo={"/results"} />
         <div role="main" class="form-all">
            <ul class="form-section page-section">
               {/* <form onSubmit={submitHandler} > */}
               <Formik
                  onSubmit={(values) => {
                     // console.log("values", values);
                     if (submitBtnState == "checkout") {
                        stripeCheckout(values);
                     }
                     if (submitBtnState == "add-to-cart") {
                        dispatch(addToCartAction({
                           totalPrice: ttlPrc, totalQuantity: qty, shippingDetails: values, item: {
                              id: uuidv4(),
                              orderType,
                              quantity: qty,
                              price: prdPrice,
                              subTotal: ttlPrc
                           }
                        }))
                     }
                  }}
                  initialValues={initialValues}
                  validationSchema={checkoutSchema}
               >
                  {({ errors, touched }) => (

                     < Form >
                        <li class="form-line card-3col" data-type="control_paypalcomplete" id="id_19" data-payment="true">
                           {/* <label class="form-label form-label-top" id="label_19" for="input_19"> Products </label> */}
                           <div id="cid_19" class="form-input-wide" data-layout="full">
                              <div data-wrapper-react="true">
                                 <div data-wrapper-react="true" class="product-container-wrapper">
                                    <div class="filter-container"></div>
                                    <input type="hidden" name="simple_fpc" data-payment_type="paypalcomplete" data-component="payment1" value="19" />
                                    <input type="hidden" name="payment_total_checksum" id="payment_total_checksum" data-component="payment2" />

                                    <div data-wrapper-react="true">
                                       <span class="form-product-item hover-product-item on_col1 show_image show_option full_img new_ui" categories="non-categorized" pid="1001" aria-labelledby="label_19">
                                          <div data-wrapper-react="true" class="form-product-item-detail new_ui">
                                             {/* <div class="p_col">
                              <div class="p_checkbox">
                                 <input type="checkbox" class="form-checkbox  form-product-input" id="input_19_1001" name="q19_products[][id]" value="1001" aria-label="Select Product: T-Shirt" />
                                 <div class="checked"></div>
                                 <div class="select_border"></div>
                              </div>
                           </div> */}
                                             <div class="p_image">
                                                {
                                                   orderType == "t-shirt" ?
                                                      (
                                                         <div class="image_area form-product-image-with-options order-tshirt">
                                                            <div>
                                                               <img role="img" aria-label="T-Shirt" alt="T-Shirt Product Image" src={orderUrl} loading="lazy" />
                                                            </div>
                                                            <div className="orderimg">
                                                               <img src={orderimg} alt="Select your image" className="h-10 w-10" />
                                                            </div>
                                                            <div class="image_zoom"></div>
                                                         </div>
                                                      ) :
                                                      orderType == "mug" ?
                                                         (
                                                            <div class="image_area form-product-image-with-options order-tshirt">
                                                               <div>
                                                                  <img role="img" aria-label="T-Shirt" alt="T-Shirt Product Image" src={orderUrl} loading="lazy" />
                                                               </div>
                                                               <div >
                                                                  <img src={orderimg} alt="Select your image" style={{
                                                                     width: "95px",
                                                                     height: "auto",
                                                                     position: "absolute",
                                                                     top: "50%",
                                                                     transform: "translate(-50%, -50%)",
                                                                     left: "57%",
                                                                     width: "200px",
                                                                     height: "200px"
                                                                  }} />
                                                               </div>
                                                               <div class="image_zoom"></div>
                                                            </div>
                                                         ) :
                                                         orderType == "postcard" ?
                                                            (
                                                               <div class="image_area form-product-image-with-options order-tshirt">
                                                                  <div>
                                                                     <img role="img" aria-label="T-Shirt" alt="T-Shirt Product Image" src={orderUrl} loading="lazy" />
                                                                  </div>
                                                                  <div >
                                                                     <img src={orderimg} alt="Select your image" style={{
                                                                        width: "95px",
                                                                        height: "auto",
                                                                        position: "absolute",
                                                                        top: "57%",
                                                                        transform: "translate(-50%, -50%)",
                                                                        left: "25%",
                                                                        width: "200px",
                                                                        height: "200px"
                                                                     }} />
                                                                  </div>
                                                                  <div class="image_zoom"></div>
                                                               </div>
                                                            ) :
                                                            frameType == "framed" ?
                                                               selectedFrameOption
                                                               :
                                                               (
                                                                  <div class="image_area form-product-image-with-options order-frame">
                                                                     <div>
                                                                        <img role="img" aria-label="T-Shirt" alt="T-Shirt Product Image" src={poster} loading="lazy" />
                                                                     </div>
                                                                     <div className="orderimg">
                                                                        <img src={orderimg} alt="Select your image" className="h-100 w-100" />
                                                                     </div>
                                                                     <div class="image_zoom"></div>
                                                                  </div>
                                                               )
                                                }
                                             </div>
                                             <div for="input_19_1001" class="form-product-container">
                                                {
                                                   orderType == "t-shirt" ? (
                                                      <span data-wrapper-react="true" className="tshirt-sec">
                                                         <div class="title_description">
                                                            <span class="form-product-name" id="product-name-input_19_1001">T-Shirt</span>
                                                            <span class="form-product-description" id="product-name-description-input_19_1001"></span>
                                                         </div>
                                                         {/* <span class="form-product-details">
                                             <b>
                                                <span data-wrapper-react="true">$<span id="input_19_1001_price">1.00</span></span>
                                             </b>
                                          </span> */}
                                                      </span>
                                                   ) :
                                                      orderType == "mug" ? (
                                                         <span data-wrapper-react="true" className="tshirt-sec">
                                                            <div class="title_description">
                                                               <span class="form-product-name" id="product-name-input_19_1001">Mug</span>
                                                               <span class="form-product-description" id="product-name-description-input_19_1001"></span>
                                                            </div>
                                                            {/* <span class="form-product-details">
                                             <b>
                                                <span data-wrapper-react="true">$<span id="input_19_1001_price">1.00</span></span>
                                             </b>
                                          </span> */}
                                                         </span>
                                                      ) :
                                                         orderType == "postcard" ? (
                                                            <span data-wrapper-react="true" className="tshirt-sec">
                                                               <div class="title_description">
                                                                  <span class="form-product-name" id="product-name-input_19_1001">Postcard</span>
                                                                  <span class="form-product-description" id="product-name-description-input_19_1001"></span>
                                                               </div>
                                                               {/* <span class="form-product-details">
                                             <b>
                                                <span data-wrapper-react="true">$<span id="input_19_1001_price">1.00</span></span>
                                             </b>
                                          </span> */}
                                                            </span>
                                                         ) :
                                                            (
                                                               <span data-wrapper-react="true" className="tshirt-sec">
                                                                  <div class="title_description">
                                                                     <span class="form-product-name" id="product-name-input_19_1001">Frame</span>
                                                                     <span class="form-product-description" id="product-name-description-input_19_1001"></span>
                                                                  </div>
                                                                  {/* <span class="form-product-details">
                                             <b>
                                                <span data-wrapper-react="true">$<span id="input_19_1001_price">1.00</span></span>
                                             </b>
                                          </span> */}
                                                               </span>
                                                            )
                                                }
                                                <div className="form-drop">
                                                   <span class="form-sub-label-container qty" >
                                                      <label class="form-sub-label" for="input_19_quantity_1001_0" aria-hidden="false">Quantity</label>
                                                      <span class="select_cont">
                                                         <select value={qty}
                                                            onChange={(e) => {
                                                               setQty(e.target.value);
                                                               // console.log("selectedQty", e.target.value);
                                                               setQuantityPrice(e.target.value);
                                                            }}
                                                            class="form-dropdown is-active" name="q19_products[special_1001][item_0]" id="input_19_quantity_1001_0">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                         </select>
                                                      </span>
                                                   </span>
                                                   <span class="form-sub-label-container size" >
                                                      {
                                                         orderType == "t-shirt" ? (
                                                            <label class="form-sub-label" for="input_19_custom_1001_2" aria-hidden="false">
                                                               T-Shirt Size</label>
                                                         ) :
                                                            orderType == "mug" ? (
                                                               <label class="form-sub-label" for="input_19_custom_1001_2" aria-hidden="false">
                                                                  Mug Model</label>
                                                            ) :
                                                               orderType == "postcard" ? (
                                                                  <label class="form-sub-label" for="input_19_custom_1001_2" aria-hidden="false">
                                                                     Postcard Size</label>
                                                               ) :
                                                                  (
                                                                     <label class="form-sub-label" for="input_19_custom_1001_2" aria-hidden="false">
                                                                        Frame Size</label>
                                                                  )}
                                                      <span class="select_cont">
                                                         {
                                                            orderType == "t-shirt" ? (
                                                               <div>
                                                                  <div>
                                                                     <select value={selected} onChange={(e) => {
                                                                        changeSelectOptionHandler(e.target.value);
                                                                        // console.log("selectedPersonSize", selectedPersonSize);
                                                                        setPrdPrice(0);
                                                                        setSizesPrice(0);
                                                                     }} style={{ marginBottom: "10px" }} class="form-dropdown is-active" >
                                                                        <option value="Toddler" >Toddler Sizes</option>
                                                                        <option value="Youth" >Youth Sizes</option>
                                                                        <option value="Mens" >Mens Sizes</option>
                                                                        <option value="Womens" >Womens Sizes</option>
                                                                     </select>
                                                                  </div>
                                                                  <div>
                                                                     <select
                                                                        value={selectedPersonSize} onChange={(e) => {
                                                                           setSelectedPersonSize(e.target.value);
                                                                           setPrdPrice(prdPriceObj[e.target.value]);
                                                                           setSizesPrice(prdPriceObj[e.target.value]);
                                                                        }} class="form-dropdown is-active"
                                                                     >
                                                                        {
                                                                           /** This is where we have used our options variable */
                                                                           options
                                                                        }
                                                                     </select>
                                                                  </div>
                                                               </div>
                                                            ) : orderType == "mug" ? (
                                                               <div>
                                                                  <div>
                                                                     <select
                                                                        value={mugSize} onChange={(e) => {
                                                                           setMugSize(e.target.value);
                                                                           setPrdPrice(mugPrices[e.target.value]);
                                                                           setSizesPrice(mugPrices[e.target.value]);
                                                                        }} class="form-dropdown is-active"
                                                                     >
                                                                        <option value="11-oz" >11oz</option>
                                                                        <option value="15-oz" >15oz</option>
                                                                     </select>
                                                                  </div>
                                                               </div>
                                                            ) : orderType == "postcard" ? (
                                                               <div>
                                                                  <div>
                                                                     <select
                                                                        value={postcardSize} onChange={(e) => {
                                                                           setPostcardSize(e.target.value);
                                                                           setPrdPrice(postcardPrices[e.target.value]);
                                                                           setSizesPrice(postcardPrices[e.target.value]);
                                                                        }} class="form-dropdown is-active"
                                                                     >
                                                                        <option value="4x6" >4"x6"</option>
                                                                     </select>
                                                                  </div>
                                                               </div>
                                                            ) :
                                                               frameType == "framed" ?
                                                                  (
                                                                     <>
                                                                        <select value={frameType} onChange={(e) => {
                                                                           setFrameType(e.target.value)
                                                                           setPrdPrice(0);
                                                                           setSizesPrice(0);
                                                                        }} class="form-dropdown is-active" >
                                                                           <option value="framed" > Framed </option>
                                                                           <option value="unframed" > Unframed </option>
                                                                        </select>
                                                                        <select
                                                                           value={frameColor} onChange={(e) => {
                                                                              setFrameColor(e.target.value)
                                                                              setPrdPrice(0);
                                                                              setSizesPrice(0);
                                                                           }} style={{ marginTop: "10px" }} class="form-dropdown is-active">
                                                                           <option value="black" > Black </option>
                                                                           <option value="white" > White </option>
                                                                        </select>
                                                                        <select value={frmSize} onChange={(e) => {
                                                                           setFrmSize(e.target.value);
                                                                           // console.log("framesize", e.target.value);
                                                                           setPrdPrice(posterPriceObj[e.target.value]);
                                                                           // console.log("prdPrice", prdPrice);
                                                                           setSizesPrice(posterPriceObj[e.target.value]);
                                                                        }} class="form-dropdown is-active" name="q19_products[special_1001][item_2]" id="input_19_custom_1001_2"
                                                                           style={{ marginTop: "10px" }}>
                                                                           <option value="12F">12"x12"</option>
                                                                           <option value="14F">14"x14"</option>
                                                                           <option value="16F">16"x16"</option>
                                                                           <option value="18F">18"x18"</option>
                                                                        </select>
                                                                     </>
                                                                  ) : (
                                                                     <>
                                                                        <select value={frameType} onChange={(e) => {
                                                                           setFrameType(e.target.value)
                                                                           setPrdPrice(0);
                                                                           setSizesPrice(0);
                                                                        }} class="form-dropdown is-active" >
                                                                           <option value="framed" > Framed </option>
                                                                           <option value="unframed" > Unframed </option>
                                                                        </select>
                                                                        <select value={frmSize} onChange={(e) => {
                                                                           setFrmSize(e.target.value);
                                                                           // console.log("framesize", e.target.value);
                                                                           setPrdPrice(posterPriceObj[e.target.value]);
                                                                           // console.log("prdPrice", prdPrice);
                                                                           setSizesPrice(posterPriceObj[e.target.value]);
                                                                        }} class="form-dropdown is-active" name="q19_products[special_1001][item_2]" id="input_19_custom_1001_2"
                                                                           style={{ marginTop: "10px" }}>
                                                                           <option value="12P">12"x12"</option>
                                                                           <option value="14P">14"x14"</option>
                                                                           <option value="16P">16"x16"</option>
                                                                           <option value="18P">18"x18"</option>
                                                                        </select>
                                                                     </>
                                                                  )
                                                         }
                                                      </span>
                                                   </span>
                                                </div>
                                                <div class="payment_footer new_ui ">
                                                   <div class="total_area">
                                                      <div class="form-payment-total">
                                                         <div id="total-text">Total</div>
                                                         <div class="form-payment-price"><span data-wrapper-react="true">$<span id="payment_total">{ttlPrc}</span></span></div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>


                                          </div>
                                       </span>



                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li class="form-line" data-type="control_fullname" id="id_2">
                           <label class="form-label form-label-top" id="label_2" for="first_2"> Full Name </label>
                           <div id="cid_2" class="form-input-wide" data-layout="full">
                              <div data-wrapper-react="true">
                                 <span class="form-sub-label-container" data-input-type="first">
                                    {/* <input type="text" id="first_2" name="q2_fullName2[first]" class="form-textbox" data-defaultvalue="" autocomplete="section-input_2 given-name" size="10" value={fName} onChange={(e) => setFName(e.target.value)} data-component="first" aria-labelledby="label_2 sublabel_2_first" /> */}
                                    <Field name="fName" class="form-textbox" />
                                    {/* {errors.fName && touched.fName ? (
                                       <div>{errors.fName}</div>
                                    ) : null} */}
                                    <ErrorMessage name="fName" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                    <label class="form-sub-label" for="first_2" id="sublabel_2_first" aria-hidden="false">First Name</label>
                                 </span>
                                 <span class="form-sub-label-container" data-input-type="last">
                                    {/* <input type="text" id="last_2" name="q2_fullName2[last]" class="form-textbox" data-defaultvalue="" autocomplete="section-input_2 family-name" size="15" value={lName} onChange={(e) => setLName(e.target.value)} data-component="last" aria-labelledby="label_2 sublabel_2_last" /> */}
                                    <Field name="lName" class="form-textbox" />
                                    {/* {errors.lName && touched.lName ? (
                                       <div>{errors.lName}</div>
                                    ) : null} */}
                                    <ErrorMessage name="lName" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                    <label class="form-sub-label" for="last_2" id="sublabel_2_last" aria-hidden="false">Last Name</label>
                                 </span>
                              </div>
                           </div>
                        </li>
                        <li class="form-line" data-type="control_email" id="id_3">
                           <label class="form-label form-label-top" id="label_3" for="input_3"> E-mail </label>
                           <div id="cid_3" class="form-input-wide" data-layout="half">
                              <span class="form-sub-label-container">
                                 {/* <input type="email" id="input_3" name="q3_email3" class="form-textbox validate[Email]" data-defaultvalue="" size="310" value={eMail} onChange={(e) => setEMail(e.target.value)} placeholder="ex: myname@example.com" data-component="email" aria-labelledby="label_3 sublabel_input_3" /> */}
                                 <Field name="eMail" class="form-textbox validate[Email]" />
                                 {/* {errors.eMail && touched.eMail ? (
                                    <div>{errors.eMail}</div>
                                 ) : null} */}
                                 <ErrorMessage name="eMail" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                 <label class="form-sub-label" for="input_3" id="sublabel_input_3" aria-hidden="false">example@example.com</label>
                              </span>
                           </div>
                        </li>
                        <li class="form-line" data-type="control_phone" id="id_5">
                           <label class="form-label form-label-top" id="label_5" for="input_5_full"> Contact Number </label>
                           <div id="cid_5" class="form-input-wide" data-layout="half">
                              <span class="form-sub-label-container" >
                                 {/* <input type="tel" id="input_5_full" name="q5_contactNumber[full]" data-type="mask-number" class="mask-phone-number form-textbox validate[Fill Mask]" data-defaultvalue="" autocomplete="section-input_5 tel-national" data-masked="true" value={contactNo} onChange={(e) => setContactNo(e.target.value)} placeholder="(000) 000-0000" data-component="phone" aria-labelledby="label_5" inputmode="text" maskvalue="(###) ###-####" /> */}
                                 <Field name="contactNo" class="mask-phone-number form-textbox validate[Fill Mask]" />
                                 {/* {errors.contactNo && touched.contactNo ? (
                                    <div>{errors.contactNo}</div>
                                 ) : null} */}
                                 <ErrorMessage name="contactNo" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                 <label class="form-sub-label is-empty" for="input_5_full" id="sublabel_5_masked" aria-hidden="false"></label>
                              </span>
                           </div>
                        </li>
                        {/* <li class="form-line" data-type="control_address" id="id_4"><label class="form-label form-label-top" id="label_4" for="input_4_addr_line1"> Billing Address </label>
                     {addressDetails}
                  </li> */}
                        <li class="form-line" data-type="control_address" id="id_4"><label class="form-label form-label-top" id="label_4" for="input_4_addr_line1"> Shipping Address </label>
                           <div id="cid_4" class="form-input-wide" data-layout="full">
                              <div summary="" class="form-address-table jsTest-addressField">
                                 <div class="form-address-line-wrapper jsTest-address-line-wrapperField">
                                    <span class="form-address-line form-address-street-line jsTest-address-lineField">
                                       <span class="form-sub-label-container" >
                                          {/* <input type="text" id="input_4_addr_line1" name="q4_billingAddress[addr_line1]" class="form-textbox form-address-line" data-defaultvalue="" autocomplete="section-input_4 address-line1" value={addLineOne} onChange={(e) => setAddLineOne(e.target.value)} data-component="address_line_1" aria-labelledby="label_4 sublabel_4_addr_line1" required="" /> */}
                                          <Field name="addLineOne" class="form-textbox form-address-line" />
                                          {/* {errors.addLineOne && touched.addLineOne ? (
                                             <div>{errors.addLineOne}</div>
                                          ) : null} */}
                                          <ErrorMessage name="addLineOne" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                          <label class="form-sub-label" for="input_4_addr_line1" id="sublabel_4_addr_line1" aria-hidden="false">Street Address</label>
                                       </span>
                                    </span>
                                 </div>
                                 <div class="form-address-line-wrapper jsTest-address-line-wrapperField">
                                    <span class="form-address-line form-address-street-line jsTest-address-lineField">
                                       <span class="form-sub-label-container">
                                          {/* <input type="text" id="input_4_addr_line2" name="q4_billingAddress[addr_line2]" class="form-textbox form-address-line" data-defaultvalue="" autocomplete="section-input_4 address-line2" value={addLineTwo} onChange={(e) => setAddLineTwo(e.target.value)} data-component="address_line_2" aria-labelledby="label_4 sublabel_4_addr_line2" /> */}
                                          <Field name="addLineTwo" class="form-textbox form-address-line" />
                                          {/* {errors.addLineTwo && touched.addLineTwo ? (
                                             <div>{errors.addLineTwo}</div>
                                          ) : null} */}
                                          <ErrorMessage name="addLineTwo" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                          <label class="form-sub-label" for="input_4_addr_line2" id="sublabel_4_addr_line2" aria-hidden="false">Street Address Line 2</label>
                                       </span>
                                    </span>
                                 </div>
                                 <div class="form-address-line-wrapper jsTest-address-line-wrapperField">
                                    <span class="form-address-line form-address-city-line jsTest-address-lineField ">
                                       <span class="form-sub-label-container" >
                                          {/* <input type="text" id="input_4_city" name="q4_billingAddress[city]" class="form-textbox form-address-city" data-defaultvalue="" autocomplete="section-input_4 address-level2" value={addCity} onChange={(e) => setAddCity(e.target.value)} data-component="city" aria-labelledby="label_4 sublabel_4_city" required="" /> */}
                                          <Field name="addCity" class="form-textbox form-address-city" />
                                          {/* {errors.addCity && touched.addCity ? (
                                             <div>{errors.addCity}</div>
                                          ) : null} */}
                                          <ErrorMessage name="addCity" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                          <label class="form-sub-label" for="input_4_city" id="sublabel_4_city" aria-hidden="false">City</label>
                                       </span>
                                    </span>
                                    <span class="form-address-line form-address-state-line jsTest-address-lineField ">
                                       <span class="form-sub-label-container" >
                                          {/* <input type="text" id="input_4_state" name="q4_billingAddress[state]" class="form-textbox form-address-state" data-defaultvalue="" autocomplete="section-input_4 address-level1" value={addState} onChange={(e) => setAddState(e.target.value)} data-component="state" aria-labelledby="label_4 sublabel_4_state" required="" /> */}
                                          <Field name="addState" class="form-textbox form-address-state" />
                                          {/* {errors.addState && touched.addState ? (
                                             <div>{errors.addState}</div>
                                          ) : null} */}
                                          <ErrorMessage name="addState" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                          <label class="form-sub-label" for="input_4_state" id="sublabel_4_state" aria-hidden="false">State / Province</label>
                                       </span>
                                    </span>
                                 </div>
                                 <div class="form-address-line-wrapper jsTest-address-line-wrapperField">
                                    <span class="form-address-line form-address-zip-line jsTest-address-lineField ">
                                       <span class="form-sub-label-container">
                                          {/* <input type="text" id="input_4_postal" name="q4_billingAddress[postal]" class="form-textbox form-address-postal" data-defaultvalue="" autocomplete="section-input_4 postal-code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} data-component="zip" aria-labelledby="label_4 sublabel_4_postal" required="" /> */}
                                          <Field name="zipCode" class="form-textbox form-address-postal" />
                                          {/* {errors.zipCode && touched.zipCode ? (
                                             <div>{errors.zipCode}</div>
                                          ) : null} */}
                                          <ErrorMessage name="zipCode" render={msg => <div style={{ color: "red" }} >{msg}</div>} />
                                          <label class="form-sub-label" for="input_4_postal" id="sublabel_4_postal" aria-hidden="false">Postal / Zip Code</label>
                                       </span>
                                    </span>
                                    <span class="form-address-line form-address-country-line jsTest-address-lineField ">
                                       <span class="form-sub-label-container" >
                                          <select class="form-dropdown form-address-country" name="q4_billingAddress[country]" id="input_4_country" data-component="country" required="" aria-labelledby="label_4 sublabel_4_country" autocomplete="section-input_4 country">
                                             <option value="">Please Select</option>
                                             <option value="United States">United States</option>
                                             <option value="Afghanistan">Afghanistan</option>
                                             <option value="Albania">Albania</option>
                                             <option value="Algeria">Algeria</option>
                                             <option value="American Samoa">American Samoa</option>
                                             <option value="Andorra">Andorra</option>
                                             <option value="Angola">Angola</option>
                                             <option value="Anguilla">Anguilla</option>
                                             <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                             <option value="Argentina">Argentina</option>
                                             <option value="Armenia">Armenia</option>
                                             <option value="Aruba">Aruba</option>
                                             <option value="Australia">Australia</option>
                                             <option value="Austria">Austria</option>
                                             <option value="Azerbaijan">Azerbaijan</option>
                                             <option value="The Bahamas">The Bahamas</option>
                                             <option value="Bahrain">Bahrain</option>
                                             <option value="Bangladesh">Bangladesh</option>
                                             <option value="Barbados">Barbados</option>
                                             <option value="Belarus">Belarus</option>
                                             <option value="Belgium">Belgium</option>
                                             <option value="Belize">Belize</option>
                                             <option value="Benin">Benin</option>
                                             <option value="Bermuda">Bermuda</option>
                                             <option value="Bhutan">Bhutan</option>
                                             <option value="Bolivia">Bolivia</option>
                                             <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                             <option value="Botswana">Botswana</option>
                                             <option value="Brazil">Brazil</option>
                                             <option value="Brunei">Brunei</option>
                                             <option value="Bulgaria">Bulgaria</option>
                                             <option value="Burkina Faso">Burkina Faso</option>
                                             <option value="Burundi">Burundi</option>
                                             <option value="Cambodia">Cambodia</option>
                                             <option value="Cameroon">Cameroon</option>
                                             <option value="Canada">Canada</option>
                                             <option value="Cape Verde">Cape Verde</option>
                                             <option value="Cayman Islands">Cayman Islands</option>
                                             <option value="Central African Republic">Central African Republic</option>
                                             <option value="Chad">Chad</option>
                                             <option value="Chile">Chile</option>
                                             <option value="China">China</option>
                                             <option value="Christmas Island">Christmas Island</option>
                                             <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                             <option value="Colombia">Colombia</option>
                                             <option value="Comoros">Comoros</option>
                                             <option value="Congo">Congo</option>
                                             <option value="Cook Islands">Cook Islands</option>
                                             <option value="Costa Rica">Costa Rica</option>
                                             <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                                             <option value="Croatia">Croatia</option>
                                             <option value="Cuba">Cuba</option>
                                             <option value="Curaçao">Curaçao</option>
                                             <option value="Cyprus">Cyprus</option>
                                             <option value="Czech Republic">Czech Republic</option>
                                             <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                                             <option value="Denmark">Denmark</option>
                                             <option value="Djibouti">Djibouti</option>
                                             <option value="Dominica">Dominica</option>
                                             <option value="Dominican Republic">Dominican Republic</option>
                                             <option value="Ecuador">Ecuador</option>
                                             <option value="Egypt">Egypt</option>
                                             <option value="El Salvador">El Salvador</option>
                                             <option value="Equatorial Guinea">Equatorial Guinea</option>
                                             <option value="Eritrea">Eritrea</option>
                                             <option value="Estonia">Estonia</option>
                                             <option value="Ethiopia">Ethiopia</option>
                                             <option value="Falkland Islands">Falkland Islands</option>
                                             <option value="Faroe Islands">Faroe Islands</option>
                                             <option value="Fiji">Fiji</option>
                                             <option value="Finland">Finland</option>
                                             <option value="France">France</option>
                                             <option value="French Polynesia">French Polynesia</option>
                                             <option value="Gabon">Gabon</option>
                                             <option value="The Gambia">The Gambia</option>
                                             <option value="Georgia">Georgia</option>
                                             <option value="Germany">Germany</option>
                                             <option value="Ghana">Ghana</option>
                                             <option value="Gibraltar">Gibraltar</option>
                                             <option value="Greece">Greece</option>
                                             <option value="Greenland">Greenland</option>
                                             <option value="Grenada">Grenada</option>
                                             <option value="Guadeloupe">Guadeloupe</option>
                                             <option value="Guam">Guam</option>
                                             <option value="Guatemala">Guatemala</option>
                                             <option value="Guernsey">Guernsey</option>
                                             <option value="Guinea">Guinea</option>
                                             <option value="Guinea-Bissau">Guinea-Bissau</option>
                                             <option value="Guyana">Guyana</option>
                                             <option value="Haiti">Haiti</option>
                                             <option value="Honduras">Honduras</option>
                                             <option value="Hong Kong">Hong Kong</option>
                                             <option value="Hungary">Hungary</option>
                                             <option value="Iceland">Iceland</option>
                                             <option value="India">India</option>
                                             <option value="Indonesia">Indonesia</option>
                                             <option value="Iran">Iran</option>
                                             <option value="Iraq">Iraq</option>
                                             <option value="Ireland">Ireland</option>
                                             <option value="Israel">Israel</option>
                                             <option value="Italy">Italy</option>
                                             <option value="Jamaica">Jamaica</option>
                                             <option value="Japan">Japan</option>
                                             <option value="Jersey">Jersey</option>
                                             <option value="Jordan">Jordan</option>
                                             <option value="Kazakhstan">Kazakhstan</option>
                                             <option value="Kenya">Kenya</option>
                                             <option value="Kiribati">Kiribati</option>
                                             <option value="North Korea">North Korea</option>
                                             <option value="South Korea">South Korea</option>
                                             <option value="Kosovo">Kosovo</option>
                                             <option value="Kuwait">Kuwait</option>
                                             <option value="Kyrgyzstan">Kyrgyzstan</option>
                                             <option value="Laos">Laos</option>
                                             <option value="Latvia">Latvia</option>
                                             <option value="Lebanon">Lebanon</option>
                                             <option value="Lesotho">Lesotho</option>
                                             <option value="Liberia">Liberia</option>
                                             <option value="Libya">Libya</option>
                                             <option value="Liechtenstein">Liechtenstein</option>
                                             <option value="Lithuania">Lithuania</option>
                                             <option value="Luxembourg">Luxembourg</option>
                                             <option value="Macau">Macau</option>
                                             <option value="Macedonia">Macedonia</option>
                                             <option value="Madagascar">Madagascar</option>
                                             <option value="Malawi">Malawi</option>
                                             <option value="Malaysia">Malaysia</option>
                                             <option value="Maldives">Maldives</option>
                                             <option value="Mali">Mali</option>
                                             <option value="Malta">Malta</option>
                                             <option value="Marshall Islands">Marshall Islands</option>
                                             <option value="Martinique">Martinique</option>
                                             <option value="Mauritania">Mauritania</option>
                                             <option value="Mauritius">Mauritius</option>
                                             <option value="Mayotte">Mayotte</option>
                                             <option value="Mexico">Mexico</option>
                                             <option value="Micronesia">Micronesia</option>
                                             <option value="Moldova">Moldova</option>
                                             <option value="Monaco">Monaco</option>
                                             <option value="Mongolia">Mongolia</option>
                                             <option value="Montenegro">Montenegro</option>
                                             <option value="Montserrat">Montserrat</option>
                                             <option value="Morocco">Morocco</option>
                                             <option value="Mozambique">Mozambique</option>
                                             <option value="Myanmar">Myanmar</option>
                                             <option value="Nagorno-Karabakh">Nagorno-Karabakh</option>
                                             <option value="Namibia">Namibia</option>
                                             <option value="Nauru">Nauru</option>
                                             <option value="Nepal">Nepal</option>
                                             <option value="Netherlands">Netherlands</option>
                                             <option value="Netherlands Antilles">Netherlands Antilles</option>
                                             <option value="New Caledonia">New Caledonia</option>
                                             <option value="New Zealand">New Zealand</option>
                                             <option value="Nicaragua">Nicaragua</option>
                                             <option value="Niger">Niger</option>
                                             <option value="Nigeria">Nigeria</option>
                                             <option value="Niue">Niue</option>
                                             <option value="Norfolk Island">Norfolk Island</option>
                                             <option value="Turkish Republic of Northern Cyprus">Turkish Republic of Northern Cyprus</option>
                                             <option value="Northern Mariana">Northern Mariana</option>
                                             <option value="Norway">Norway</option>
                                             <option value="Oman">Oman</option>
                                             <option value="Pakistan">Pakistan</option>
                                             <option value="Palau">Palau</option>
                                             <option value="Palestine">Palestine</option>
                                             <option value="Panama">Panama</option>
                                             <option value="Papua New Guinea">Papua New Guinea</option>
                                             <option value="Paraguay">Paraguay</option>
                                             <option value="Peru">Peru</option>
                                             <option value="Philippines">Philippines</option>
                                             <option value="Pitcairn Islands">Pitcairn Islands</option>
                                             <option value="Poland">Poland</option>
                                             <option value="Portugal">Portugal</option>
                                             <option value="Puerto Rico">Puerto Rico</option>
                                             <option value="Qatar">Qatar</option>
                                             <option value="Republic of the Congo">Republic of the Congo</option>
                                             <option value="Romania">Romania</option>
                                             <option value="Russia">Russia</option>
                                             <option value="Rwanda">Rwanda</option>
                                             <option value="Saint Barthelemy">Saint Barthelemy</option>
                                             <option value="Saint Helena">Saint Helena</option>
                                             <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                             <option value="Saint Lucia">Saint Lucia</option>
                                             <option value="Saint Martin">Saint Martin</option>
                                             <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                             <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                             <option value="Samoa">Samoa</option>
                                             <option value="San Marino">San Marino</option>
                                             <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                             <option value="Saudi Arabia">Saudi Arabia</option>
                                             <option value="Senegal">Senegal</option>
                                             <option value="Serbia">Serbia</option>
                                             <option value="Seychelles">Seychelles</option>
                                             <option value="Sierra Leone">Sierra Leone</option>
                                             <option value="Singapore">Singapore</option>
                                             <option value="Slovakia">Slovakia</option>
                                             <option value="Slovenia">Slovenia</option>
                                             <option value="Solomon Islands">Solomon Islands</option>
                                             <option value="Somalia">Somalia</option>
                                             <option value="Somaliland">Somaliland</option>
                                             <option value="South Africa">South Africa</option>
                                             <option value="South Ossetia">South Ossetia</option>
                                             <option value="South Sudan">South Sudan</option>
                                             <option value="Spain">Spain</option>
                                             <option value="Sri Lanka">Sri Lanka</option>
                                             <option value="Sudan">Sudan</option>
                                             <option value="Suriname">Suriname</option>
                                             <option value="Svalbard">Svalbard</option>
                                             <option value="eSwatini">eSwatini</option>
                                             <option value="Sweden">Sweden</option>
                                             <option value="Switzerland">Switzerland</option>
                                             <option value="Syria">Syria</option>
                                             <option value="Taiwan">Taiwan</option>
                                             <option value="Tajikistan">Tajikistan</option>
                                             <option value="Tanzania">Tanzania</option>
                                             <option value="Thailand">Thailand</option>
                                             <option value="Timor-Leste">Timor-Leste</option>
                                             <option value="Togo">Togo</option>
                                             <option value="Tokelau">Tokelau</option>
                                             <option value="Tonga">Tonga</option>
                                             <option value="Transnistria Pridnestrovie">Transnistria Pridnestrovie</option>
                                             <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                             <option value="Tristan da Cunha">Tristan da Cunha</option>
                                             <option value="Tunisia">Tunisia</option>
                                             <option value="Turkey">Turkey</option>
                                             <option value="Turkmenistan">Turkmenistan</option>
                                             <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                             <option value="Tuvalu">Tuvalu</option>
                                             <option value="Uganda">Uganda</option>
                                             <option value="Ukraine">Ukraine</option>
                                             <option value="United Arab Emirates">United Arab Emirates</option>
                                             <option value="United Kingdom">United Kingdom</option>
                                             <option value="Uruguay">Uruguay</option>
                                             <option value="Uzbekistan">Uzbekistan</option>
                                             <option value="Vanuatu">Vanuatu</option>
                                             <option value="Vatican City">Vatican City</option>
                                             <option value="Venezuela">Venezuela</option>
                                             <option value="Vietnam">Vietnam</option>
                                             <option value="British Virgin Islands">British Virgin Islands</option>
                                             <option value="Isle of Man">Isle of Man</option>
                                             <option value="US Virgin Islands">US Virgin Islands</option>
                                             <option value="Wallis and Futuna">Wallis and Futuna</option>
                                             <option value="Western Sahara">Western Sahara</option>
                                             <option value="Yemen">Yemen</option>
                                             <option value="Zambia">Zambia</option>
                                             <option value="Zimbabwe">Zimbabwe</option>
                                             <option value="other">Other</option>
                                          </select><label class="form-sub-label" for="input_4_country" id="sublabel_4_country" aria-hidden="false">Country</label></span></span></div>
                              </div>
                           </div>
                        </li>

                        <li class="form-line" data-type="control_button" id="id_13">
                           <div id="cid_13" class="form-input-wide" data-layout="full">
                              <div data-align="center" class="form-buttons-wrapper form-buttons-center   jsTest-button-wrapperField">
                                 <button onClick={() => setSubmitBtnState("add-to-cart")} id="input_13" type="submit" class="form-submit-button submit-button jf-form-buttons jsTest-submitField" data-component="button" data-content="">Add To Cart</button>
                                 <button onClick={() => setSubmitBtnState("checkout")} id="input_13" type="submit" class="form-submit-button submit-button jf-form-buttons jsTest-submitField" data-component="button" data-content="">Submit Order</button>
                              </div>
                           </div>
                        </li>

                     </Form>
                  )}
               </Formik >
               {/* </form> */}
            </ul>


            {/* <div class="error-navigation-container" aria-hidden="false" >
         <div class="error-navigation-inner"><span class="error-navigation-message">There is <strong>1</strong> error in this page. Please correct it before moving on.</span><button class="error-navigation-next-button" type="button">See Errors</button><button class="error-navigation-done-button" type="button">Done</button></div>
      </div> */}

         </div>

         {/* <div className="blog-section">
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
               <div class="surprise-me foot-sur">
                  <a href="/about-us">
                     <Button class="btn-login">Contact Us</Button>
                     <p><a href="">MakerDogKabe@gmail.com</a></p>
                  </a>
               </div>
            </div>
         </div> */}
         {/* {<Footer />} */}

      </div >
   );
};

export default PlaceOrder;


{/* <li class="form-line" data-type="control_radio" id="id_17">
                     <label class="form-label form-label-top form-label-auto" id="label_17" for="input_17"> Is shipping address same as billing address? </label>
                     <div id="cid_17" class="form-input-wide" data-layout="full">
                        <div class="form-single-column" role="group" aria-labelledby="label_17" data-component="radio">
                           <span class="form-radio-item">
                              <span class="dragger-item"></span>
                              <input type="radio" aria-describedby="label_17" class="form-radio" id="input_17_0" name="q17_isShipping17" value="Yes" />
                              <label id="label_input_17_0" for="input_17_0">Yes</label>
                           </span>
                           <span class="form-radio-item">
                              <span class="dragger-item"></span>
                              <input type="radio" aria-describedby="label_17" class="form-radio" id="input_17_1" name="q17_isShipping17" value="No" />
                              <label id="label_input_17_1" for="input_17_1">No</label>
                           </span>
                        </div>
                     </div>
                  </li> */}
{/* <li class="form-line" data-type="control_textarea" id="id_14">
                     <label class="form-label form-label-top" id="label_14" for="input_14"> Special Instructions </label>
                     <div id="cid_14" class="form-input-wide" data-layout="full">
                        <textarea id="input_14" class="form-textarea" name="q14_specialInstructions" data-component="textarea" aria-labelledby="label_14"></textarea>
                     </div>
                  </li> */}
{/* <li class="form-line" data-type="control_radio" id="id_18">
                     <label class="form-label form-label-top form-label-auto" id="label_18" for="input_18"> Payment Methods </label>
                     <div id="cid_18" class="form-input-wide" data-layout="full">
                        <div class="form-single-column" role="group" aria-labelledby="label_18" data-component="radio">
                           <span class="form-radio-item">
                              <span class="dragger-item"></span>
                              <input type="radio" aria-describedby="label_18" class="form-radio" id="input_18_0" name="q18_isShipping18" value="Yes" />
                              <label id="label_input_18_0" for="input_18_0">Debit Card or Credit card</label>
                           </span>
                           <span class="form-radio-item">
                              <span class="dragger-item"></span>
                              <input type="radio" aria-describedby="label_18" class="form-radio" id="input_18_1" name="q18_isShipping18" value="No" />
                              <label id="label_input_18_1" for="input_18_1">Paypal</label>
                           </span>
                        </div>
                     </div>
                  </li> */}
