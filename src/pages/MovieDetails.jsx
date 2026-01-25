import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const MovieDetails = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const { id: imdbId } = useParams();

  let url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}&plot=full`;

  let brokenPoster = "/no-poster.jpg";

  // overwrite poster if 'N/A'

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, [url]);

  return (
    <React.Fragment>
      <Header />

      <div className="darker-background">
        <div className="container custom-padding pt-4">
          <div className="row">
            <div className="col-12">
              {data["Response"] !== "True" ? (
                <div className="card mt-4">
                  <div className="card-body bg-dark">
                    <div className="text-white">{data["Error"]}</div>
                  </div>
                </div>
              ) : (
                <div className="row" style={{ paddingBottom: "7rem" }}>
                  <div className="col-md-4 pt-3">
                    <div className="card custom-card darker-background">
                      <img
                        className="card-img-top img-stretch"
                        src={data["Poster"].startsWith("http") ? data["Poster"] : brokenPoster}
                        alt="Movie poster"
                        onError={(e) => {
                          e.target.src = brokenPoster;
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 text-white pt-3">
                    <h1 className="fw-bold movie-details-text" style={{ fontSize: "2.5em" }}>
                      {data["Title"]}
                    </h1>
                    <h2 className="fw-bold pt-3" style={{ fontSize: "1.25em" }}>
                      {data["Year"]}
                    </h2>
                    <h2 className="fw-bold" style={{ fontSize: "1.25em" }}>
                      {data["Genre"]}
                    </h2>
                    <h3 className="pt-3" style={{ fontSize: "1.25em" }}>
                      {data["imdbRating"]}
                      <i className="bi bi-star-fill text-warning mx-3"></i>
                    </h3>
                    <h4 className="pt-3" style={{ fontSize: "1.2em" }}>
                      Director:
                      <span className="text-muted mx-3">{data["Director"]}</span>
                    </h4>
                    <h4 className="pt-2" style={{ fontSize: "1.2em" }}>
                      Top Cast:
                      <span className="text-muted mx-3">{data["Actors"]}</span>
                    </h4>
                    <p className="pt-4">{data["Plot"]}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default MovieDetails;
