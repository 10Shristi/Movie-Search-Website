import React, { useEffect, useState,useRef } from "react";

import { useNavigate } from "react-router-dom";
import MovieSection from "../Component/MovieSection";
import { motion } from "framer-motion"

function Movie() {
  const [moviePopular, setmoviePopular] = useState([]);
  const [movieUpcoming, setmovieUpcoming] = useState([]);
  const [movieToprated, setmovieToprated] = useState([]);
  const movie = moviePopular[Math.floor(Math.random() * moviePopular.length)];
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorPopular, setErrorPopular] = useState(null);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [errorUpcoming, setErrorUpcoming] = useState(null);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const [errorTopRated, setErrorTopRated] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieall, setmovieall] = useState([]);
  const [loadingall, setLoadingall] = useState(true);
  const [errorall, setErrorall] = useState(null);
  
  const [likedMovies, setLikedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  useEffect(() => {
    const fetchRecommendations = () => {
        fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=098c63e7858cdab4acc4107128eb1cd7"
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }
            return response.json();
        })
        .then(data => {
            setRecommendedMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching recommendations:', error);
        });
    };

    if (likedMovies.length > 0) {
        fetchRecommendations();
    }
}, [likedMovies]);
  
 
  const handleViewMore = (type) => {
    const categories = {
      popular: { title: 'Popular Movies', movies: moviePopular, type: 'movie/popular' },
      upcoming: { title: 'Upcoming Movies', movies: movieUpcoming, type: 'movie/upcoming' },
      'top-rated': { title: 'Top Rated Movies', movies: movieToprated, type: 'movie/top_rated' },
      'all-movie': {title: 'All Movies', movies: movieall,type: 'discover/movie'},
    };
  
  
    const { title, movies, type: movieType } = categories[type] || {};
  
    if (title && movies) {
      navigate(`/${type}`, { state: { title, movies, type: movieType  } });
    }
  };
 

  const getPopularMovie = () => {
    setLoadingPopular(true);
    setErrorPopular(null);
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=098c63e7858cdab4acc4107128eb1cd7"
      
    )
     
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        return res.json();
      })
      .then((json) => setmoviePopular(json.results))
      .catch((error) => setErrorPopular(error.message))
      .finally(() => setLoadingPopular(false));
  };
  console.log(movie)
  
  const getUpcomingMovie = () => {
    setLoadingUpcoming(true);
    setErrorUpcoming(null);
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=098c63e7858cdab4acc4107128eb1cd7"
    )
     
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch upcoming movies");
        }
        return res.json();
      })
      .then((json) => setmovieUpcoming(json.results))
      .catch((error) => setErrorUpcoming(error.message))
      .finally(() => setLoadingUpcoming(false));
  };
  const getTopRatedMovie = () => {
    setLoadingTopRated(true);
    setErrorTopRated(null);
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=098c63e7858cdab4acc4107128eb1cd7"
    )
     
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch top-rated movies");
        }
        return res.json();
      })
      .then((json) => setmovieToprated(json.results))
      .catch((error) => setErrorTopRated(error.message))
      .finally(() => setLoadingTopRated(false));
  };
  const getAllMovie = () => {
    setLoadingall(true);
    setErrorall(null);
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=098c63e7858cdab4acc4107128eb1cd7"
    )
     
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch top-rated movies");
        }
        return res.json();
      })
      .then((json) => setmovieall(json.results))
      .catch((error) => setErrorall(error.message))
      .finally(() => setLoadingall(false));
  };

  console.log(movie)
  useEffect(() => {
    getPopularMovie();
    getUpcomingMovie();
    getTopRatedMovie();
    getAllMovie();
  }, []);

 

  const navigate = useNavigate();
  const handleMovieClick = (movie) => {
    
    navigate(`/search/${movie.id}`, { state: { movie } });
  };

  return (
    <React.Fragment>
      <div className="w-full h-[550px] text-white">
        <div className="w-full h-full ">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black hover:bg-black/50 bg-opacity-50 transition-opacity duration-300"></div>
          <img
            className="w-full h-[550px] object-cover mt-20 "
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          />
          <div className="absolute  w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
            <div className="my-4">
            <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
              <button
                className="border  bg-gray-300 text-black border-gray-300 py-2 px-4 ml-1 mb-2 hover:bg-blue-400 mr-2 rounded-sm font-medium shadow-md shadow-slate-400"
                onClick={() => handleMovieClick(movie)}
              >
                View more
              </button>
              </motion.button>
             
            </div>
            <p className="text-sm text-gray-500">
              Release Date: {movie?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {movie?.overview}
            </p>
          </div>
        </div>
      </div>

      
      {/* <LanguageFilter /> */}
      <MovieSection
        title="All Movies"
        fetchUrl="https://api.themoviedb.org/3/discover/movie?api_key=098c63e7858cdab4acc4107128eb1cd7"
        // navigate={navigate}
        handleMovieClick={handleMovieClick}
        handleViewMore={() => handleViewMore("all-movie")}
      />
    
      <MovieSection
        title="Popular"
        fetchUrl="https://api.themoviedb.org/3/movie/popular?api_key=098c63e7858cdab4acc4107128eb1cd7"
        // navigate={navigate}
        handleMovieClick={handleMovieClick}
        handleViewMore={() => handleViewMore("popular")}
      />

      
       <MovieSection
        title="Upcoming"
        fetchUrl="https://api.themoviedb.org/3/movie/upcoming?api_key=098c63e7858cdab4acc4107128eb1cd7"
        // navigate={navigate}
        handleMovieClick={handleMovieClick}
       
        handleViewMore={() => handleViewMore("upcoming")}
      />

     
      <MovieSection
        title="Top Rated"
        fetchUrl="https://api.themoviedb.org/3/movie/top_rated?api_key=098c63e7858cdab4acc4107128eb1cd7"
        // navigate={navigate}
        handleMovieClick={handleMovieClick}
        handleViewMore={() => handleViewMore("top-rated")}
      />
      
     
    </React.Fragment>
  );
}

export default Movie;
