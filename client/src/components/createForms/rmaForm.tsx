import React, { useState } from "react";
import MaterialTable from "@material-table/core";

export default function CreateRMA() {
    
  const [columns, setColumns] = useState([
    { title: "Item Code", field: "itemcode" },
    { title: "Invoice Number", field: "invoiceno" },
    { title: "D.O Number", field: "dono" },
    { title: "Date Of Purchase", field: "dop" },
    { title: "Reason For Return", field: "ror" },
    { title: "Instructions", field: "ins" },
    { title: "Course Of Action", field: "coa" },
  ]);

  const [data, setData] = useState([]);

  return (
    <MaterialTable
      title="Product List"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          })
      }}
    />
  );
}
