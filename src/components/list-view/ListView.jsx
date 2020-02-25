import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Table from "../Table";
import Pagination from "../Pagination";

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

const ListView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageLimit, setPageLimit] = useState(10);

  // Get list items from api
  const getListItems = async currentPage => {
    setIsLoading(true);
    try {
      let response = await fetch(
        "http://localhost:3000/characters?_page1=&_limit=10"
      );
      const finalResponse = await response.json();
      setData(finalResponse);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong! Try again");
    }
  };

  //Get list items on first render
  useEffect(() => {
    getListItems();
  }, []);

  // const nextPage = async () => {
  //   setCurrentPage(currentPage + 1);
  //   console.log(currentPage);
  //   getListItems(currentPage);
  // };

  // Search request from API
  const onChange = async value => {
    setIsLoading(true);
    await fetch(`http://localhost:3000/characters?q=${value}`)
      .then(res => res.json())
      .then(res => setData(res));
    setIsLoading(false);
  };
  // Debounce search request
  const debounceOnChange = useCallback(debounce(onChange, 200), []);

  const handleEdit = id => {
    alert("I want to edit");
  };

  // Delete list item
  const handleDelete = async id => {
    try {
      await fetch(`http://localhost:3000/characters/${id}`, {
        method: "DELETE"
      }).then(res => res.json());
      alert("Character Deleted Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h1>List View</h1>

      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="searchInput" className="sr-only">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search..."
              onChange={e => debounceOnChange(e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-6 text-sm-right">
          <Link
            to="/add-character"
            type="button"
            className="btn btn-primary mb-3">
            Add New
          </Link>
        </div>
      </div>

      <Table
        filteredData={data}
        isLoading={isLoading}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <Pagination />
    </Fragment>
  );
};

export default ListView;
