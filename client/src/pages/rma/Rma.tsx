import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import Rmatabs from "../../components/tabs/RmaTabs";

function rma() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChangeTab({ currenttab: "RMA" }));
  }, []);

  return (
    <div>
      {/* <SideBar/> */}
      <Rmatabs />
    </div>
  );
}

export default rma;
