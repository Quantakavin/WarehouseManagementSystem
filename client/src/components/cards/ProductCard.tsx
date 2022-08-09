import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config/config";
import "../../styles/cards.scss";

const ProductCard = () => {
  // Item Details
  const [ItemDetails, setItemDetails] = useState([]);

  // Fetch Item Details Data
  const getitemDetails = async () => {
    const response = await axios
      .get(`${config.baseURL}/testproducts`, {
        // offsetNo: 10
      })
      .then((response) => setItemDetails(response.data));
  };

  useEffect(() => {
    getitemDetails();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Item Details </span>
        <div>
          <div>
            <span className="ItemCode">Item Code</span>
            <h1 className="ItemCode">{ItemDetails}</h1>
          </div>
          <div>
            <span className="ItemName">Item Name</span>
            <h1 className="Current" />
          </div>
          <div>
            <span className="Brand">Brand</span>
            <h1 className="Brand" />
          </div>
          <div>
            <span className="BatchNumber">Batch Number</span>
            <h1 className="BatchNumber" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
