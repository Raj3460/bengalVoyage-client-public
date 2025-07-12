import React from "react";
import Banner from "./Banner/Banner";
import Overview from "./Overview/Overview";
import TouristStorySec from "./Tourist_Story/TouristStorySec";
import Ourservice from "./OurService/Ourservice";
import TourismAndTravel from "./TourismAndTravel/TourismAndTravel";

const Home = () => {
  return (
    <div className="text-5xl">
      <Banner></Banner>
      <Overview></Overview>
      <TourismAndTravel></TourismAndTravel>
      <TouristStorySec></TouristStorySec>
      <Ourservice></Ourservice>
    </div>
  );
};

export default Home;
