import React from "react";

const Footer = () => {
  return (
    <footer className="navbar-expand-lg fixed-bottom navbar-expand-lg bg-dark p-4">
      <div className="container">
        <div className="float-left">
          <a className="text-white" href="https://github.com/zbhavyai/omdb-client" target="_blank" rel="noreferrer">
            <i className="bi bi-github"></i>
          </a>
        </div>
        <div className="float-right">
          <a className="text-secondary footer-links" href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">
            Powered by <strong>OMDb API</strong>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
