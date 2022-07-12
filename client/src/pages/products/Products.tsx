import React, { useState, useRef, useEffect } from "react";
import "../../styles/Products.scss";
import axios from "axios";
import TopBar from "../../components/header/TopBar";
import SideBar from "../../components/sidebar/SideBar";
// import "../App.css";
import "../../styles/Products.scss";
import Table from "../../components/table/Table";
// import SearchBar from "material-ui-search-bar";
// import ProductSearchBar from "../../components/search/SearchBar";

const Products = () => {
  const [dataTable, setDataTable] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/products", {
        offsetNo: 10,
      })
      .then((response) => setDataTable(response.data))
      .catch((error) => console.log(error));
  }, []);

  const column = [
    { value: "BinProductPK" },
    { heading: "Item Name", value: "ItemName" },
    { heading: "Batch Number", value: "BatchNo" },
    { heading: "Brand", value: "Brand" },
    { heading: "Available Quantity", value: "Quantity" },
    { heading: "Action", value: ":" },
  ];

  // Search Rows filter by Item Name and Branc
  function search(rows) {
    return rows.filter(
      (row) =>
        row.ItemName.toLowerCase().indexOf(q) > -1 ||
        row.Brand.toLowerCase().indexOf(q) > -1
    );
  }

  return (
    <div className="product-container">
      <div className="product">
        <div className="Table">
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />

          <Table data={search(dataTable)} column={column} />
        </div>
      </div>
    </div>
  );
};

export default Products;
