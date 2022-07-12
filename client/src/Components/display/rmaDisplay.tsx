import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

export default function rmaDisplay() {
  const [details, setDetails] = useState([]);
  const [rma, setRma] = useState([]);

  const { RMANo } = useParams();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const rma = await axios.get(
        `http://localhost:5000/api/RMADetails/${RMANo}`
      );

      setRma(rma.data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const getData = () => {
    const html = [];
    console.log(rma);

    html.push(
      rma.map((rma) => {
        const {
          ContactPerson,
          CustomerEmail,
          Company,
          ContactNo,
          ItemCode,
          InvoiceNo,
          DoNo,
          DateOfPurchase,
          ReturnReason,
          Instructions,
          CourseOfAction,
          ProductID,
          Quantity,
        } = rma;
        return (
          <div>
            {ContactPerson}
            <br />
            <strong>{CustomerEmail}</strong>
            <br />
            <strong>{Company}</strong>
            <br />
            <strong>{ContactNo}</strong>
            <br />
            <strong>{ItemCode}</strong>
            <br />
            <strong>{InvoiceNo}</strong>
            <br />
            <strong>{DoNo}</strong>
            <br />
            <strong>{ReturnReason}</strong>
            <br />
            <strong>{DateOfPurchase}</strong>
            <br />
            <strong>{Instructions}</strong>
            <br />
            <strong>{CourseOfAction}</strong>
            <br />
            <strong>{ProductID}</strong>
            <br />
            <strong>{Quantity}</strong>
          </div>
        );
      })
    );
    return html;
  };

  return <div>{getData()}</div>;
}
