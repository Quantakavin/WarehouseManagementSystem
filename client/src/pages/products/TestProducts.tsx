import React, { useState, useRef, useEffect } from "react";
import "../../styles/Products.scss";
import TopBar from "../../components/header/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import axios from "axios";
// import "../App.css";
import "../../styles/Products.scss";
import Table from "../../components/table/Table";
// import SearchBar from "material-ui-search-bar";
//import ProductSearchBar from "../../components/search/SearchBar";

function Products() {
  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemPerPage] = useState(10);
  const [q, setQ] = useState("");


  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(dataTable.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataTable.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    return (
      <li key={number} id={number} onClick={handleClick}>
        {number}
      </li>
    );
  });



  useEffect(() => {
    axios
      .post("http://localhost:5000/api/products", {
        offsetNo: 0,
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
    <>
      <div className="product-container">
        <div className="product">
          <div className="Table">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <Table data={search(currentItems)} column={column} />
            <ul className="pageNumbers">{renderPageNumbers}</ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
