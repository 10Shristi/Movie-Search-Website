import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import { motion } from "framer-motion"
function WatchList() {
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);
    const navigate = useNavigate();
    const handleMovieClick = (movie) => {
   
      
      navigate(`/search/${movie.id}`, { state: { movie } });
    };
    useEffect(() => {
       
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser && storedUser.movieWatchLater) {
            setWatchLaterMovies(storedUser.movieWatchLater.reverse());
        }
    }, []);
    

    

    const handleViewMore = (type) => {
        const title = 'All Movies';
        const fetchUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=098c63e7858cdab4acc4107128eb1cd7';
        const initialMovies = []; 
      
        navigate('/view-more', {
          state: {
            title,
            initialMovies,
            fetchUrl,
            type: 'discover/movie',
          },
        });
      };
      
  
    return (
<div>
        <Navbar />
        <div className='text-white p-2 mt-20'>
            <h2 className='font-bold text-2xl flex justify-center'>Watch List</h2>
            {watchLaterMovies.length > 0 ? (
                <ul className='grid  gap-6 grid-cols-2  mt-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'  >

                    {watchLaterMovies.map((movie) => (
                        <li key={movie.id} onClick={() => handleMovieClick(movie)}>
                            <div className='text-xm'>
                            <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
                             <img
                className="w-52 h-auto block rounded-md"
                style={{ width: "200px", height: "300px", objectFit: "cover" }}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              /></motion.button>
              
                            <h3 className='font-semibold text-base mt-2'>{movie.movieTitle}</h3>

                           
                            </div>
                            
                        </li>
                    ))}
                   
                </ul>
            ) : (
                <div className='flex items-center justify-center h-screen flex-col'>
                <p className='text-white  font-semibold text-4xl '>No movies added yet.</p>
                <div
            
            className="text-white mr-4 px-5 py-3 rounded cursor-pointer flex items-center hover:text-blue-400"
          > <button onClick={() => handleViewMore('discover/movie')}
          className="border  bg-gray-300 text-black border-gray-300 py-1 px-3 ml-4 hover:bg-blue-400 mr-2 rounded-sm font-semibold shadow-md shadow-slate-400"
         
        >
          Find something to watch
        </button></div>
            </div>
            )}
        </div>
        </div>
    );
}

export default WatchList;

