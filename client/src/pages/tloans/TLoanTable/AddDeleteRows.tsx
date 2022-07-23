import { useState } from "react";
import "./table.css";
function AddDeleteTableRows() {
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      fullName: "",
      emailAddress: "",
      salary: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  return (
    <div
      className="container"
      style={{ width: 10000, height: 200, overflow: "scroll" }}
    >
      <div className="row">
        <div className="col-sm-8">
          <table className="table">
            <thead>
              <tr>
                <th>Item No.</th>
                <th>Item Name</th>
                <th>Batch No.</th>
                <th>Quantity</th>
                <th>
                  <button
                    className="btn btn-outline-success"
                    onClick={addTableRows}
                  >
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {rowsData.map((data, index) => {
                const { ItemNo, ItemName, BatchNo, Quantity } = data;
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={ItemNo}
                        onChange={(e) => setItems(e.target.value)}
                        name="itemNo"
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={ItemName}
                        onChange={(evnt) => handleChange(index, evnt)}
                        name="ItemName"
                        className="form-control"
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={BatchNo}
                        onChange={(evnt) => handleChange(index, evnt)}
                        name="BatchNo"
                        className="form-control"
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={Quantity}
                        onChange={(evnt) => handleChange(index, evnt)}
                        name="Quantity"
                        className="form-control"
                      />{" "}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => deleteTableRows(index)}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
}
export default AddDeleteTableRows;
