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
        style={{
          border: "1px solid",
          color: "black",
          borderRadius: "5px",
          padding: "4px",
        }}
      />
    </span>
  );
};

export default GlobalFilter;
