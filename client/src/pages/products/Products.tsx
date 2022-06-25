import React, { useState, useRef, useEffect } from "react";
import TopBar from "../../components/header/TopBar";
import SideBar from "../../components/SideBar";
// import "../App.css";
import "../styles/Products.scss";
import Table from "../../components/table/tables";
import ProductSearchBar from "../../components/search/SearchBar";

function Products() {
  return (
    <>
      <header>
        <TopBar />
      </header>
      <div className="product-container">
        <SideBar />

        <div className="product">
          <div className="Table">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
