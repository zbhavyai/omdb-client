import React from "react";
import { useSearchParams } from "react-router-dom";
import { Col, Container, Pagination, Row } from "react-bootstrap";

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
        isCurrent: i === currentPage,
      });
    }
  } else {
    // push first page
    pageList.push({
      value: 1,
      key: 1,
      isCurrent: 1 === currentPage,
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
        isCurrent: i === currentPage,
      });
    }

    let rightIndex = rightLogic > pagingWindow ? currentPage + 2 + rightDelta : n - 1;

    // populate right half
    for (let i = currentPage + 1; i <= rightIndex; i++) {
      pageList.push({
        value: i,
        key: i,
        isCurrent: i === currentPage,
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
      isCurrent: n === currentPage,
    });
  }

  const handleUpdatePage = (value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  return (
    <Container className="custom-padding" style={{ paddingBottom: props["bottomPadding"] }}>
      <Row>
        <Col md={12}>
          <Pagination className="justify-content-center pt-4">
            {pageList.map((e) => {
              if (e.value === "..") {
                return <Pagination.Ellipsis key={e.key} disabled linkClassName="bg-dark text-light border-light" />;
              }
              return (
                <Pagination.Item
                  key={e.key}
                  active={e.isCurrent}
                  onClick={() => handleUpdatePage(e.value)}
                  linkClassName={e.isCurrent ? "bg-warning text-dark border-light" : "bg-dark text-light border-light"}
                >
                  {e.value}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNum;
