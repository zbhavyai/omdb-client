import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    <div className="darker-background">
      <div className="container custom-padding">
        <form onSubmit={handleSearch}>
          <div className="row py-5">
            <div className="col-lg-4 mb-3">
              <div className="input-group">
                <span className="input-group-text text-light bg-secondary">Title</span>
                <input
                  type="text"
                  className="form-control text-warning search-input-background"
                  id="filterTitle"
                  onChange={(e) => setSearchParams({ ...searchParams, s: e.target.value })}
                  value={searchParams["s"]}
                  onKeyDown={(e) => triggerSearchOnEnter(e)}
                  autoFocus
                />
              </div>
            </div>

            <div className="col-lg-3 mb-3">
              <div className="input-group">
                <span className="input-group-text text-light bg-secondary">Year</span>
                <input
                  type="number"
                  className="form-control text-warning search-input-background"
                  id="filterYear"
                  min="1600"
                  max={2023}
                  maxLength="250"
                  onChange={(e) => setSearchParams({ ...searchParams, y: e.target.value })}
                  value={searchParams["y"]}
                />
              </div>
            </div>

            <div className="col-lg-3 mb-3">
              <div className="input-group">
                <span className="input-group-text text-light bg-secondary">Type</span>
                <select
                  className="form-control form-select text-warning search-input-background"
                  id="typeFilter"
                  onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                  value={searchParams["type"]}
                >
                  <option value="">All</option>
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
                  <option value="episode">Episode</option>
                </select>
              </div>
            </div>

            <div className="col-lg-2 mb-3">
              <div className="d-grid">
                <button type="submit" className="btn btn-outline-warning btn-dark">
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
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
