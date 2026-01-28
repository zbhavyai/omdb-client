import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { BROKEN_POSTER } from "../utils/constants.js";

const MovieCard = ({ Poster: poster, Title: title, Year: year, imdbID: imdbId, Type: type }) => {
  const posterSrc = poster && poster.startsWith("http") ? poster : BROKEN_POSTER;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/details/${imdbId}`);
  };

  return (
    <Col sm={6} md={4} lg={3} className="d-flex justify-content-center p-3">
      <Card className="custom-card h-100 shadow-sm border-0 overflow-hidden">
        <div className="img-wrapper">
          <Card.Img
            className="card-img-top img-stretch"
            src={posterSrc}
            alt={title}
            onError={(e) => {
              e.currentTarget.src = BROKEN_POSTER;
            }}
          />
        </div>
        <Card.Body className="info-overlay d-flex flex-column justify-content-center align-items-center text-center">
          {type && (
            <span className="badge bg-warning text-dark mb-2 text-uppercase" style={{ fontSize: "0.7rem" }}>
              {type}
            </span>
          )}
          <h5 className="text-white fw-bold mb-1 overflowing-text px-2">{title}</h5>
          <p className="text-light mb-3 small">{year}</p>
          <Button variant="outline-light" size="sm" className="rounded-pill px-4" onClick={handleNavigate}>
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MovieCard;
