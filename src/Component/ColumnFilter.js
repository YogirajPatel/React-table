import React from "react";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="column">
      <span>
        Search:{" "}
        <input
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search Column"
          style={{ marginTop: "5px", textAlign: "center" }}
        />
      </span>
    </div>
  );
};

export default ColumnFilter;
