import React, { useState, useRef, useEffect } from "react";
import TopBar from "../../components/header/TopBar";
import SideBar from "../../components/SideBar";
import axios from "axios";
// import "../App.css";
import "../../styles/Products.scss";
import TestTable from "../../components/table/testtable";
import ProductSearchBar from "../../components/search/SearchBar";

function TestProducts() {
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/api/products")
      .then((res) => setDataTable(res.data))
      .catch((err) => console.log(err));
  }, []);

  const column = [
    { heading: "Item Name", value: "ItemName" },
    { heading: "Batch Number", value: "BatchNo" },
    { heading: "Brand", value: "Brand" },
    { heading: "Available Quantity", value: "Quantity" },
    { heading: "Available Quantity", value: "Quantity" },
  ];

  return (
    <div className="App">
      <TestTable data={dataTable} column={column} />
    </div>
  );
}

export default TestProducts;
