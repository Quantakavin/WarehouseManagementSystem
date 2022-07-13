import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDetailsCard from "../../components/cards/ProductCard";

function ProductDetails() {
  return (
    <>
      <h2 className="Table">Product Details </h2>

      <ProductDetailsCard />
    </>
  );
}

export default ProductDetails;
