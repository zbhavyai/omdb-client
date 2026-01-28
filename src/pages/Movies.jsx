import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import MovieCard from "../components/MovieCard.jsx";
import PageNum from "../components/PageNum.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { OMDB_BASE_URL } from "../utils/constants.js";

const Movies = () => {
  const apikey = import.meta.env.VITE_OMDB_API_KEY;

  const [data, setData] = useState(null);

  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get("s");

  useEffect(() => {
    // get search parameters from URL
    const searchType = searchParams.get("type");
    const searchYear = searchParams.get("y");
    const resultPage = searchParams.get("page");

    // start building params object
    const params = {};

    if (searchTitle) {
      params["s"] = searchTitle;
    }

    if (["movie", "series", "episode"].includes(searchType)) {
      params["type"] = searchType;
    }

    if (searchYear) {
      params["y"] = searchYear;
    }

    if (resultPage) {
      params["page"] = resultPage;
    }

    console.debug(JSON.stringify(params));

    // add API key after logging
    params["apikey"] = apikey;

    axios
      .get(OMDB_BASE_URL, { params })
      .then((response) => {
        const resData = response.data;
        console.debug("Titles fetched =", resData["Search"]?.length ?? 0);

        setData({
          Response: resData["Response"],
          Search: resData["Search"] || [],
          totalResults: resData["totalResults"] ?? "0",
          Error: resData["Error"] ?? "",
        });
      })
      .catch(() => {
        setData({
          Response: "False",
          Search: [],
          totalResults: "0",
          Error: "Something went wrong.",
        });
      });
  }, [apikey, searchParams, searchTitle]);

  return (
    <React.Fragment>
      <title>{`OMDb Client | Search: ${searchTitle || "null"}`}</title>
      <Header />
      <SearchBar />

      {data?.["Response"] === "True" && <PageNum totalResults={data["totalResults"]} bottomPadding="1rem" />}

      <Container className="custom-padding">
        <Row>
          <Col xs={12}>
            {!data ? (
              <div className="d-flex justify-content-center pt-5">
                <Spinner animation="border" variant="light" />
              </div>
            ) : data["Response"] !== "True" ? (
              <Alert key="warning" variant="warning">
                {data["Error"]}
              </Alert>
            ) : (
              <Row className="pb-4">
                {data["Search"]?.map((dataItem, index) => {
                  return <MovieCard key={`${dataItem["imdbID"]}-${index}`} {...dataItem} />;
                })}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {data?.["Response"] === "True" && <PageNum totalResults={data["totalResults"]} bottomPadding={"5rem"} />}

      <Footer />
    </React.Fragment>
  );
};

export default Movies;
