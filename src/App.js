import "./App.css";
import * as React from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "./Column";
import GlobalFilter from "./GlobalFilter";

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const tableData = React.useMemo(() => data?.continents || [], [data]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) => row.name,
      },
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Currencies",
        accessor: (row) =>
          row.countries
            .map((country) => country.currencies.flat().join(", "))
            .join(", "),
      },

      {
        Header: "Emoji Unicode",
        accessor: "countries.emojiU",
      },
      {
        Header: "AWS Region",
        accessor: (row) =>
          row.countries.map((country) => country.awsRegion).join(", "),
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
  } = useTable({ columns, data: tableData }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="App">
      <div className="container">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "\u2193"
                          : "\u2191"
                        : " "}
                    </span>
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
  );
}

export default App;
