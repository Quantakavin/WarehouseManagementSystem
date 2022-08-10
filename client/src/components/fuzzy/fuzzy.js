import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import "./fuzzy.css";

const Fuzzy = () => {
  const [query, setQuery] = useState("");
  const [searchedData, setsearchedData] = useState([]);
  const [newProducts, setNewProducts] = useState("");
  const navigate = useNavigate();

  const { addItem, totalItems } = useCart();

  useEffect(async () => {
    const products = await axios.get(
      `https://peaceful-garden-23768.herokuapp.com/api/product-management/product/browse`
    );

    const newProducts = products.data.map(
      ({ product_id, product_name, price, img, category_name }) => ({
        id: product_id,
        name: product_name,
        price,
        img,
        category: category_name,
      })
    );
    // console.log(newProducts)
    setNewProducts(newProducts);
  }, []);

  useEffect(() => {
    const fuse = new Fuse(newProducts, {
      keys: ["name", "price", "img", "category"],
      includeScore: true,
    });
    const results = fuse.search(query);
    const productsResults = results
      .filter((result) => {
        return result.score < 0.25;
      })
      .map((value) => value.item);

    // console.log(productsResults)
    setsearchedData(productsResults);
    // query.length > 0 ? productsResults : newProducts
  }, [query]);

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  return (
    <div>
      <Navbar
        style={{
          background: "#ffa500",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ color: "white", marginLeft: 20 }}>Burger Tech</h3>

        <div className="cartButton">
          <button className="viewCart" onClick={() => navigate(`/cart`)}>
            <BsCart3 />
            {totalItems}
          </button>
        </div>
      </Navbar>
      <br />
      <main>
        <aside>
          <form>
            <input type="text" placeholder="Search" onChange={handleOnSearch} />
          </form>
        </aside>
        <ul className="searchProducts">
          {searchedData.length > 0 &&
            searchedData.map((product) => {
              const { id, img, name, price } = product;
              return (
                <div className="col-5 searchProduct" key={id}>
                  <ul>
                    <img
                      className="fuzzyImage"
                      src={img}
                      alt=""
                      style={{ marginLeft: -35 }}
                    />
                    <li style={{ marginLeft: -35 }}>
                      <strong>{name}</strong>
                    </li>

                    <li style={{ marginLeft: -35 }}>
                      <strong>${price}</strong> <br />
                      <button className="add" onClick={() => addItem(product)}>
                        Add to Cart
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
        </ul>
      </main>
    </div>
  );
};
export default Fuzzy;
