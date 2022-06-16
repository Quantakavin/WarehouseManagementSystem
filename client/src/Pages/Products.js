import { useState } from "react";
import "../Styles/styles.css";

export default function Products() {
  const [query, setQuery] = useState("");

  return (
    <div className="Products">
      <h1> Item Search </h1>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
}
