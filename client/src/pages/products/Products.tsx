import React, { useState, useRef, useEffect } from "react";
import TopBar from "../../components/header/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import axios from "axios";
// import "../App.css";
import "../../styles/Products.scss";
import Table from "../../components/table/Table";
//import ProductSearchBar from "../../components/search/SearchBar";

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
    // { heading: "Action", value: ":" },
  ];

  return (
    <>
      <div className="product-container">
        <div className="product">
          <div className="Table">
           <Table data={dataTable} column={column} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
