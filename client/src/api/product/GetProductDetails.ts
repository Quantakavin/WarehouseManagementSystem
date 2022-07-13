import axios from "axios";
import config from "../../config/config";

async function GetProductDetails(binProductPK) {
  const result = await axios
    .get(`${config.baseURL}/products/`, binProductPK,)
    .then((result) => result.data);
  return result;
}

export default GetProductDetails;