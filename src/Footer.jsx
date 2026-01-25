import React from "react";

const Footer = () => {
  return (
    <footer className="navbar-expand-lg fixed-bottom navbar-expand-lg bg-dark p-4">
      <div className="container">
        <div className="float-left">
          <a
            className="text-muted footer-links"
            href="https://github.com/zbhavyai/movie-search-omdb"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-github"></i> source code
          </a>
        </div>
        <div className="float-right">
          <a className="text-muted footer-links" href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">
            Powered by <strong>OMDb API</strong>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
