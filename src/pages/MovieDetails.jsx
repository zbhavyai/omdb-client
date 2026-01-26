import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Alert, Badge, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { BROKEN_POSTER, OMDB_BASE_URL } from "../utils/constants.js";

const MovieDetails = () => {
  const apikey = import.meta.env.VITE_OMDB_API_KEY;

  const { id: imdbId } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    // start building params object
    const params = {};
    params["i"] = imdbId;
    params["plot"] = "full";

    console.debug(JSON.stringify(params));

    // add API key after logging
    params["apikey"] = apikey;

    axios
      .get(OMDB_BASE_URL, { params })
      .then((response) => {
        const resData = response.data;
        console.debug(resData);
        setData(resData);
      })
      .catch(() => {
        setData({
          Response: "False",
          Error: "Something went wrong.",
        });
      });
  }, [apikey, imdbId]);

  return (
    <React.Fragment>
      <Header />

      <Container className="custom-padding pt-5">
        <Row>
          <Col md={12}>
            {!data ? (
              <div className="d-flex justify-content-center pt-5">
                <Spinner animation="border" variant="light" />
              </div>
            ) : data["Response"] !== "True" ? (
              <Alert key="warning" variant="warning">
                {data["Error"]}
              </Alert>
            ) : (
              <Row style={{ paddingBottom: "7rem" }}>
                <Col md={4} lg={4} className="d-flex justify-content-center justify-content-md-start mb-4 ">
                  <div className="poster-wrapper">
                    <Image
                      className="rounded shadow-lg border border-secondary img-stretch poster-img"
                      src={data["Poster"] && data["Poster"].startsWith("http") ? data["Poster"] : BROKEN_POSTER}
                      alt="Movie poster"
                      onError={(e) => {
                        e.target.src = BROKEN_POSTER;
                      }}
                    />
                  </div>
                </Col>
                <Col md={8} lg={8} className="text-white ps-md-4">
                  <div className="mb-3">
                    <h1 className="fw-bold display-5 movie-details-text">{data["Title"]}</h1>
                    <div className="d-flex align-items-center gap-2 mt-2 text-secondary flex-wrap">
                      {data["Year"] && (
                        <Badge bg="warning" text="dark" className="fs-6">
                          {data["Year"]}
                        </Badge>
                      )}
                      {data["Rated"] && (
                        <span className="border border-secondary px-2 rounded small text-light">{data["Rated"]}</span>
                      )}
                      {data["Runtime"] && (
                        <span className="small text-light">
                          <i className="bi bi-clock me-1"></i>
                          {data["Runtime"]}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-4">
                    <i className="bi bi-star-fill text-warning fs-4 me-2"></i>
                    <span className="fs-4 fw-bold">{data["imdbRating"]}</span>
                    <span className="text-secondary small ms-1">/ 10</span>
                    {data["imdbVotes"] && (
                      <span className="text-secondary small ms-3">({data["imdbVotes"]} votes)</span>
                    )}
                  </div>

                  {data["Genre"] && (
                    <div className="mb-4">
                      {data["Genre"].split(", ").map((g) => (
                        <Badge key={g} bg="dark" className="border border-secondary me-2 fw-normal">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mb-4">
                    <h5 className="text-uppercase text-secondary small fw-bold ls-1">Plot</h5>
                    <p className="lead fs-6" style={{ lineHeight: "1.6" }}>
                      {data["Plot"]}
                    </p>
                  </div>

                  <Row className="mt-4 border-top border-secondary pt-4">
                    <Col sm={6} className="mb-3">
                      <h6 className="text-secondary text-uppercase small fw-bold">Director</h6>
                      <div className="fw-semibold">{data["Director"]}</div>
                    </Col>
                    <Col sm={6} className="mb-3">
                      <h6 className="text-secondary text-uppercase small fw-bold">Writer</h6>
                      <div className="fw-semibold">{data["Writer"]}</div>
                    </Col>
                    <Col sm={12} className="mb-3">
                      <h6 className="text-secondary text-uppercase small fw-bold">Cast</h6>
                      <div className="fw-semibold">{data["Actors"]}</div>
                    </Col>
                    {data["Awards"] && data["Awards"] !== "N/A" && (
                      <Col sm={12} className="mb-3">
                        <h6 className="text-secondary text-uppercase small fw-bold">Awards</h6>
                        <div className="fst-italic text-warning">
                          <i className="bi bi-trophy me-2"></i>
                          {data["Awards"]}
                        </div>
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </React.Fragment>
  );
};

export default MovieDetails;
