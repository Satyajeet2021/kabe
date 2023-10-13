import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavbarOrder from "./NavbarOrder";
import axios from "axios";
import * as React from "react";
import AxiosInstance from "../helper/AxiosInstance";

const WallOfFame = () => {



    // let storedImgs = localStorage.getItem("wallOfFame");
    // const formatFavImgs = JSON.parse(storedImgs);
    // console.log("storedImgs", formatFavImgs);
    const [storedImgs, setStoredImgs] = useState([]);

    const getFavImges = async () => {
        let favImages = await AxiosInstance.get("/api/wallOfFame");
        console.log("storedImgs", favImages?.data?.getFavImages);
        setStoredImgs(favImages);
    }

    useEffect(() => {
        getFavImges();
    }, []);

    // const renderImages = formatFavImgs?.map((data, i) => {
    //     return(
    //         <div key={i} >
    //             <img src={data.filePath} width="600px" height="600px" /><br />
    //             <span>ID: {data.id}</span><br />
    //             <span>Prompt Text: {data.promptText}</span><br />
    //             <span>Created At: {data.createdAt}</span>
    //         </div>
    //     )
    // })





    let renderImages = storedImgs?.data?.getFavImages?.map((data, i) => {
        // const byteCharacters = atob(data.file);
        // const byteNumbers = new Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        //     byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // const byteArray = new Uint8Array(byteNumbers);
        // let image = new Blob([byteArray], { type: 'image/jpeg' });
        return (
            <li className="list-view-recent" key={i} >
                <img src={data.filePath} width="300px" height="300px" /><br />
                {/* <img src={`data:image/png;base64,${image}`} width="300px" height="300px" /><br /> */}
                {/* <img src={data.file} width="300px" height="300px" /><br /> */}
                {/* <span>ID: {data.id}</span><br />
                <span>Prompt Text: {data.promptText}</span><br />
                <span>Created At: {data.createdAt}</span> */}
            </li>
        )
    })
    return (
        <div>

            <NavbarOrder navigateTo={"/"} />
            {/* <div className="walloffame">
                <div class="container">
                    <h3 className="">Wall of fame</h3>
                    <div className="">
                        <ul className="list-group">
                        <li className="list-view ani-left main-slider">
                        {renderImages}
                        </li>
                        </ul>
                    </div>
                </div>
            </div> */}


            <div className="fisherbg walloffame">
                <div class="container recent1">
                    <h2 className="result-head pb-2">Wall of fame</h2>
                    <ul className="list-group">
                        {renderImages}
                    </ul>
                </div>
            </div>

            {/* <div>{renderImages}</div> */}
            <Footer />
        </div>
    )
}

export default WallOfFame;