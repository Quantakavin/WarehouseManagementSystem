import React, { useState, useRef, useEffect } from "react";
import TopBar from "../../components/header/TopBar";
import SideBar from "../../components/SideBar";
// import "../App.css";
import "../../styles/Products.scss";
// import Table from "../../components/table/tables";
// import ProductSearchBar from "../../components/search/SearchBar";
import TestTable from "../../components/table/testtable";
import axios from "axios";


function Products() {

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
  ];

  return (
    <>
      <div className="product-container">
        <SideBar />

        <div className="product">
          <div className="Table">
           <TestTable data={dataTable} column={column} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
