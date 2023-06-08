import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className="global">
      Search :{" "}
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="input"
        placeholder="Search Globally"
      />
    </span>
  );
};

export default GlobalFilter;
