import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { TiTick } from "react-icons/ti";

function WatchLater({ movieTitle, moviePoster, movieID }) {
    const [user, setUser] = useState({});
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [message, setMessage] = useState('');

    const handleWatchLater = () => {
        const movieWatchLater = {
            id: movieID,
            movieTitle: movieTitle,
            poster_path: moviePoster,
        };

        const currentUser = { ...user };

        if (!currentUser.movieWatchLater) {
            currentUser.movieWatchLater = [];
        }

        const existingMovieIndex = currentUser.movieWatchLater.findIndex(movie => movie.id === movieID);

        if (existingMovieIndex !== -1) {
           
            currentUser.movieWatchLater.splice(existingMovieIndex, 1);
            setMessage('Removed from watchlist!');
            setIsInWatchlist(false);
        } else {
           
            currentUser.movieWatchLater.push(movieWatchLater);
            setMessage('Added to watchlist!');
            setIsInWatchlist(true);
        }
        setTimeout(() => {
            setMessage('');
        }, 1500);

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        setUser(currentUser);
        
        
        let storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      
        const userIndex = storedUsers.findIndex(storedUser => storedUser.fname === currentUser.fname);

        if (userIndex!==-1) {
            storedUsers[userIndex] = currentUser;
        } else {
           
            storedUsers.push(currentUser);
        }

        localStorage.setItem('users', JSON.stringify(storedUsers));
    };

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUserData) {
            setUser(storedUserData);
            const isMovieInWatchlist = storedUserData.movieWatchLater?.some(movie => movie.id === movieID);
            setIsInWatchlist(isMovieInWatchlist);
        }
    }, [movieID]);

    return (
        <div className=''>
            <div
                className="flex justify-end items-center text-white cursor-pointer hover:text-blue-400"
                onClick={handleWatchLater}>
                {isInWatchlist ? (
                    <>
                        <TiTick  className="mr-2 h-8 w-8 text-blue-400" />
                        <p className="font-bold italic text-blue-400">WATCHLIST</p>
                    </>
                ) : (
                    <>
                        <FaPlus className="mr-2" />
                        <p className="font-bold italic">WATCHLIST</p>
                    </>
                )}
            </div>

            
            {message && (
    <div className={`text-sm italic flex justify-end ${isInWatchlist ? 'text-blue-500' : 'text-red-500'}`}>
        <p>{message}</p>
    </div>
)}

        </div>
    );
}

export default WatchLater;
