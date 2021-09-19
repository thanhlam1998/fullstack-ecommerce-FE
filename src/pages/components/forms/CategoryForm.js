import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => {
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          onChange={onNameChange}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );
};

export default CategoryForm;
