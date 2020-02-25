import React, { useState, useEffect } from "react";

const AddCharacter = props => {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState([]);

  // Get list items from API
  const getListItems = async () => {
    try {
      let response = await fetch(
        "http://localhost:3000/characters?+&_limit=10"
      );
      const finalResponse = await response.json();
      setData(finalResponse);
    } catch (err) {
      console.log(err);
      alert("Something went wrong! Try again");
    }
  };

  useEffect(() => {
    getListItems();
  }, []);

  // Manage inputs of the form
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
    console.log(inputs);
  };

  // Handles form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      }).then(res => res.json());
      alert("Character Added Successfully");
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3>Add New Character</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="validationServer01">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationServer01"
                  name="name"
                  placeholder="Name"
                  defaultValue={inputs.name}
                  onChange={handleInputChange}
                  required
                />
                {/* <div className="valid-feedback">Looks good!</div> */}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="validationServer03">
                  Species <span className="text-primary">*</span>
                </label>
                <select
                  required
                  className="file-form-control col-md-10 form-control"
                  name="species"
                  value={inputs.species}
                  onChange={handleInputChange}>
                  <option value="Choose One">Choose One</option>
                  {data ? (
                    data.map(item => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option value="nodata">No data</option>
                  )}
                </select>
                <div className="invalid-feedback">Please choose a species.</div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 my-2">
                <label htmlFor="validationServer03" className="mx-2">
                  Gender <span className="text-primary">*</span>
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio1"
                    value="Male"
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio2"
                    value="Female"
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio3"
                    value="n/a"
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    n/a
                  </label>
                </div>
                <div className="invalid-feedback">Please choose one.</div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="validationServer03">Homeworld</label>
                <input
                  type="text"
                  className="form-control"
                  id="validationServer03"
                  name="homeworld"
                  placeholder="Homeworld"
                  defaultValue={inputs.homeworld}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCharacter;
