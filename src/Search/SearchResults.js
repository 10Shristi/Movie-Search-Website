import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rating from "../Movies/Rating";

import WatchLater from "../Movies/WatchLater";
import Navbar from "../Movies/Navbar";

import ClipLoader from 'react-spinners/ClipLoader';
function SearchResults(movieTitle) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOThjNjNlNzg1OGNkYWI0YWNjNDEwNzEyOGViMWNkNyIsIm5iZiI6MTcyMzUyOTE5Ny4wMDcwMSwic3ViIjoiNjY5NGE2Yzg1YzkzMGZkYTRmYmFjNGM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XQ8mxb-E03i-9GmM2784yDr8jMq6V7skoitND3pAEkk",
    },
  };

  const location = useLocation();
  const movie = location.state?.movie;
  const [detailedMovie, setDetailedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (movie && movie.id) {
      

      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=credits,reviews,videos,images?api_key=098c63e7858cdab4acc4107128eb1cd7`,
        options
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch movies");
          }
          return res.json();
        })
        .then((detailedMovie) => {
          console.log("Fetched detailed movie:", detailedMovie);
          setDetailedMovie(detailedMovie);
          console.log(detailedMovie);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching detailed movie:", error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [movie]);

  if (loading) {
    return (
      
      <div className=" flex items-center justify-center min-h-screen">
   <ClipLoader color={"#ffffff"} loading={loading} size={80} />
      </div>
      
      
    );
  }

  if (error) {
    return <p className="text-red-500 mt-2">Error: {error}</p>;
  }
 
  return (
    <div>
      <Navbar />
     
      <div className=" flex items-center justify-center bg-black mt-20">
        <div className="relative w-full mx-auto bg-gray-900 text-white">
          <div className=" overflow-y-auto ">
            {detailedMovie?.videos?.results?.length > 0 ? (
              detailedMovie.videos.results.find(
                (video) => video.site === "YouTube" && video.type === "Trailer"
              ) ? (
                <div className="">
                  <iframe
                    className="w-full"
                    width="880"
                    height="400"
                    src={`https://www.youtube.com/embed/${
                      detailedMovie.videos.results.find(
                        (video) =>
                          video.site === "YouTube" && video.type === "Trailer"
                      ).key
                    }`}
                    title={
                      detailedMovie.videos.results.find(
                        (video) =>
                          video.site === "YouTube" && video.type === "Trailer"
                      ).name
                    }
                  ></iframe>
                </div>
              ) : (
                <p>N/A</p>
              )
            ) : (
              <p>N/A</p>
            )}
            <div className="flex flex-wrap ">
              <div className="w-3/6 p-4">
                
                <h2 className="text-4xl font-bold mb-2">
                  {detailedMovie?.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {detailedMovie.release_date}
                </p>
                <p className="mb-4">{detailedMovie.overview}</p>
              </div>

              <div className="w-2/6 md:w-1/3 p-4 mt-2">
                

                <p className="text-white text-sm mb-1">
                  <span className="font-semibold">Origin Country:</span>{" "}
                  {detailedMovie?.origin_country.join(", ")}
                </p>
                <p className="text-white text-sm mb-1">
                  <span className="font-semibold">Language:</span>{" "}
                  {detailedMovie?.spoken_languages
                    ?.map((language) => language.name)
                    .join(", ")}
                </p>
                <p className="text-white text-sm mb-1">
                  <span className="font-semibold">Budget:</span>{" "}
                  {detailedMovie?.budget}
                </p>
                <p className="text-white text-sm mb-1">
                  <span className="font-semibold">Runtime:</span>{" "}
                  {detailedMovie?.runtime}
                </p>
                <p className="text-white text-sm mb-1">
                  <span className="font-semibold">Status:</span>{" "}
                  {detailedMovie?.status}
                </p>
                <p className="text-white text-sm mb-1">
                  <span className="font-semibold">Genre:</span>{" "}
                  {detailedMovie?.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className="text-white text-sm mb-1">
                  <span className="font-semibold">Production Company:</span>{" "}
                  {detailedMovie?.production_companies
                    ?.map((company) => company.name)
                    .join(", ")}
                </p>
              </div>
              <div className="w-1/6 mt-2 p-2">
                <WatchLater
                  movieTitle={movie.title}
                  moviePoster={movie.poster_path}
                  movieID={movie.id}
                />
              </div>
            </div>

          
            <div className="text-white text-sm mb-1 mt-2 p-4">
              <h3 className="font-semibold text-lg mb-3">Cast:</h3>
              {detailedMovie?.credits?.cast?.length > 0 ? (
                <div className="grid grid-cols-8 gap-6">
                  {detailedMovie.credits.cast
                    .slice(0, 15)
                    .map((castMember, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w45${castMember.profile_path}`}
                          alt={castMember.name}
                          className="w-16 h-16 rounded-full mb-2"
                        />
                        <div className="text-center">
                          <p className="font-semibold text-base">
                            {castMember.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {castMember.character}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p>N/A</p>
              )}
            </div>

            <Rating movieTitle={movie.title} />
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
