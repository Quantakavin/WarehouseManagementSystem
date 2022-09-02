import { TableCell, TableRow } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

interface SkeletonProps {
  NoOfCols: number;
}

const TableSkeleton: React.FC<SkeletonProps> = ({ NoOfCols }) => {
  const skeletonrows = [...Array(5)].map((value, index) => (
    <TableRow
      key={index} // eslint-disable-line react/no-array-index-key
    >
      <TableCell colSpan={NoOfCols}>
        <Skeleton
          variant="rectangular"
          height={18}
          sx={{ marginBottom: "5px", marginTop: "5px" }}
        />
      </TableCell>
    </TableRow>
  ));

  return <div>{skeletonrows}</div>;
};

export default TableSkeleton;
