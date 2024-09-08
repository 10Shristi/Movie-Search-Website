import React, { useEffect, useState } from 'react';

const SearchResultList = ({ results, onSelect, clearResults  }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-input') && !event.target.closest('.search-results')) {
        clearResults();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [clearResults]);

  return (
    <div className=" text-black absolute z-10 overflow-y-auto top-16 bg-white rounded-lg shadow-lg w-80 max-h-72">
      <ul>
        {results.map((movie) => (
          <li
            key={movie.id}
            onClick={() => onSelect(movie)}
            className="cursor-pointer px-3 py-2 hover:bg-gray-200 duration-200"
          >
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;





