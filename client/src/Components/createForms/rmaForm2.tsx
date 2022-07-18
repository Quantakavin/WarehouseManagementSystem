import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MaterialTable from "@material-table/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

// interface FormValues {
//   customername: string;
//   customeremail: string;
//   company: number;
//   contactno: number;
// }

// export default function CreateRMA() {
//   const navigate = useNavigate();

//   const columns = [
//     { title: "Item Code", field: "itemcode" },
//     { title: "Invoice Number", field: "invoiceno" },
//     { title: "D.O Number", field: "dono" },
//     { title: "Date Of Purchase", field: "dop" },
//     { title: "Reason For Return", field: "ror" },
//     { title: "Instructions", field: "ins" },
//     { title: "Course Of Action", field: "coa" },
//   ];

//   const [tableData, setTableData] = useState([
//     {
//       itemcode: "",
//       invoiceno: "",
//       dono: "",
//       dop: "",
//       ror: "",
//       ins: "",
//       coa: "",
//     },
//   ]);

//   return (
//     <Card
//       sx={{
//         width: 1000,
//         height: 1000,
//         marginLeft: "auto",
//         marginRight: "auto",
//       }}
//     >
//       <CardContent>
//         <MaterialTable
//           title="Product List"
//           columns={columns}
//           data={tableData}
//           options={{
//             sorting: true,
//             search: true,
//             searchFieldAlignment: "right",
//             filtering: true,
//             paging: true,
//             pageSizeOptions: [5, 10, 20, 50, 100],
//             pageSize: 5,
//             paginationType: "stepped",
//             showFirstLastPageButtons: true,
//           }}
//           editable={{
//             onRowAdd: (newRow) =>
//               new Promise<void>((resolve, reject) => {
//                 setTimeout(() => {
//                   setTableData([...tableData, newRow]);

//                   resolve();
//                 }, 1000);
//               }),
//             onRowUpdate: (newRow, oldRow) =>
//               new Promise<void>((resolve, reject) => {
//                 setTimeout(() => {
//                   const updatedData = [...tableData];
//                   updatedData[oldRow.tableData.id] = newRow;
//                   setTableData(updatedData);

//                   resolve();
//                 }, 1000);
//               }),
//             onRowDelete: (selectedRow) =>
//               new Promise<void>((resolve, reject) => {
//                 setTimeout(() => {
//                   const updatedData = [...tableData];
//                   updatedData.splice(selectedRow.tableData.id, 1);
//                   setTableData(updatedData);

//                   resolve();
//                 }, 1000);
//               }),
//           }}
//         />
//       </CardContent>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           paddingTop: 3,
//         }}
//       >
//         <Button size="small" onClick={() => navigate("/rma")}>
//           Back
//         </Button>
//       </Box>
//     </Card>
//   );
// }

export default function CreateRMA() {
  const [tableData, setTableData] = useState([
        {
      itemcode: "testcode",
      invoiceno: "testno",
      dono: "testno",
      dop: "25/09/2003",
      ror: "sucks",
      ins: "throw",
      coa: "thrown",
    },
  ]);
  const columns = [
    { title: "Item Code", field: "itemcode" },
    { title: "Invoice Number", field: "invoiceno" },
    { title: "D.O Number", field: "dono" },
    { title: "Date Of Purchase", field: "dop" },
    { title: "Reason For Return", field: "ror" },
    { title: "Instructions", field: "ins" },
    { title: "Course Of Action", field: "coa" },
  ];

  return (
    <MaterialTable
      columns={columns}
      data={tableData}
      editable={{
        onRowAdd:(newRow)=>new Promise((resolve, reject)=>{
          console.log(newRow)
          setTableData([...tableData, newRow])
          setTimeout(()=>resolve(), 500)
        }),
        onRowUpdate:(newRow, oldRow)=>new Promise((resolve, reject)=>{
          console.log(newRow, oldRow)
          const updatedData=[...tableData]
          updatedData[oldRow.tableData.id]=newRow
          setTableData(updatedData)
          setTimeout(()=>resolve(), 500)
        }),
        onRowDelete:(selectedRow)=>new Promise((resolve, reject)=>{
          console.log(selectedRow)
          const updatedData=[...tableData]
          updatedData.splice(selectedRow.tableData.id, 1)
          setTableData(updatedData)
          setTimeout(()=>resolve(), 1000)
        })
      }}
      options={{
        sorting: true,
        search: true,
        searchFieldAlignment: "right",
        filtering: true,
        paging: true,
        pageSizeOptions: [5, 10, 20, 50, 100],
        pageSize: 5,
        paginationType: "stepped",
        showFirstLastPageButtons: true,
      }}
      title="Products List"
    />
  );
}
