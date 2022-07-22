import React from "react";
import BasicTable from "../../components/table/Table";
import SideBar from "../../components/sidebar/SideBar";
import CreateRMA from "../../components/createForms/rmaForm";
function rma() {
  return (
    <div>
      {/* <SideBar/> */}
      <CreateRMA />
    </div>
  );
}

export default rma;
