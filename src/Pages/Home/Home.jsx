import React from "react";
import Banner from "./Banner/Banner";
import Overview from "./Overview/Overview";

import Ourservice from "./OurService/Ourservice";
import TourismAndTravel from "./TourismAndTravel/TourismAndTravel";
import TouristStoriesSection from "./TouristStoriesSection/TouristStoriesSection";
import ScrollToTop from "../../Component/ScrollToTop";
import TravelTipsSection from "./TravelTipsSection";

const Home = () => {
  return (
    <div className="text-5xl">
      
      <ScrollToTop />
      <Banner></Banner>
      <Overview></Overview>

      <TourismAndTravel></TourismAndTravel>
      <TravelTipsSection></TravelTipsSection>
      <TouristStoriesSection></TouristStoriesSection>
      <Ourservice></Ourservice>
    </div>
  );
};

export default Home;
