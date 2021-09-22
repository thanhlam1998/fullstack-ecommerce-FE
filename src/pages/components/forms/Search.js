import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { actionTypes } from "../../../actions/types";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="d-flex align-items-center my-2" onSubmit={handleSubmit}>
      <input
        type="search"
        value={text}
        onChange={handleChange}
        className="form-control me-sm-2"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
