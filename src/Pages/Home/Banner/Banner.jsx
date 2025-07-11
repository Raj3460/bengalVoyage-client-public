import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Explore the Hidden Beauty of Sundarbans",
    subtitle: "Join our guided mangrove adventures today!",
    img: "https://i.ibb.co/nMsTwQdV/sundorbonjpeg.jpg",
    cta: "Explore Now",
  },
  {
    id: 2,
    title: "Heritage of Mahasthangarh",
    subtitle: "Walk through thousands of years of history",
    img: "https://i.ibb.co/pPfs9dT/mahasthangarh.jpg",
    cta: "Book A Tour",
  },
  {
    id: 3,
    title: "Local Tour Guides You Can Trust",
    subtitle: "Real people. Real experiences. Local insights.",
    img: "https://i.ibb.co/mDbmvdM/localguide.jpg",
    cta: "Meet Our Guides",
  },
];

const Banner = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <div className="carousel w-full h-full">
        {slides.map((slide) => (
          <div
            key={slide.id}
            id={`slide${slide.id}`}
            className="carousel-item relative w-full h-full"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="w-full h-full bg-black/40 flex items-center justify-start px-10 lg:px-24">
                <Fade direction="left" cascade damping={0.2}>
                  <div className="max-w-xl text-secondary space-y-4">
                    <h1 className="text-3xl lg:text-5xl font-bold">
                      {slide.title}
                    </h1>
                    <p className="text-lg">{slide.subtitle}</p>
                    <button className="btn btn-primary mt-4 flex items-center gap-2">
                      {slide.cta} <FaArrowRight />
                    </button>
                  </div>
                </Fade>
              </div>
            </div>
            {/* Navigation buttons */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${slide.id === 1 ? slides.length : slide.id - 1}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#slide${slide.id === slides.length ? 1 : slide.id + 1}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
