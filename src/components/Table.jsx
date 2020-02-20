import React from 'react'

const Table = (props) => {
const { filteredData, isLoading, handleDelete, handleEdit } = props

    return (
        <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Species</th>
            <th scope="col">Gender</th>
            <th scope="col">Homeworld</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{isLoading? <tr><td>Loading Data...</td></tr>: (filteredData.map(data => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.name}</td>
                <td>{data.species}</td>
                <td>{data.gender}</td>
                <td>{data.homeworld}</td>
                <td>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleEdit}>
                      <i className="fa fa-pencil" aria-hidden="true" /> Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDelete}>
                      <i className="fa fa-trash-o" aria-hidden="true" /> Remove
                    </button>
                  </div>
                </td>
              </tr>
            )))}</tbody>
      </table>
    )
}

export default Table;