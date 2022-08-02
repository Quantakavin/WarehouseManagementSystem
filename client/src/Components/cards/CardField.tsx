import React from "react";

interface CardFieldProps {
  label: string;
  value: string;
}

const CardField: React.FC<CardFieldProps> = ({ label, value }) => {
  return (
    <div className="cardfield">
      <p className="cardfieldlabel">{label}</p>
      <p className="cardfieldvalue">{value}</p>
    </div>
  );
};

export default CardField;
