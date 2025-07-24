import React from "react";
import MYBanner from "./MyBanner";
import AboutMe from "./AboutMe";
import Skillss from "./Skillss";
import Education from "./Education";
import Projects from "./Projects";
import Contact from "./Contacts";
import ScrollToTop from "../../Component/ScrollToTop";

const AboutUs = () => {
  return (
    <div>
       <ScrollToTop /> 
      <MYBanner></MYBanner>
      <AboutMe />
      <Skillss></Skillss>
      <Education></Education>
      <Projects></Projects>
      <Contact />
    </div>
  );
};

export default AboutUs;
