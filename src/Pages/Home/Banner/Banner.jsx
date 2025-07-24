import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // React Router এর লিঙ্ক ইম্পোর্ট করুন

const slides = [
  {
    id: 1,
    title: "Explore the Hidden Beauty of Sundarbans",
    subtitle: "Join our guided mangrove adventures today!",
    img: '/img1t.jpg',
    cta: "Explore Now",
    link: "community", // লিঙ্ক পাথ যোগ করুন
    target: "_self" // লিঙ্ক টার্গেট (নতুন ট্যাবে খুলতে চাইলে "_blank" ব্যবহার করুন)
  },
  {
    id: 2,
    title: "Heritage of Mahasthangarh",
    subtitle: "Walk through thousands of years of history",
    img: 'banner3.jpg',
    cta: "Book A Tour",
    link: "/allTrips",
    target: "_self"
  },
  {
    id: 3,
    title: "Local Tour Guides You Can Trust",
    subtitle: "Real people. Real experiences. Local insights.",
    img: '/banner2.jpg',
    cta: "Meet Our Guides",
    link: "/tour-guides",
    target: "_self"
  },
];

const Banner = () => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <div className="carousel w-full h-full">
        {slides.map((slide) => (
          <div
            key={slide.id}
            id={`slide${slide.id}`}
            className="carousel-item relative w-full h-full"
          >
            {/* Background image with lazy loading */}
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover absolute"
              loading="lazy"
            />
            
            {/* Overlay with gradient for better text visibility */}
            <div className="absolute inset-0  w-full h-full flex items-center justify-start px-6 sm:px-12 lg:px-24">
              <Fade direction="left" cascade damping={0.2} triggerOnce>
              <div className="max-w-xl text-secondary space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl font-bold text-secondary">{slide.subtitle}</p>
                  
                  {/* CTA বাটনে লিঙ্ক যোগ করুন */}
                  <button>
                    <Link 
                    to={slide.link} 
                    target={slide.target}
                    className="btn btn-primary mt-6 group flex items-center gap-2 hover:gap-3 transition-all duration-300"
                  >
                    {slide.cta} 
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  </button>
                </div>
              </Fade>
            </div>
            
            {/* Navigation buttons */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${slide.id === 1 ? slides.length : slide.id - 1}`}
                className="btn btn-circle btn-sm md:btn-md btn-ghost hover:bg-white/20 text-white"
                aria-label="Previous slide"
              >
                ❮
              </a>
              <a
                href={`#slide${slide.id === slides.length ? 1 : slide.id + 1}`}
                className="btn btn-circle btn-sm md:btn-md btn-ghost hover:bg-white/20 text-white"
                aria-label="Next slide"
              >
                ❯
              </a>
            </div>
            
            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {slides.map((item) => (
                <a
                  key={item.id}
                  href={`#slide${item.id}`}
                  className={`w-3 h-3 rounded-full ${slide.id === item.id ? 'bg-primary' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${item.id}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;