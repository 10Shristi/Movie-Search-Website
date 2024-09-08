import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Movies/Navbar';
import { motion } from "framer-motion"

function ViewMore() {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
 
  const location = useLocation();
  const { title, initialMovies, fetchUrl, type ,} = location.state || {}; 
  const navigate = useNavigate();
  const totalPages = 50; 

  const fetchMovies = (page) => {
    // const URL = `https://api.themoviedb.org/3/discover/movie?api_key=098c63e7858cdab4acc4107128eb1cd7&query=${title}&page=${page}`;
    const fetchUrl = `https://api.themoviedb.org/3/${type}?api_key=098c63e7858cdab4acc4107128eb1cd7&page=${page}`;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results);
          setCurrentPage(data.page);
        } else {
          setMovies([]); 
        }
      })
      .catch((err) => console.error("Failed to fetch movies", err));
  };

  useEffect(() => {
    if (initialMovies && initialMovies.length > 0) {
      setMovies(initialMovies);
    } else {
      fetchMovies(1); 
    }
  }, [initialMovies, title, fetchUrl]); 

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchMovies(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchMovies(currentPage - 1);
    }
  };

  const handleMovieClick = (movie) => {
    navigate(`/search/${movie.id}`, { state: { movie } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div>
      <Navbar />
     
      <div className="text-white p-2 mt-20">
        <h2 className="font-bold text-2xl flex justify-center">{title || 'Movies'}</h2>
        <div className="grid gap-6 grid-cols-2 mt-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="w-full p-2" onClick={() => handleMovieClick(movie)}>
                 <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 , duration:0.5}}
  >
                <img
                  className="w-full h-auto block rounded-md cursor-pointer"
                  style={{ width: "200px", height: "300px", objectFit: "cover" }}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                </motion.button>
                
                <h3 className="font-semibold text-base mt-2">{movie.title}</h3>
              </div>
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 mx-2 bg-gray-800 text-white"
            // disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-2 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 mx-2 bg-gray-800 text-white"
            // disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewMore;


