import { Container, Paper, TableContainer, Table } from "@mui/material";
import { AxiosResponse } from "axios";
import React from "react";
import { UseInfiniteQueryResult } from "react-query";
import TableHeader from "./TableHeader";
import { ActionMenuItem } from "../../utils/CommonTypes";
import LoadMoreButton from "./LoadMoreButton";
import TableContents from "./TableContents";

interface TableProps {
    headers: string[];
  }
  
  const EmptyTable = ({ headers }: TableProps) => {
    return (
      <Container sx={{ width: "95%", marginTop: "50px" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHeader headers={headers} />
            
          </Table>
        </TableContainer>
      </Container>
    );
  };

  export default EmptyTable