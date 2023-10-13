import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import { useConsumeContext } from "../context/ContextFile";
import Main from "./Main";
import Results from "./Results";
import About from "./About-us";
import Test from "./Test";
import Placeorder from "../components/Placeorder";
import OrderSuccess from "../components/OrderSuccess";
import WallOfFame from "components/WallOfFame";
import RecentArt from "./RecentArt";
import Cart from "./cart";


const AppRouter = () => {
  const { dark } = useConsumeContext()
  // console.log(dark)
  return (
    <div className={`${dark ? "dark" : "light"}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/payment-success" element={<OrderSuccess />} />
          <Route path="/walloffame" element={<WallOfFame />} />
          <Route path="/recent-art" element={<RecentArt />} />
          <Route
            path="results"
            element={<Results />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
