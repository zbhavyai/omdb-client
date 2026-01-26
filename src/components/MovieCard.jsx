import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";

const MovieCard = ({ Poster: poster, Title: title, Year: year, imdbID: imdbId }) => {
  const defaultPoster = "/no-poster.jpg";
  const posterSrc = poster && poster.startsWith("http") ? poster : defaultPoster;

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
            e.currentTarget.src = defaultPoster;
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
