import React from "react";
import axios from "axios";
import "../table/testtable.scss";

const TestTable = ({ data, column }) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem item={item} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow item={item} column={column} />
        ))}
      </tbody>
    </table>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      if (columnItem.value.includes(".")) {
        const itemSplit = columnItem.value.split("."); //['address', 'city']
        return <td>{item[itemSplit[0]][itemSplit[1]]}</td>;
      }

      return <td>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default TestTable;
