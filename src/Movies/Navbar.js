import React, { useEffect, useState } from "react";
import Movie from "./Movie";

import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Searchbar from "../Search/Searchbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className=" p-4 fixed top-0 left-0 w-full bg-black  z-50 ">
        <div className="max-w-full mx-auto flex justify-between items-center">
       
          <div className="flex-shrink-0 ">
            {/* <span className="text-blue-400 text-4xl font-bold cursor-pointer ml-3">
           
              Movies
             
            </span> */}
            

            
             <Link
            to="/"
            className="text-blue-400 text-4xl font-bold cursor-pointer ml-3"
          >
             Movies
          </Link>
          
          

          </div>
          <div className="hidden md:flex md:items-center md:ml-auto text-lg" >
          
             <Link
            to="/"
            className="text-white mr-4 px-5 py-3 rounded cursor-pointer flex items-center hover:text-blue-400"
          >
            <IoMdHome className="mr-2" /> HOME
          </Link>
          
           
          <Link
            to="/watchList"
            className="text-white mr-4 px-5 py-3 rounded cursor-pointer flex items-center hover:text-blue-400"
          >
            <FaPlus className="mr-2" />
            WATCHLIST
          </Link>
          
          
          <Link
            to="/profile"
            className="text-white mr-4 px-5 py-3 rounded cursor-pointer flex items-center hover:text-blue-400"
          >
            <CgProfile className="mr-2" />
            PROFILE
          </Link>
          </div>
          <Searchbar />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
