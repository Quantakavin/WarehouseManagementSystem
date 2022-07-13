import "./cards.scss";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config/config";


function ProductCard() {

// Item Details
const [ItemDetails, setItemDetails] = useState([]);

// Fetch Item Details Data 
const getitemDetails = async () => {
    const response = await axios.post(`${config.baseURL}/products`,  {
    offsetNo: 10
})
.then((response) =>
    setItemDetails(response.data))
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
            <h1 className="ItemCode"></h1>
          </div>
          <div>
            <span className="ItemName">Item Name</span>
            <h1 className="Current"></h1>
          </div>
          <div>
            <span className="Brand">Brand</span>
            <h1 className="Brand"></h1>
          </div>
          <div>
            <span className="BatchNumber">Batch Number</span>
            <h1 className="BatchNumber"></h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
