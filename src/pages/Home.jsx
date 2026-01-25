import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <SearchBar />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
