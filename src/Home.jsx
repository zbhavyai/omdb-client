import React from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import SearchBar from "./SearchBar.jsx";

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
