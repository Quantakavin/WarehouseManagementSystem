import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { TableCell } from "@mui/material";

interface TableHeaderProps {
  header: string;
  filter: (header: string) => void;
  sortColumn: string;
  sortOrder: string;
}
const TableHeader = ({
  header,
  filter,
  sortColumn,
  sortOrder,
}: TableHeaderProps) => {
  // const sortColumn = useAppSelector(state => state.userTableFilter.sortColumn)
  // const sortOrder = useAppSelector(state => state.userTableFilter.sortOrder)
  // const sortColumn = useAppSelector(selectSortColumn)
  // const sortOrder = useAppSelector(selectSortOrder)

  const Icon = () => {
    if (sortColumn === header && sortOrder === "DESC") {
      return <ArrowDropUpIcon fontSize="small" />;
    }
    if (header !== "Action") {
      return <ArrowDropDownIcon fontSize="small" />;
    }
    return null;
  };

  // const ApplyFilter = () => {
  //   if (header !== "Action") {
  //     if (sortColumn === header && sortOrder === "DESC") {
  //       dispatch(SortAsc())
  //     } else if (sortColumn === header && sortOrder === "ASC") {
  //       dispatch(SortDesc())
  //     } else {
  //       dispatch(ChangeSortColumn({ column: header }))
  //     }
  //   }
  // }

  return (
    <TableCell
      onClick={() => filter(header)}
      sx={{ color: "#86898E", fontWeight: 500 }}
      className="tableheader"
    >
      {header} {Icon()}
    </TableCell>
  );
};

export default TableHeader;
