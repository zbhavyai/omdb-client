import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { BROKEN_POSTER, OMDB_BASE_URL } from "../utils/constants.js";

const MovieDetails = () => {
  const apikey = import.meta.env.VITE_OMDB_API_KEY;

  const { id: imdbId } = useParams();

  const [data, setData] = useState({});

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

      <Container className="custom-padding pt-4">
        <Row>
          <Col className="col-12">
            {data["Response"] !== "True" ? (
              <Alert key="warning" variant="warning">
                {data["Error"]}
              </Alert>
            ) : (
              <Row className="row" style={{ paddingBottom: "7rem" }}>
                <Col md={4} className="pt-3">
                  <Card className="custom-card darker-background">
                    <Card.Img
                      className="img-stretch"
                      src={data["Poster"].startsWith("http") ? data["Poster"] : BROKEN_POSTER}
                      alt="Movie poster"
                      onError={(e) => {
                        e.target.src = BROKEN_POSTER;
                      }}
                    />
                  </Card>
                </Col>
                <Col md={8} className="text-white pt-3">
                  <h1 className="fw-bold movie-details-text">{data["Title"]}</h1>
                  <h3 className="fw-bold pt-3">{data["Year"]}</h3>
                  <h4 className="fw-bold">{data["Genre"]}</h4>
                  <h4 className="pt-3">
                    {data["imdbRating"]}/10
                    <i className="bi bi-star-fill text-warning mx-3"></i>
                  </h4>
                  <h6 className="pt-3">
                    Director: <span className="text-secondary mx-3">{data["Director"]}</span>
                  </h6>
                  <h6 className="pt-2">
                    Top Cast: <span className="text-secondary mx-3">{data["Actors"]}</span>
                  </h6>
                  <p className="pt-4">{data["Plot"]}</p>
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
