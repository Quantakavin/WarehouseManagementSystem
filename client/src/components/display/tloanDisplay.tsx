import React from 'react'

import { useParams } from "react-router-dom";

function tloanDisplay() {
    let { TLoanNumber } = useParams();
  return (
    <div>{TLoanNumber}</div>
  )
}

export default tloanDisplay