import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavbarOrder from "../components/NavbarOrder";
import axios from "axios";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import photoFrame from "../assets/images/photoFrame.png";
import WhiteTshirt from "../assets/images/white-tshirt.png";
import mug from "../assets/images/mug.png";
import postcard from "../assets/images/postcard.png";

const RecentArt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // console.log("location", location);
    const imgUrl = location?.state?.imgUrl;

    return (
        <div>
            <NavbarOrder navigateTo={"/results"} />
            <>
                {
                    imgUrl ? (
                        <div className="result-section" style={{ marginBottom: "40px" }}>
                            <div class="container">

                                <div>
                                    <img src={imgUrl} width="500px" height="500px" style={{ borderRadius: "10px" }} />
                                </div>

                                <div className="tshirt-modify">
                                    <div className="main-tshirt">
                                        <div onClick={() => {
                                            navigate("/order", {
                                                state: {
                                                    imgUrl,
                                                    orderUrl: WhiteTshirt,
                                                    orderType: "t-shirt",
                                                    backPath: "/recent-art"
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
                                                        imgUrl,
                                                        orderUrl: WhiteTshirt,
                                                        orderType: "t-shirt",
                                                        backPath: "/recent-art"
                                                    }
                                                })
                                            }}>
                                            <img src={imgUrl} alt="Select your image" className="h-10 w-10" />
                                        </div>
                                    </div>


                                    <div className="main-tshirt frame">
                                        <div
                                            onClick={() => {
                                                navigate("/order", {
                                                    state: {
                                                        imgUrl,
                                                        orderUrl: photoFrame,
                                                        orderType: "frame",
                                                        backPath: "/recent-art"
                                                    }
                                                })
                                            }}>
                                            <div className="name">Create custom Framed Poster with MakerDog</div>

                                            <img src={photoFrame} alt="test" className="h-10 w-10 maint framephoto" />
                                        </div>
                                        <div className="img"
                                            onClick={() => {
                                                navigate("/order", {
                                                    state: {
                                                        imgUrl,
                                                        orderUrl: photoFrame,
                                                        orderType: "frame",
                                                        backPath: "/recent-art"
                                                    }
                                                })
                                            }}>
                                            <img src={imgUrl} alt="Select your image" className="h-10 w-10" />
                                        </div>
                                    </div>

                                </div> <br />
                                <div className="tshirt-modify">

                                    <div className="main-tshirt">
                                        <div onClick={() => {
                                            navigate("/order", {
                                                state: {
                                                    imgUrl,
                                                    orderUrl: mug,
                                                    orderType: "mug",
                                                    backPath: "/results"
                                                }
                                            })
                                        }}>
                                            <div className="name">Create custom Mug with MakerDog</div>

                                            <img src={mug} alt="test" className="h-10 w-10 maint" />
                                        </div>
                                        <div className="img"
                                            onClick={() => {
                                                navigate("/order", {
                                                    state: {
                                                        imgUrl,
                                                        orderUrl: mug,
                                                        orderType: "mug",
                                                        backPath: "/results"
                                                    }
                                                })
                                            }}>
                                            <img src={imgUrl} alt="Select your image" className="h-10 w-10" />
                                        </div>
                                    </div>

                                    <div className="main-tshirt">
                                        <div onClick={() => {
                                            navigate("/order", {
                                                state: {
                                                    imgUrl,
                                                    orderUrl: postcard,
                                                    orderType: "postcard",
                                                    backPath: "/results"
                                                }
                                            })
                                        }}>
                                            <div className="name">Create custom Postcard with MakerDog</div>

                                            <img src={postcard} alt="test" className="h-10 w-10 maint" />
                                        </div>
                                        <div className="img"
                                            onClick={() => {
                                                navigate("/order", {
                                                    state: {
                                                        imgUrl,
                                                        orderUrl: postcard,
                                                        orderType: "postcard",
                                                        backPath: "/results"
                                                    }
                                                })
                                            }}>
                                            <img src={imgUrl} alt="Select your image" className="h-10 w-10" />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="result-section">
                                <div class="container">
                                    <h2 className="result-head">Please Select the image again</h2>
                                </div>
                            </div>
                        </>
                    )
                }
            </>
            <Footer />
        </div>
    )
}

export default RecentArt;