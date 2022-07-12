import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

export default function tloanDisplay() {
  const [details, setDetails] = useState([]);
  const [loans, setLoans] = useState([]);

  const { TLoanNumber } = useParams();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const loan = await axios.get(
        `http://localhost:5000/api/tloans/${TLoanNumber}`
      );

      setLoans(loan.data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const getData = () => {
    const html = [];

    html.push(
      loans.map((loan) => {
        const { TLoanNumber, Requestor } = loan;
        return (
          <div>
            {Requestor}
            <strong>{TLoanNumber}</strong>
          </div>
        );
      })
    );
    return html;
  };

  return <div>{getData()}</div>;
}
