import React, { useState } from 'react'
import Home from "./Movies/Home.js"
import LoginSignUp from "./Login/LoginSignUp"
import LoginSignIn from "./Login/LoginSignIn"
import Movie from "./Movies/Movie.js"
import ProtectedRoutes from "./Services/ProtectedRoutes"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Movies/Navbar.js'

import Profile from './Movies/Profile.js'
import SearchResults from './Search/SearchResults.js';
import Searchbar from './Search/Searchbar.js'




import WatchList from './Movies/WatchList.js'
import ViewMore from './Component/ViewMore.js'




function App() {
  const [results,setResults]=useState([]);
  return (
    <div>
      <BrowserRouter>
      {/* <Navbar /> */}
        <Routes>
        
        <Route path="loginSignUp" element={<LoginSignUp />}></Route>
          <Route path="loginSignIn" element={<LoginSignIn />}></Route>
        <Route path="/Searchbar" element={<Searchbar setResults={setResults} />} />
      
        <Route path="/search/:id" element={<SearchResults />} />
        
        <Route path="profile" element={<Profile />}></Route>
        <Route path="watchlist" element={<WatchList />}></Route>
        <Route path="/:category" element={<ViewMore />} />
     

        <Route path="navbar" element={<Navbar />}></Route>
        <Route path="movie" element={<Movie />}></Route>
          
          <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

