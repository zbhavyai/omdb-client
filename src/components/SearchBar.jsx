import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const SearchBar = () => {
  const navigate = useNavigate();

  const [initialParams] = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    s: initialParams.get("s") || "",
    type: initialParams.get("type") || "",
    y: initialParams.get("y") || "",
    page: 1,
  });

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchParams["s"] === "") {
      window.alert("Search title is mandatory");
    } else {
      navigate(`/search?${createSearchString(searchParams)}`);
    }
  };

  const triggerSearchOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <Container className="custom-padding">
      <Form onSubmit={handleSearch}>
        <Row className="py-5">
          <Col lg={4} className="pb-3">
            <InputGroup>
              <InputGroup.Text className="text-light bg-secondary">Title</InputGroup.Text>
              <Form.Control
                type="text"
                className="text-warning search-input-background"
                id="filterTitle"
                onChange={(e) => setSearchParams({ ...searchParams, s: e.target.value })}
                value={searchParams["s"]}
                onKeyDown={(e) => triggerSearchOnEnter(e)}
                autoFocus
              />
            </InputGroup>
          </Col>

          <Col lg={3} className="pb-3">
            <InputGroup>
              <InputGroup.Text className="text-light bg-secondary">Year</InputGroup.Text>
              <Form.Control
                type="number"
                className="text-warning search-input-background"
                id="filterYear"
                min="1600"
                max={new Date().getFullYear() + 1}
                onChange={(e) => setSearchParams({ ...searchParams, y: e.target.value })}
                value={searchParams["y"]}
              />
            </InputGroup>
          </Col>

          <Col lg={3} className="pb-3">
            <InputGroup>
              <InputGroup.Text className="text-light bg-secondary">Type</InputGroup.Text>
              <Form.Select
                className="text-warning search-input-background"
                id="typeFilter"
                onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                value={searchParams["type"]}
              >
                <option value="">All</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
              </Form.Select>
            </InputGroup>
          </Col>

          <Col lg={2} className="pb-3">
            <div className="d-grid">
              <Button type="submit" variant="outline-warning">
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

function createSearchString(searchParams) {
  let searchString = "";

  const title = searchParams["s"];
  const type = searchParams["type"];
  const year = parseInt(searchParams["y"]) || "";
  const page = searchParams["page"];

  if (title !== undefined && title !== null && title !== "") {
    searchString += `s=${title}`;
  }

  if (type === "movie" || type === "series" || type === "episode") {
    searchString += `&type=${type}`;
  }

  if (Number.isInteger(year) && year > 0 && year < new Date().getFullYear() + 1) {
    searchString += `&y=${year}`;
  }

  if (Number.isInteger(page) && page > 0) {
    searchString += `&page=${page}`;
  }

  return searchString;
}

export default SearchBar;
