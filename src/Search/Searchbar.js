import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchResultList from "./SearchResultList";
import { debounce } from "../utils/debounce";


const Searchbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchData = useCallback((value) => {
    console.log("Fetching data :", value);
    if ( value === "") {
      setLoading(false);
      setSearchResults([]);
      return;
    }
    console.log("Fetching data for:", value);
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=098c63e7858cdab4acc4107128eb1cd7&query=${value}`;
    setError(null);
    console.log("URL being fetched:", URL);
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        console.log("API Response:", json);
        setLoading(false);
        if (json.results) {
          console.log("Results Array:", json.results);
          setSearchResults(json.results);
        } else {
          console.log("No results found in the response.");
          setSearchResults([]);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const debouncedFetchData = useCallback(debounce(fetchData, 1000), []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setError(null);
    // if (value.length === 0) {
    //   setLoading(false);
    //   setSearchResults([]);
    // } else {
      searchResults.length === 0 && setLoading(true);
      debouncedFetchData(value);
    // }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovieId(movie.id);
    console.log("Movie selected:", movie);
    navigate(`/search/${movie.id}`, { state: { movie } });
  };
  const handleOnBlur = ()=>{
    // setSearchResults([]);
    setLoading(false);
    setInput("");
  }

  return (
    <div className="flex flex-col items-center md:ml-4 ">
      <input
        // ref={inputRef}
        onBlur={handleOnBlur}
        type="text"
        value={input}
        onChange={handleSearchChange}
        placeholder="Search"
        className="px-2 py-1 border border-gray-300 rounded-md   focus:outline-none  "
      />
      <div className="absolute top-12 ">
      {loading && <p className="text-white mt-2 ">Loading...</p>}
      </div>
      {!loading && !error && searchResults.length === 0 && input && (
        <p className="text-white mt-9 absolute z-10 overflow-y-auto">
          No movies found.
        </p>
      )}
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <SearchResultList
        results={searchResults}
        onSelect={handleMovieSelect}
        clearResults={() => setSearchResults([])}
      />
    </div>
  );
};

export default Searchbar;
