import axios from "axios";
import config from "../../config/config";

async function GetLoansOverview() {
  const getCurrentTloans = await axios
    .get(`${config.baseURL}/getcurentTloans`)
    .then((response) => {
      /* eslint-disable-next-line no-console */
      console.log(response);
    });
  return getCurrentTloans;
}

export default GetLoansOverview;
