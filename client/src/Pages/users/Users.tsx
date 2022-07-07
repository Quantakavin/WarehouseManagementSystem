import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Container } from "react-bootstrap";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList, TableFooter, TablePagination, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContainer from "../../components/cards/CardContainer";
import CardField from "../../components/cards/CardField";
import { GetAllUsers } from "../../api/UserDB";
import { ContentCut, ContentCopy, ContentPaste, Cloud } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
import ActionMenu from "../../components/table/ActionMenu";

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<any>([]);
  const headers = [
    "ID",
    "Username",
    "Email Address",
    "Company",
    "User Group",
    "Phone No",
    "Action",
  ];
  const UsersQuery = useQuery(`users`, () => GetAllUsers(),
    {
      onSuccess: (data) => {
        setUserList(data.data);
      }
    });

  return (
    <>
      <h2 className="pagetitle"> All Users </h2>

      {UsersQuery.isLoading || UsersQuery.isError ? null :

        <Container style={{ width: "95%", marginTop: 50 }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell
                      sx={{ color: "#86898E", fontWeight: 500 }}
                      className="tableheader"
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ color: "#0A2540" }} align="left">
                      {row.ID}
                    </TableCell>
                    <TableCell sx={{ color: "#0A2540" }} align="left">
                      {row.Username}
                    </TableCell>
                    <TableCell sx={{ color: "#0A2540" }} align="left">
                      {row["Email Address"]}
                    </TableCell>
                    <TableCell sx={{ color: "#0A2540" }} align="left">
                      {row.Company}
                    </TableCell>
                    <TableCell sx={{ color: "#0A2540" }} align="left">
                      {row["User Group"]}
                    </TableCell>
                    <TableCell sx={{ color: "#0A2540" }} align="left">
                      {row["Phone No"]}
                    </TableCell>
                    <ActionMenu id={row.ID} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flexcontainer" style={{ width: "100%" }}>
              <button className="buttonremovestyling" style={{ fontSize: 15, fontWeight: 500, color: "#0A2540", marginTop: 20, marginBottom: 20 }}><AddCircleOutlineIcon /> Click to Load More</button>
            </div>
          </TableContainer>
        </Container>
      }
    </>
  );
};
export default Users;
