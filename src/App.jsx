import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import MovieDetails from "./MovieDetails.jsx";
import Movies from "./Movies.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/details/:id" element={<MovieDetails />}></Route>
        <Route path="/search" element={<Movies />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
