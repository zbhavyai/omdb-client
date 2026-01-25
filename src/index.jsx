import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails.jsx";
import Movies from "./pages/Movies.jsx";
import Home from "./pages/Home.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/details/:id" element={<MovieDetails />}></Route>
        <Route path="/search" element={<Movies />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
