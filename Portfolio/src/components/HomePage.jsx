import React, { useEffect, useState } from "react";
import logo from "../assets/profile.jpg";
import signature from "../assets/signature.png";
import headphone from "../assets/a9saem55a.png";
import reactLogo from "../assets/software.png";
import arrow from "../assets/trending_flat_51dp_CCCCCC_FILL0_wght400_GRAD0_opsz48.svg";
import Navbar from "./Navbar";
import { Outlet, useMatch, useNavigate } from "react-router";
import { useSwipeable } from "react-swipeable"; // Import the swipeable library

const HomePage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedP, setIsClickedP] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const match = useMatch("/");

  const handleAnimation = (url) => {
    setIsClicked(true);
    setTimeout(() => {
      window.location.href = url;
    }, 2050);
  };

  const handleAnimationP = (path) => {
    setIsClickedP(true);
    setTimeout(() => {
      navigate(path);
    }, 2050);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://my-portfolio-vvxz.onrender.com/api/create-project/allreviews"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Swipeable configuration
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length),
    onSwipedRight: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <>
      <div className="fixed top-0 z-50">
        <Navbar />
      </div>
      {match ? (
        <main className="mx-5 pt-16 min-h-screen flex-col md:flex justify-center items-center md:flex-row md:flex-wrap animate__animated animate__fadeInBottomRight">
          <div className="flex flex-col md:flex-none lg:flex-row md:space-x-4 w-full">
            <div className="outline outline-1 rounded-lg p-5 flex-1 bg-transparent hover:backdrop-blur-md hover:scale-105 duration-1000">
              {/* ME SECTION */}
              <div className="md:flex justify-center items-center gap-3">
                <img
                  src={logo}
                  alt="Logo"
                  className="md:w-40 rounded-md md:mb-0 mb-4"
                />
                <div className="space-y-2">
                  <h1 className="uppercase tracking-widest">Designer-Dev</h1>
                  <h1 className="break-words text-white uppercase text-4xl md:text-6xl">
                    Chigozirim <br />
                    <span>Joshua</span>
                  </h1>
                  <p>
                    I am a Web Designer and Graphic Designer with few months of
                    understanding to coding and 5 years+ in designing field.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4 flex-1 mt-5 lg:mt-0">
              {/* MARQUEE SECTION */}
              <marquee className="outline outline-1 rounded-lg p-5 w-full bg-transparent hover:backdrop-blur-md hover:scale-105 duration-1000">
                <h1 className="uppercase text-center">
                  🎨 Graphic Designer - 💻 Frontend Development - 🖥️ Backend Development - 📱 Mobile App Development - 🌐 Responsive Web Design - 📈 SEO Optimization - 🔧 Maintenance & Support
                </h1>
              </marquee>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* ABOUT ME SECTION */}
                <div
                  className={`${
                    isClicked
                      ? "animate__animated animate__hinge outline outline-1 rounded-lg p-5"
                      : "outline outline-1 rounded-lg p-5 flex-1 bg-transparent hover:backdrop-blur-md hover:scale-105 duration-1000"
                  }`}
                >
                  <img src={signature} alt="" className="w-fit" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="uppercase">Let's Connect</p>
                      <h1 className="text-white text-2xl">Contact</h1>
                    </div>
                    <button
                      className=""
                      onClick={() => handleAnimation("https://wa.link/0bte3m")}
                    >
                      <img src={arrow} alt="" className="w-7" />
                    </button>
                  </div>
                </div>
                {/* PROJECT SECTION */}
                <div
                  className={`${
                    isClickedP
                      ? "animate__animated animate__hinge outline outline-1 rounded-lg p-5"
                      : "outline outline-1 rounded-lg p-5 flex-1 bg-transparent hover:backdrop-blur-md hover:scale-105 duration-1000"
                  }`}
                >
                  <img src={headphone} alt="" className="w-48" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="uppercase">Showcase</p>
                      <h1 className="text-white text-2xl">Projects</h1>
                    </div>
                    <button
                      className=""
                      onClick={() => handleAnimationP("/project")}
                    >
                      <img src={arrow} alt="" className="w-7" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-5 lg:mt-0 pb-5">
            {/* SOFTWARE SECTION */}
            <div className="outline outline-1 rounded-lg p-5 col-span-1 md:col-span-2 flex flex-col justify-center space-y-5 bg-transparent hover:backdrop-blur-md hover:scale-105 duration-1000">
              <img src={reactLogo} alt="" className="w-auto" />
              <div>
                <p className="uppercase">Specialization</p>
                <h1 className="text-white text-4xl">Softwares</h1>
              </div>
            </div>
            {/* OTHERS SECTION */}
            <div
              className="outline outline-1 rounded-lg p-5 col-span-1 bg-transparent hover:backdrop-blur-md hover:scale-105 duration-1000 transition-transform overflow-hidden"
              {...handlers} // Attach swipe handlers
            >
              {reviews.length > 0 ? (
                <div className="overflow-y-auto max-h-32">
                  <h1 className="text-white mb-2 transition-opacity duration-500">
                    {reviews[currentIndex].review}
                  </h1>
                  <p className="text-zinc transition-opacity duration-500">
                    - {reviews[currentIndex].name}
                  </p>
                </div>
              ) : (
                <p className="text-white">Loading reviews...</p>
              )}
            </div>
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default HomePage;