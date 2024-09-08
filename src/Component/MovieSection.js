import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"

function MovieSection({ title, fetchUrl, handleMovieClick, handleViewMore }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ${title} movies`);
        }
        return res.json();
      })
      .then((json) => setMovies(json.results))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center justify-between">
      <h2 className="text-white font-bold md:text-2xl ml-2 mt-3 mb-2">{title}</h2>
      <div className="flex justify-end">
      {/* <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  > */}
        <button
          className="border  bg-gray-300 text-black border-gray-300 py-1 px-3 ml-4 mb-2 hover:bg-blue-400 mr-3 rounded-sm font-medium shadow-md  shadow-slate-400"
          onClick={handleViewMore}
        >
          View All
        </button>
        {/* </motion.button> */}
      </div>
      </div>
      
      {loading ? (
        <div className="text-white">Loading movies...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="relative flex items-center">
          <div
            id={"slider"}
            className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide overflow-hidden relative"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="w-[180px] sm:w-[200px] md:w[240px] lg:w-[280] inline-block cursor-pointer relative p-2 group"
                onClick={() => handleMovieClick(movie)}
              >
                <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
                <img
                  className="w-full h-auto block rounded-md"
                  style={{ width: "200px", height: "300px", objectFit: "cover" }}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                
                <div className="top-0 left-0 w-full h-full absolute inset-0 flex items-center justify-center opacity-0 group-hover:bg-black/80 group-hover:opacity-100 bg-opacity-50 transition-opacity duration-300">
                  <h2 className="text-xl font-bold text-white">{movie.title}</h2>
                </div>
                </motion.button>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
}

export default MovieSection;


