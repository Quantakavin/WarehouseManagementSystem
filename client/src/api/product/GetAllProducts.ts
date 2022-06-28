import axios from "axios";
import config from "../../config/config";

async function GetAllProducts() {
  const result = await axios
    .get(`${config.baseURL}/products`)
    .then(result => result.data);
  return result;
};

export default GetAllProducts;