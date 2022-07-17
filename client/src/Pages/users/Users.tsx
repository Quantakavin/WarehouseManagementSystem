import React, { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PageviewIcon from "@mui/icons-material/Pageview";
import { GetAllUsers, GetUsernames } from "../../api/UserDB";
import SearchBarUpdated from "../../components/search/SearchBarUpdated";
import InfiniteTable from "../../components/table/InfiniteTable";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectSortColumn,
  selectSortOrder,
  ChangeSortColumn,
  SortAsc,
  SortDesc,
} from "../../app/reducers/UserTableFilterSlice";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Hidden } from "@mui/material";
import { useNavigate } from "react-router";
import useDebounce from "../../hooks/useDebounce";

const Users: React.FC = () => {
  const sortColumn = useAppSelector(selectSortColumn);
  const sortOrder = useAppSelector(selectSortOrder);
  const navigate = useNavigate();
  const [searchOptions, setSearchOptions] = useState<string[]>([])
  const [inputName, setInputName] = useState<string>(null);
  const [searchName, setSearchName] = useState<string>('');
  const debouncedValue = useDebounce<string>(inputName, 500)


  const dispatch = useAppDispatch();

  const handleSearch = (stringtosearch: string) => {
    if (inputName === "") {
      setSearchName('')
    } else {
      setSearchName(stringtosearch)
    }
  }

  const handleInputChange = (inputstring: string) => {
    setInputName(inputstring)
  }

  const headers = [
    "ID",
    "Username",
    "Email Address",
    "Company",
    "User Group",
    "Phone No",
    "Action",
  ];

  const UsernamesQuery = useQuery(
    [`usernames`, debouncedValue],
    () => GetUsernames(debouncedValue),
    {
      onSuccess: (data) => {
        const namearray = data.data.map((record) => {
          return record.Name
        })
        setSearchOptions(namearray)
      }
    }
  );

  const UsersQuery = useInfiniteQuery(
    [`users`, sortColumn, sortOrder, searchName],
    GetAllUsers,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );

  const ActionMenu = (id: string) => {
    return [
      {
        name: "View Details",
        url: `/user/${id}`,
        icon: <PageviewIcon fontSize="small" />,
        delete: false,
      },
      {
        name: "Edit Details",
        url: `/edituser/${id}`,
        icon: <ModeEditOutlineIcon fontSize="small" />,
        delete: false,
      },
      {
        name: "Delete",
        icon: <DeleteOutlineIcon fontSize="small" />,
        delete: true,
      },
    ];
  };

  const ApplyFilter = (header: string) => {
    if (header !== "Action") {
      if (sortColumn === header && sortOrder === "DESC") {
        dispatch(SortAsc());
      } else if (sortColumn === header && sortOrder === "ASC") {
        dispatch(SortDesc());
      } else {
        dispatch(ChangeSortColumn({ column: header }));
      }
    }
  };

  console.log("search name is", inputName)

  return (
    <>
      <h2 className="pagetitle"> All Users </h2>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center",justifyContent: "space-between"}} >
      <SearchBarUpdated  handleInputChange={handleInputChange} handleSearch={handleSearch} searchoptions={searchOptions}/>
        <motion.button
          className="addbutton"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{alignSelf: "flex-end"}}
          onClick={() => navigate("/adduser")}
        >
          <AddCircleOutlineIcon fontSize="small" /> Add <Hidden smDown>User</Hidden>
        </motion.button>

      </div>

      <InfiniteTable
        headers={headers}
        query={UsersQuery}
        menu={ActionMenu}
        filter={ApplyFilter}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
      />
    </>
  );

  // <TableBody>
  // {UsersQuery.data.pages.map((group, i) => (
  //   <React.Fragment key={i}>
  //     {group.response.data.map(row => (
  //       <TableRow
  //         key={row.ID}
  //         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //       >
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row.ID}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row.Username}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row["Email Address"]}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row.Company}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row["User Group"]}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row["Phone No"]}
  //         </TableCell>
  //         <ActionMenu
  //           items={[
  //             {
  //               name: "View Details",
  //               url: `/user/${row.ID}`,
  //               icon: <PageviewIcon fontSize="small" />,
  //               delete: false
  //             },
  //             {
  //               name: "Edit Details",
  //               url: `/edituser/${row.ID}`,
  //               icon: <ModeEditOutlineIcon fontSize="small" />,
  //               delete: false
  //             },
  //             {
  //               name: "Delete",
  //               icon: <DeleteOutlineIcon fontSize="small" />,
  //               delete: true
  //             },
  //           ]}
  //         />
  //       </TableRow>
  //     ))}

  //   </React.Fragment>
  // ))}
  // </TableBody>
};

export default Users;