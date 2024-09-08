import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Movie from "./Movie";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />

      <Movie />

      <Footer />
    </div>
  );
};

export default Home;
