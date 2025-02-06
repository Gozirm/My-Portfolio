import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import arrowImg from "../assets/north_east_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg";
import axios from "axios";
import { Link } from "react-router";
import PreLoading from "./PreLoading";

const Project = () => {
  const [portfolioDetails, setPortfolioDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://my-portfolio-vvxz.onrender.com//api/create-project/projects"
        );
        const shuffledProjects = shuffleArray(response.data.projects);
        setPortfolioDetails(shuffledProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    const handlePopState = () => {
      window.location.reload();
    };

    window.onpopstate = handlePopState;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  if (loading) {
    return <div className="text-white text-center"><PreLoading/></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <>
      <main className="py-16 min-h-svh mx-5">
        <h1 className="text-white uppercase text-3xl text-center mb-8 mt-5">
          Projects
        </h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {portfolioDetails.map((datum, index) => {
            return (
              <div
                key={index}
                className="bg-zinc-900 p-5 rounded-lg transition-transform transform hover:scale-105 mb-5 mx-2"
              >
                <div className="rounded-md mb-3">
                  <img
                    src={datum.image}
                    alt={datum.name}
                    className="rounded-md"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-white text-xl font-semibold">
                      {datum.name}
                    </h1>
                    <p className="text-gray-300">
                      {datum.description.length > 19
                        ? `${datum.description.slice(0, 50)}...`
                        : datum.description}
                    </p>
                  </div>
                  {datum.path ? (
                    <Link to={datum.path}>
                      <img src={arrowImg} alt={arrowImg} className="w-10" />
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </Masonry>
      </main>
    </>
  );
};

export default Project;