import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className="global">
      Search:{' '}
      <input
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default GlobalFilter;
