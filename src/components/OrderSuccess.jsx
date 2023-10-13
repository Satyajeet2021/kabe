import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import './Cartpage.css';
// import Order from '../../assets/order.jpg';
import Order from "../assets/images/order.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AxiosInstance from '../helper/AxiosInstance';

const OrderSuccess = () => {
  const navigate = useNavigate();
  var allcookies = document.cookie;
  let paymentSessionId, price, totalPrice, quantity, productName, userName, email, contactNo, addLineOne, addLineTwo, addCity, addState, zipCode;
  // Get all the cookies pairs in an array
  let cookiearray = allcookies.split(';');
  const orderSuccessState = useSelector(state => state.checkoutSession);

  // Now take key value pair out of this array
  for (var i = 0; i < cookiearray.length; i++) {
    let name = cookiearray[i].split('=')[0];
    let value = cookiearray[i].split('=')[1];
    // console.log("Key is : " + name + " and Value is : " + value);
    if (name == "paymentSessionId" || name == " paymentSessionId") paymentSessionId = value;
    if (name == "price" || name == " price") price = value;
    if (name == "totalPrice" || name == " totalPrice") totalPrice = value;
    if (name == "quantity" || name == " quantity") quantity = value;
    if (name == "productName" || name == " productName") productName = value;
    if (name == "name" || name == " name") userName = value;
    if (name == "email" || name == " email") email = value;
    if (name == "contactNo" || name == " contactNo") contactNo = value;
    if (name == "addLineOne" || name == " addLineOne") addLineOne = value;
    if (name == "addLineTwo" || name == " addLineTwo") addLineTwo = value;
    if (name == "addCity" || name == " addCity") addCity = value;
    if (name == "addState" || name == " addState") addState = value;
    if (name == "zipCode" || name == " zipCode") zipCode = value;
  }
  // console.log("sessionDetails", { paymentSessionId, price, totalPrice, quantity, productName, userName, email, contactNo, addLineOne, addLineTwo, addCity, addState, zipCode })

  const sendEmail = async () => {
    const data = await AxiosInstance.post("/api/paymentConfirmationEmail", {
      paymentSessionId,
      quantity,
      price,
      totalPrice,
      productName,
      name: userName,
      email,
      contactNo,
      addLineOne,
      addLineTwo,
      addCity,
      addState,
      zipCode
    });
    // console.log("send mail", data);
  }
  // sendEmail();

  (async () => {
    if (paymentSessionId) {
      const data = await AxiosInstance.post("/api/paymentConfirmationEmail", {
        paymentSessionId,
        quantity,
        price,
        totalPrice,
        productName,
        name: userName,
        email,
        contactNo,
        addLineOne,
        addLineTwo,
        addCity,
        addState,
        zipCode
      });
      // console.log("send mail", data);
    }
  })();

  console.log("orderSuccessState", orderSuccessState);
  return (
    <>

      <div className="order-success-page">
        <div className="card-success">
          <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
            <i className="checkmark">✓</i>
          </div>
          <h2 className="success-h2">Order Successful</h2>
          <p>Thank you so much for your order<br /> Your order is on the way. We will update you via email.</p>
          <div className="order">
            {/* <div className="order-box">
              <p className="order-id">Order id:<span> {paymentSessionId} </span></p>
              <div className="order-image">
                <img src="./rachit-tank-2cFZ_FB08UM-unsplash.jpg" alt="order" />
              </div>
              <div className="order-details">
                <p>Product Name:<span> {productName} </span></p>
                <p>Quantity:<span> {quantity} </span></p>
                <p>Price:<span> {price} </span></p>
                <p>Total:<span> {totalPrice} </span></p>
              </div>
            </div> */}
          </div>
          <button class="form-submit-button submit-button jf-form-buttons jsTest-submitField" onClick={() => { navigate("/"); }} > Home </button>
        </div>
      </div>


      {/* <div className='container w-11/12 mx-auto p-3 mob-pt'>
        <di className="flex space-x-20 product-container mob-flex">
          
        </di>
      </div> */}


      {/* <div className="flex container w-full mx-auto mt-10 justify-center h-screen">
		<div class="flex-col w-12/12 ">  
		<div className="flex space-x-12"> 
			<div className="w-12/12 p-5" style={{backgroundColor:"#ededed"}}> 
				<div className="pb-24 mt-1 text-sm">
                 <img src={Order}/>
				</div>
				<div className="justify-center items-center bg-black "></div>
			</div> 
		</div> 
		</div>
		</div> */}

    </>
  )
}

export default OrderSuccess;