import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CreatedContext = createContext();
export const useConsumeContext = () => {
  return useContext(CreatedContext);
};

const ContextFile = ({ children }) => {
  const dispatch = useDispatch();
  const [dark, setDark] = useState(false);
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [favImg, setFavImg] = useState(null);
  const url = `https://google-search3.p.rapidapi.com/api/v1/search/q=${searchValue}`;
  const imageUrl = `https://google-search3.p.rapidapi.com/api/v1/image/q=${searchValue}`;

  useEffect(() => {
    // debugger;
    let storedHistory = localStorage.getItem("userHistory");
    const currentTime = new Date(new Date().getTime());
    if (storedHistory == null) {
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
      ])
    } else {
      let formatHistory = JSON.parse(storedHistory);
      // console.log("arrLength=====>>>>>", formatHistory?.length)
      // console.log("formatHistory", formatHistory);
      for (let i = 0; i < formatHistory?.length; i++) {
        const oneHr = 1000 * 60 * 60 * 1;//1000 * 60 * 3//1000 * 60 * 60 * 1;//1000 * 60 * 1;
        const createdAt = new Date(new Date(formatHistory[i].createdAt).getTime());
        const updatedAt = new Date(new Date(formatHistory[i].createdAt).getTime() + oneHr);
        // console.log("createdAt", createdAt);
        // console.log("updatedAt", updatedAt);
        // console.log("currentTime", currentTime);
        if (currentTime > updatedAt) {
          // console.log("compareTime", (currentTime > updatedAt))
          formatHistory.splice(i, i);
          // console.log("updatedFormatHistory", formatHistory);
          localStorage.setItem("userHistory", JSON.stringify(formatHistory));
        }
      }
      setUserHistory(formatHistory);
    }
    // if (storedHistory?.length < 16) {
    //   setUserHistory([
    //     { url: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1524481905007-ea072534b820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1633466876697-1eb9c820028d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1610568781018-995405522539?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1531214159280-079b95d26139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1533518463841-d62e1fc91373?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1109&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1624628639856-100bf817fd35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1439436556258-1f7fab1bfd4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1479740030693-66ad10f3a7b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1613750651512-d65ce96dff55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1456082902841-3335005c3082?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //     { url: "https://images.unsplash.com/photo-1641314560038-efffa6e4404e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", createdAt: currentTime, prompt: 'Prompt used to display the image "https://images.unsplash.com"' },
    //   ]);
    // }
  }, []);

  // useEffect(() => {
  //   let storedImgs = localStorage.getItem("wallOfFame");
  //   const currentTime = new Date(new Date().getTime());
  //   if (storedImgs == null) {
  //     setFavImg([
  //       { promptText: 'Prompt used to display the image "https://images.unsplash.com"', id: "imgOne", filePath: "http://localhost:5000/public/wallOfFame/imgOne.png", createdAt: currentTime },
  //       { promptText: 'Prompt used to display the image "https://images.unsplash.com"', id: "imgOne", filePath: "http://localhost:5000/public/wallOfFame/imgTwo.png", createdAt: currentTime },
  //       { promptText: 'Prompt used to display the image "https://images.unsplash.com"', id: "imgOne", filePath: "http://localhost:5000/public/wallOfFame/imgThree.png", createdAt: currentTime },
  //       { promptText: 'Prompt used to display the image "https://images.unsplash.com"', id: "imgOne", filePath: "http://localhost:5000/public/wallOfFame/imgFour.png", createdAt: currentTime },
  //     ])
  //   } else {
  //     const formatFavImgs = JSON.parse(storedImgs);
  //     setFavImg(formatFavImgs);
  //   }
  // }, []);

  // const getImageFromApi = async () => {
  //   dispatch({ type: "LOAD" });

  //   const res = await axios.get(`${imageUrl}`, {
  //     headers: {
  //       "x-user-agent": "desktop",
  //       "x-rapidapi-host": "google-search3.p.rapidapi.com",
  //       "x-rapidapi-key": "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vkjsnK4bkzuUzVLzA",
  //     },
  //   });

  //   setImg(res.data);
  //   dispatch({ type: "NOTLOAD" });
  // };

  // const getDataFromApi = async () => {
  //   dispatch({ type: "LOAD" });
  //   const res = await axios.get(`${url}`, {
  //     headers: {
  //       "x-user-agent": "desktop",
  //       "x-rapidapi-host": "google-search3.p.rapidapi.com",
  //       "x-rapidapi-key": "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vkjsnK4bkzuUzVLzA",
  //     },
  //   });

  //   setData(res.data);
  //   dispatch({ type: "NOTLOAD" });
  // };
  // console.log(data);

  return (
    <CreatedContext.Provider
      value={{
        // getImageFromApi,
        img,
        setImg,
        data,
        dark,
        setDark,
        setData,
        // getDataFromApi,
        searchValue,
        setSearchValue,
        userHistory,
        setUserHistory,
        loading,
        setLoading,
        favImg,
        setFavImg
      }}
    >
      {children}
    </CreatedContext.Provider>
  );
};

export default ContextFile;
