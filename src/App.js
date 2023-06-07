import "./App.css";
import * as React from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "./Column";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const tableData = React.useMemo(() => data?.continents || [], [data]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) => row.name,
        Filter: ColumnFilter,
      },
      {
        Header: "Code",
        accessor: "code",
        Filter: ColumnFilter,
      },
      {
        Header: "Currencies",
        accessor: (row) =>
          row.countries
            .map((country) => country.currencies.flat().join(", "))
            .join(", "),
        Filter: ColumnFilter,
      },

      {
        Header: "Emoji Unicode",
        accessor: (row) =>
          row.countries.map((country) => country.emojiU).join(", "),
        Filter: ColumnFilter,
      },
      {
        Header: "AWS Region",
        accessor: (row) =>
          row.countries.map((country) => country.awsRegion).join(", "),
        Filter: ColumnFilter,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data: tableData },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="App">
        <div className="container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "\u2193"
                            : "\u2191"
                          : " "}
                      </span>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
