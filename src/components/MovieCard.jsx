import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { BROKEN_POSTER } from "../utils/constants.js";

const MovieCard = ({ Poster: poster, Title: title, Year: year, imdbID: imdbId }) => {
  const posterSrc = poster && poster.startsWith("http") ? poster : BROKEN_POSTER;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/details/${imdbId}`);
  };

  return (
    <Col sm={6} md={3} className="d-flex justify-content-center p-4">
      <Card className="custom-card darker-background info-overlay-wrapper">
        <Card.Img
          className="card-img-top img-stretch"
          src={posterSrc}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = BROKEN_POSTER;
          }}
        />
        <Card.Body className="info-overlay text-center overflow-hidden">
          <Card.Title className="text-white my-1 overflowing-text">{title}</Card.Title>
          <Card.Text className="text-white py-3">{year}</Card.Text>
          <Button className="btn-warning" onClick={handleNavigate}>
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MovieCard;
