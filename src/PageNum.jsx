import React from "react";
import { useSearchParams } from "react-router-dom";

const PageNum = (props) => {
  const n = props["totalResults"] === undefined ? 1 : Math.ceil(props["totalResults"] / 10);
  const pagingSize = 9; // should be kept as odd

  const [searchParams, setSearchParams] = useSearchParams();

  let pageList = [];

  const currentPage = Number(searchParams.get("page")) || 1;

  if (n <= pagingSize) {
    for (let i = 1; i <= n; i++) {
      pageList.push({
        value: i,
        key: i,
        isCurrent: i === currentPage ? true : false,
      });
    }
  } else {
    // push first page
    pageList.push({
      value: 1,
      key: 1,
      isCurrent: 1 === currentPage ? true : false,
    });

    let pagingWindow = Math.floor(pagingSize / 2);

    let leftDelta = Math.min(n - currentPage - pagingWindow, 0);
    let leftLogic = currentPage - pagingWindow;

    let rightDelta = Math.max(pagingWindow + 1 - currentPage, 0);
    let rightLogic = n - currentPage;

    // push if left ellipsis are needed
    if (leftLogic > 1) {
      pageList.push({
        value: "..",
        key: "<--",
        isCurrent: false,
      });
    }

    let leftIndex = leftLogic <= 1 && leftLogic <= pagingWindow ? 2 : leftLogic + 2 + leftDelta;

    // populate left half including current page
    for (let i = leftIndex; i <= currentPage; i++) {
      if (i === n) {
        continue;
      }

      pageList.push({
        value: i,
        key: i,
        isCurrent: i === currentPage ? true : false,
      });
    }

    let rightIndex = rightLogic > pagingWindow ? currentPage + 2 + rightDelta : n - 1;

    // populate right half
    for (let i = currentPage + 1; i <= rightIndex; i++) {
      pageList.push({
        value: i,
        key: i,
        isCurrent: i === currentPage ? true : false,
      });
    }

    // push if right ellipsis is needed
    if (currentPage + pagingWindow < n) {
      pageList.push({
        value: "..",
        key: "-->",
        isCurrent: false,
      });
    }

    // push last page
    pageList.push({
      value: n,
      key: n,
      isCurrent: n === currentPage ? true : false,
    });
  }

  const handleUpdatePage = (e) => {
    searchParams.set("page", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="container custom-padding" style={{ paddingBottom: props["bottomPadding"] }}>
      <div className="row">
        <div className="col-12">
          <nav aria-label="page navigation" className="pt-4">
            <ul className="pagination justify-content-center">
              {pageList.map((e) => {
                return (
                  <li className="page-item" key={e["key"]}>
                    {e["isCurrent"] ? (
                      <button
                        className="page-link bg-warning text-dark header-font"
                        onClick={handleUpdatePage}
                        value={e["value"]}
                      >
                        {e["value"]}
                      </button>
                    ) : e["value"] === ".." ? (
                      <div className="page-link bg-dark text-light header-font">{e["value"]}</div>
                    ) : (
                      <button
                        className="page-link bg-dark text-light header-font"
                        onClick={handleUpdatePage}
                        value={e["value"]}
                      >
                        {e["value"]}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageNum;
