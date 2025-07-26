import React from "react";

const VideoOverview = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center py-16 px-4">
       
                 <h2 className="text-2xl md:text-4xl font-bold mx-auto  mb-6">
           BengalVoyage <span className="text-primary">Overview</span>
          </h2>
      <video
        autoPlay
        loop
        muted
        controls
        className="rounded-lg shadow-md w-11/12 sm:w-9/12"
      >
        <source src="/Bengalvoyage.mp4" type="video/mp4" />
        
      </video>
    </div>
  );
};

export default VideoOverview;
