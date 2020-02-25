import React from "react";

const Pagination = ({ nextPage }) => {
  return (
    <nav aria-label="Data grid navigation">
      <ul className="pagination justify-content-end">
        <li className="page-item disabled">
          <button type="button" className="page-link" tabIndex="-1">
            Previous
          </button>
        </li>
        <li className="page-item active">
          <button type="button" className="page-link">
            1 <span className="sr-only">(current)</span>
          </button>
        </li>
        <li className="page-item">
          <button type="button" className="page-link">
            2
          </button>
        </li>
        <li className="page-item">
          <button type="button" className="page-link" onClick={nextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
