import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import Table from "../Table";

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait)
    }
  }


const ListView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  

      

  const getListItems = async () => {
    setIsLoading(true);
    try {
      let response = await fetch('http://localhost:3000/characters?+&_limit=10');
      const finalResponse = await response.json();
      setData(finalResponse);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong! Try again");
    }
  };

  // const getNextTen = async () => {
  //   setIsLoading(true);
  //   try {
  //     let response = await fetch('http://localhost:3000/characters?+&_limit=10');
  //     const finalResponse = await response.json();
  //     setListItems(finalResponse);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     alert("Something went wrong! Try again");
  //   }
  // }

  useEffect(() => {
    getListItems();
  }, []);

  const onChange = value => {
    fetch(`http://localhost:3000/characters?q=${value}`).then(res =>res.json()).then(res => setData(res))
   }

   const debounceOnChange = useCallback(debounce(onChange, 200), []);

  // let filteredData = !search
  // ? listItems
  // : listItems.filter(data => data.name.toLowerCase().includes(search.toLowerCase()))

  
  const handleEdit = id => {
    alert("I want to edit");
  };

  const handleDelete = id => {
    alert("I want to delete");
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
          <Link to='/add-character' type="button" className="btn btn-primary mb-3">
            Add New
          </Link>
        </div>
      </div>

     <Table filteredData={data} isLoading={isLoading} handleDelete={handleDelete} handleEdit={handleEdit} />

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
            <button type="button" className="page-link">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default ListView;
